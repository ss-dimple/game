-- CreateTable
CREATE TABLE `game_user_role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(20) NULL,
    `role_level` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nick_name` VARCHAR(50) NOT NULL,
    `name` VARCHAR(50) NULL,
    `sex` TINYINT NULL,
    `phone` VARCHAR(20) NULL,
    `company` VARCHAR(50) NULL,
    `password` VARCHAR(255) NULL,
    `salt` VARCHAR(255) NULL,
    `status` TINYINT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nick_name` VARCHAR(50) NOT NULL,
    `name` VARCHAR(50) NULL,
    `phone` VARCHAR(20) NULL,
    `sex` TINYINT NULL,
    `password` VARCHAR(255) NULL,
    `salt` VARCHAR(255) NULL,
    `status` TINYINT NULL DEFAULT 1,
    `level` TINYINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
