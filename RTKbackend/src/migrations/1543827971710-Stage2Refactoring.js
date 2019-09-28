class Stage2Refactoring1543827971710 {
  async up(queryRunner) {
    await queryRunner.query(
      'ALTER TABLE `post` ADD `description` text NOT NULL',
    )
    await queryRunner.query(
      'ALTER TABLE `post` ADD `image` varchar(255) NOT NULL',
    )
    await queryRunner.query(
      'ALTER TABLE `mail` ADD `user` varchar(255) NOT NULL',
    )
    await queryRunner.query(
      'ALTER TABLE `post` CHANGE `time` `time` int UNSIGNED NOT NULL',
    )
    await queryRunner.query('ALTER TABLE `mail` MODIFY `message` TEXT NOT NULL')
  }

  async down(queryRunner) {
    await queryRunner.query(
      'ALTER TABLE `mail` MODIFY `message` VARCHAR(255) NOT NULL',
    )
    await queryRunner.query(
      'ALTER TABLE `post` CHANGE `time` `time` int(10) UNSIGNED NOT NULL',
    )
    await queryRunner.query('ALTER TABLE `mail` DROP COLUMN `user`')
    await queryRunner.query('ALTER TABLE `post` DROP COLUMN `image`')
    await queryRunner.query('ALTER TABLE `post` DROP COLUMN `description`')
  }
}

module.exports = { Stage2Refactoring1543827971710 }
