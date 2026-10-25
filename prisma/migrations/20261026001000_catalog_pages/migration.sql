-- CreateEnum
CREATE TYPE "CatalogKind" AS ENUM ('SERVICE', 'INDUSTRY', 'TECHNOLOGY');

-- CreateTable
CREATE TABLE "CatalogPage" (
    "id" TEXT NOT NULL,
    "kind" "CatalogKind" NOT NULL,
    "slug" TEXT NOT NULL,
    "navLabel" TEXT NOT NULL,
    "group" TEXT NOT NULL DEFAULT '',
    "filter" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL,
    "seoTitle" TEXT NOT NULL DEFAULT '',
    "seoDescription" TEXT NOT NULL DEFAULT '',
    "eyebrow" TEXT NOT NULL DEFAULT '',
    "summary" TEXT NOT NULL,
    "blurb" TEXT NOT NULL DEFAULT '',
    "bullets" TEXT[],
    "outcomes" JSONB NOT NULL DEFAULT '[]',
    "steps" JSONB NOT NULL DEFAULT '[]',
    "faqs" JSONB NOT NULL DEFAULT '[]',
    "icon" JSONB,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "status" "PublishStatus" NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CatalogPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CatalogPage_kind_slug_key" ON "CatalogPage"("kind", "slug");

-- CreateIndex
CREATE INDEX "CatalogPage_kind_status_sortOrder_idx" ON "CatalogPage"("kind", "status", "sortOrder");
