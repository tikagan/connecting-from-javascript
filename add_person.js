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
});
const input = process.argv;
// const firstName = process.argv[2]
// const lastName = process.argv[3]
// const dob = process.argv[4]

knex.insert({first_name: input[2], last_name: input[3], birthdate: input[4]}).into('famous_people')
.asCallback(function (err, result){
  if (err) {
    return console.error('Connection Error', err);
  }
  console.log(result);
});
knex.destroy();
