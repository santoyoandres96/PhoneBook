
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.static('dist'))

app.use(express.json())
app.use(cors())

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  },
  {
    id: "4",
    content: "andy",
    important: true
  },
  {
    id: "5",
    content: "fredy",
    important: true
  }
  ]

  let persons = [
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "4"
    },
    {
      "id": "0b04",
      "name": "andres santoyo",
      "number": "998 76 45"
    },
    {
      "id": "226b",
      "name": "andresA",
      "number": "12344413"
    },
    {
      "id": "d702",
      "name": "andres",
      "number": "1"
    },
    {
      "id": "9278",
      "name": "jarol",
      "number": "1"
    },
    {
      "id": "8081",
      "name": "andy",
      "number": "1"
    }
  ]

  app.get('/', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
  
  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })


  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(p => Number(p.id)))
      : 0
    return String(maxId + 1)
  }

  app.post('/api/persons/', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const person = {
      name: body.name, 
      number: body.number,
      id: generateId(),
    }
  
    person = persons.concat(person)
  
    response.json(person)
  })


  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })