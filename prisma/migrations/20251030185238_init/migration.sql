-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Livro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `data_publicacao` DATETIME(3) NOT NULL,
    `quantidade` INTEGER NOT NULL DEFAULT 0,
    `isbn` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoMovimentacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Movimentacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_livro` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `id_movimentacao` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `data_movimentacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Movimentacao` ADD CONSTRAINT `Movimentacao_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movimentacao` ADD CONSTRAINT `Movimentacao_id_livro_fkey` FOREIGN KEY (`id_livro`) REFERENCES `Livro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movimentacao` ADD CONSTRAINT `Movimentacao_id_movimentacao_fkey` FOREIGN KEY (`id_movimentacao`) REFERENCES `TipoMovimentacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
