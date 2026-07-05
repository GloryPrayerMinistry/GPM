-- Replace declaration text with declaration image
ALTER TABLE "DailyDevotional" ADD COLUMN "dailyDeclarationImage" TEXT;

UPDATE "DailyDevotional"
SET "dailyDeclarationImage" = "dailyFocusImage"
WHERE "dailyDeclarationImage" IS NULL;

ALTER TABLE "DailyDevotional" ALTER COLUMN "dailyDeclarationImage" SET NOT NULL;
ALTER TABLE "DailyDevotional" DROP COLUMN "dailyDeclaration";
