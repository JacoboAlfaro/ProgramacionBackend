/*
  Warnings:

  - Added the required column `lastname` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `test` ADD COLUMN `lastname` VARCHAR(191) NOT NULL;