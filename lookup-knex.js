const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'development',
    password: 'development',
    database: 'vagrant',
    port: 5432,
    debug: true
  }
})

const searchTerm = process.argv[2]

knex.select('*').from('famous_people')
  .where('first_name', searchTerm)
  .orWhere('last_name', searchTerm)
  .asCallback(function(err, result){
    if (err) {
      return console.error(err)
    }
    printSearch(result)
  })


const printSearch = function (result) {
  console.log(`Found ${result.length} person(s) by the name '${searchTerm}'`)
  console.log(`-${result[0].id}: ${result[0].first_name} ${result[0].last_name}, born
    '${result[0].birthdate}'`)
}
