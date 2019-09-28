class AddListen1548255561434 {
  async up(queryRunner) {
    await queryRunner.query(
      'CREATE TABLE `listen` (`id` int NOT NULL AUTO_INCREMENT, `user` varchar(255) NOT NULL, `postId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    )
    await queryRunner.query(
      'ALTER TABLE `listen` ADD CONSTRAINT `FK_928088ecd81f618c411e1f605e1` FOREIGN KEY (`postId`) REFERENCES `post`(`id`)',
    )
  }

  async down(queryRunner) {
    await queryRunner.query(
      'ALTER TABLE `listen` DROP FOREIGN KEY `FK_928088ecd81f618c411e1f605e1`',
    )
    await queryRunner.query('DROP TABLE `listen`')
  }
}

module.exports = { AddListen1548255561434 }
