class InitialMigration1537385539337 {
  async up(queryRunner) {
    await queryRunner.query(
      'CREATE TABLE `post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `url` varchar(255) NOT NULL, `tags` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    )
  }

  async down(queryRunner) {
    await queryRunner.query('DROP TABLE `post`')
  }
}

module.exports = { InitialMigration1537385539337 }
