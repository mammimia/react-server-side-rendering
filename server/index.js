import React from 'react'
import express from 'express'
import {readFileSync} from 'fs'
import {renderToString} from 'react-dom/server'

import { App } from '../client/App'
import { handleModifyAnswerVotes } from '../shared/utility'

const data = {
  questions: [
    {
      questionId: "Q1",
      content: "What is your name?",
    },
    {
      questionId: "Q2",
      content: "What is your quest?",
    },
  ],
  answers: [{
    answerId: "A1",
    questionId: "Q1",
    upvotes: 2,
    content: "My name is John",
  },
  {
    answerId: "A2",
    questionId: "Q1",
    upvotes: 1,
    content: "My name is Jane",
  },
  {
    answerId: "A3",
    questionId: "Q2",
    upvotes: 1,
    content: "To seek the Holy Grail",
  },
  {
    answerId: "A4",
    questionId: "Q2",
    upvotes: 0,
    content: "To seek the Holy Mammy"}
  ]
}

const app = express()

app.use(express.static('dist'))

app.get("/data", (req, res) => {
  res.json(data)
})

app.get("/vote/:answerId", (req, res) => {
  const {query, params} = req
  data.answers = handleModifyAnswerVotes(data.answers, params.answerId, +query.vote)
  res.send("OK")
})

app.get('/', (req, res) => {
  const index = readFileSync('./public/index.html', 'utf-8')
  const rendered = renderToString(<App {...data}/>)
  res.send(index.replace("{{rendered}}", rendered))
})

app.listen(7777);
console.info("Server running on port 7777");