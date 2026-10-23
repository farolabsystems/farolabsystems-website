-- AlterTable
ALTER TABLE "CaseStudy" ADD COLUMN "coverAlt" TEXT NOT NULL DEFAULT '';
ALTER TABLE "CaseStudy" ADD COLUMN "seoTitle" TEXT;
ALTER TABLE "CaseStudy" ADD COLUMN "seoDescription" TEXT;

-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" TEXT NOT NULL DEFAULT 'site',
    "seoTitle" TEXT NOT NULL,
    "seoDescription" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);
