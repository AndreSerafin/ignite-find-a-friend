/*
  Warnings:

  - Added the required column `address` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsapp` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "authorName" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "whatsapp" TEXT NOT NULL;
