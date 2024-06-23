-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "authorId" TEXT;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
