const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/posts', (req, res) => {
  fs.readFile('posts.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading posts')
    }
    res.send(JSON.parse(data))
  })
})

app.post('/posts', (req, res) => {
  const newPost = req.body

  fs.readFile('posts.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading posts')
    }

    const posts = JSON.parse(data)
    posts.push(newPost)

    fs.writeFile('posts.json', JSON.stringify(posts, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing posts')
      }
      res.send({ message: 'Post added successfully!' })
    })
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
