-- AlterTable
ALTER TABLE `presencial` MODIFY `phoneId` VARCHAR(191) NULL,
    MODIFY `user` VARCHAR(191) NULL,
    MODIFY `starting` BOOLEAN NULL DEFAULT false,
    MODIFY `escritorio` VARCHAR(191) NULL,
    MODIFY `data` VARCHAR(191) NULL;
