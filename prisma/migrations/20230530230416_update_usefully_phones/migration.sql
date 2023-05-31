/*
 Warnings:
 
 - Added the required column `title` to the `usefully_phones` table without a default value. This is not possible if the table is not empty.
 
 */
-- AlterTable
ALTER TABLE
  `usefully_phones`
ADD
  COLUMN `title` VARCHAR(40) NOT NULL;