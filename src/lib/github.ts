const GITHUB_USERNAME = "semlafleur";

export type GithubActivity = {
  publicRepos: number;
  totalStars: number;
  lastPushedAt: string | null;
};

type GithubRepo = {
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
};

// Server-side only, cached for an hour to respect GitHub's unauthenticated
// rate limit. Returns null on any failure so the UI can fall back gracefully
// (e.g. offline dev, rate limited, GitHub down).
export const getGithubActivity = async (): Promise<GithubActivity | null> => {
  try {
    const headers: HeadersInit = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`,
        { headers, next: { revalidate: 3600 } }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user: { public_repos: number } = await userRes.json();
    const repos: GithubRepo[] = await reposRes.json();
    const ownRepos = repos.filter((repo) => !repo.fork);

    const totalStars = ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const lastPushedAt = ownRepos.reduce<string | null>((latest, repo) => {
      if (!latest || new Date(repo.pushed_at) > new Date(latest)) return repo.pushed_at;
      return latest;
    }, null);

    return { publicRepos: user.public_repos, totalStars, lastPushedAt };
  } catch (error) {
    console.error("Failed to fetch GitHub activity", error);
    return null;
  }
};
