const express = require('express')
const mongoose = require('mongoose')
const { getArticles } = require('./external-api')
const Article = require('./models/article')
const articles = require('./routes/articles')

const CROSSREF_URL = 'http://api.crossref.org/works'
const MONGO_CONN_STRING = process.env.MONGO_CONN_STRING || 'mongodb://mongo:27017/articlesdb'
const PORT = process.env.PORT || 3000

async function start () {
  console.log('### Crossref_test API ###')

  const db = mongoose.connection
  db.on('error', error => console.error(error))
  db.once('open', () => {
    console.log('Connected to MongoDB.')

    console.log('Getting articles from crossref API...')
    getArticles(CROSSREF_URL)
      .then(crossrefArticles =>
        Article.insertMany(crossrefArticles)
          .then(mongooseDocuments =>
            console.log(
              'Crossref Articles Inserted: ',
              mongooseDocuments.length
            )
          )
          .catch(err => console.log(err))
      )
      .catch(function (err) {
        console.log('Error getting articles from crossref API!', err)
      })
  })

  try {
    await mongoose.connect(
      MONGO_CONN_STRING,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
    )
  } catch (err) {
    console.log('Error connecting to MongoDB!', err)
  }
}

const app = express()
app.use(express.json())
app.use('/articles', articles)

app.listen(PORT, start)
