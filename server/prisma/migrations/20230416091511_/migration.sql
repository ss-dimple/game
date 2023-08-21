-- AlterTable
ALTER TABLE `admin_info` MODIFY `nick_name` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `channel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `channelName` VARCHAR(255) NULL,
    `channelNum` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `class` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `className` VARCHAR(255) NULL,
    `classLevel` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `commentContent` VARCHAR(255) NULL,
    `commentScore` INTEGER NULL,
    `commentTime` DATETIME(0) NULL,
    `userId` INTEGER NULL,
    `gameId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `download` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `downloadTime` DATETIME(0) NULL,
    `userId` INTEGER NULL,
    `fileId` INTEGER NULL,
    `gameId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `file` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filePath` VARCHAR(255) NULL,
    `fileType` VARCHAR(255) NULL,
    `teamId` INTEGER NULL,
    `teacherId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `filetype` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fileTypeName` VARCHAR(255) NULL,
    `fileTypeLevel` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `game` (
    `id` INTEGER NOT NULL,
    `gameName` VARCHAR(255) NULL,
    `gameTitle` VARCHAR(255) NULL,
    `gameDesc` VARCHAR(255) NULL,
    `gameImg` VARCHAR(255) NULL,
    `gameMeta` VARCHAR(255) NULL,
    `typeId` INTEGER NULL,
    `tagId` INTEGER NULL,
    `teamId` INTEGER NULL,
    `teacherId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gradeName` VARCHAR(255) NULL,
    `gradeLevel` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `integral` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `integralScore` INTEGER NULL,
    `userId` INTEGER NULL,
    `channelId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roleName` VARCHAR(255) NULL,
    `roleLevel` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tag` (
    `id` INTEGER NOT NULL,
    `tagName` VARCHAR(255) NULL,
    `tagLevel` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teamName` VARCHAR(255) NULL,
    `playerID` INTEGER NULL,
    `playerIDName` VARCHAR(255) NULL,
    `teacherId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type` (
    `id` INTEGER NOT NULL,
    `typeName` VARCHAR(255) NULL,
    `typeLevel` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `sex` TINYINT NULL,
    `gradeId` INTEGER NULL,
    `classId` INTEGER NULL,
    `roleId` INTEGER NULL,
    `salt` VARCHAR(255) NULL,
    `status` TINYINT NULL,

    INDEX `关联年级表id`(`gradeId`),
    INDEX `关联班级表id`(`classId`),
    INDEX `关联角色id`(`roleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `关联年级表id` FOREIGN KEY (`gradeId`) REFERENCES `grade`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `关联班级表id` FOREIGN KEY (`classId`) REFERENCES `class`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `关联角色id` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;
