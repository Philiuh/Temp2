class AddLikeSchema1544191363801 {
  async up(queryRunner) {
    await queryRunner.query(
      'CREATE TABLE `like` (`id` int NOT NULL AUTO_INCREMENT, `user` varchar(255) NOT NULL, `postId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    )
    await queryRunner.query(
      'ALTER TABLE `post` CHANGE `time` `time` int UNSIGNED NOT NULL',
    )
    await queryRunner.query(
      'ALTER TABLE `like` ADD CONSTRAINT `FK_3acf7c55c319c4000e8056c1279` FOREIGN KEY (`postId`) REFERENCES `post`(`id`)',
    )
  }

  async down(queryRunner) {
    await queryRunner.query(
      'ALTER TABLE `like` DROP FOREIGN KEY `FK_3acf7c55c319c4000e8056c1279`',
    )
    await queryRunner.query(
      'ALTER TABLE `post` CHANGE `time` `time` int(10) UNSIGNED NOT NULL',
    )
    await queryRunner.query('DROP TABLE `like`')
  }
}

module.exports = { AddLikeSchema1544191363801 }
