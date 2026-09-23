-- DropIndex
DROP INDEX "Education_order_idx";

-- DropIndex
DROP INDEX "Experience_order_idx";

-- DropIndex
DROP INDEX "Project_order_idx";

-- DropIndex
DROP INDEX "SkillCategory_order_idx";

-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'en';

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'en';

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'en';

-- AlterTable
ALTER TABLE "SkillCategory" ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'en';

-- CreateIndex
CREATE INDEX "Education_locale_order_idx" ON "Education"("locale", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Education_locale_order_key" ON "Education"("locale", "order");

-- CreateIndex
CREATE INDEX "Experience_locale_order_idx" ON "Experience"("locale", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Experience_locale_order_key" ON "Experience"("locale", "order");

-- CreateIndex
CREATE INDEX "Project_locale_order_idx" ON "Project"("locale", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Project_locale_order_key" ON "Project"("locale", "order");

-- CreateIndex
CREATE INDEX "SkillCategory_locale_order_idx" ON "SkillCategory"("locale", "order");

-- CreateIndex
CREATE UNIQUE INDEX "SkillCategory_locale_order_key" ON "SkillCategory"("locale", "order");

