class AddMailSchema1538236718757 {
  async up(queryRunner) {
    await queryRunner.query(
      'CREATE TABLE `mail` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `message` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    )
  }

  async down(queryRunner) {
    await queryRunner.query('DROP TABLE `mail`')
  }
}

module.exports = { AddMailSchema1538236718757 }
