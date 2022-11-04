import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ContentUsers extends BaseSchema {
  protected tableName = 'content_user'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id')
      table.integer('content_id').unsigned().references('contents.id')
      table.enum('status', ['notStarted', 'finished']).defaultTo('notStarted')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}