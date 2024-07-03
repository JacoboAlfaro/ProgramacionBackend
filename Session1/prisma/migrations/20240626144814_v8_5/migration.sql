/*
  Warnings:

  - You are about to drop the column `resetTokenExpire` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `resetTokenExpire`,
    ADD COLUMN `resetTokenExpiry` DATETIME(3) NULL;
