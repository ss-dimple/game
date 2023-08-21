/*
  Warnings:

  - You are about to alter the column `classLevel` on the `class` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `fileTypeLevel` on the `filetype` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `gradeLevel` on the `grade` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `roleLevel` on the `role` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `tagLevel` on the `tag` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `typeLevel` on the `type` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to drop the column `userName` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `关联年级表id`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `关联班级表id`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `关联角色id`;

-- AlterTable
ALTER TABLE `class` MODIFY `classLevel` INTEGER NULL;

-- AlterTable
ALTER TABLE `filetype` MODIFY `fileTypeLevel` INTEGER NULL;

-- AlterTable
ALTER TABLE `grade` MODIFY `gradeLevel` INTEGER NULL;

-- AlterTable
ALTER TABLE `role` MODIFY `roleLevel` INTEGER NULL;

-- AlterTable
ALTER TABLE `tag` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `tagLevel` INTEGER NULL;

-- AlterTable
ALTER TABLE `type` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `typeLevel` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `userName`,
    ADD COLUMN `username` VARCHAR(255) NULL,
    ADD COLUMN `userno` INTEGER NULL;

-- CreateIndex
CREATE INDEX `classLevel` ON `class`(`classLevel`);

-- CreateIndex
CREATE INDEX `gradeLevel` ON `grade`(`gradeLevel`);

-- CreateIndex
CREATE INDEX `roleLevel` ON `role`(`roleLevel`);

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `关联年级表id` FOREIGN KEY (`gradeId`) REFERENCES `grade`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `关联班级表id` FOREIGN KEY (`classId`) REFERENCES `class`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `关联角色id` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;
