const mongoose = require('mongoose')

if ( process.argv.length < 3) {
  console.log('insufficient parameters')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://user1:${password}@cluster0-w6v1g.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if ( process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
      mongoose.connection.close()
    })
  })
}
else if ( process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(response => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('improper parameters')
  mongoose.connection.close(1)
}




