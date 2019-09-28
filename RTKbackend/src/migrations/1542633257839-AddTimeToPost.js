class AddTimeToPost1542633257839 {
  async up(queryRunner) {
    await queryRunner.query(
      'ALTER TABLE `post` ADD `time` int UNSIGNED NOT NULL',
    )
  }

  async down(queryRunner) {
    await queryRunner.query('ALTER TABLE `post` DROP COLUMN `time`')
  }
}

module.exports = { AddTimeToPost1542633257839 }
