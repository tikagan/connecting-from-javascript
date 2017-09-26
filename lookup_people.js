const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

//take process.argv[2] as the input text to be searched


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  const searchTerm = process.argv[2]
  client.query("SELECT * FROM famous_people WHERE last_name = $1 OR first_name = $", [searchTerm], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching,,,")
    console.log(`Found ${result.rows.length} person(s) by the name ${searchTerm}`)
    result.rows.forEach( function(person) {
      console.log(`- ${person.id}: ${person.first_name} ${person.last_name}, born ${person.birthdate}`)
    });
    client.end();
  });
});
