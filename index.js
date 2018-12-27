/**
 * API
 */
const express = require('express')
const multer = require('multer')
const uuidv4 = require('uuid/v4')
const app = express()
const port = process.env.PORT || 3000
const todoList = []
const apiUrl = '/api/v1/'

// publicフォルダの中身を公開する
app.use(express.static('public'))

// multerでブラウザからの値を解釈
app.use(multer().none())

// サーバーを起動
app.listen(port, () => console.log(`${port}でサーバーが起動しました`))

/**
 * TODOLISTを取得
 */
app.get(`${apiUrl}list`, (req, res) => res.json(todoList))

/**
 * TODOLISTにタスクを追加
 */
app.post(`${apiUrl}add`, (req, res) => {
  const todoData = req.body
  const todoTitle = todoData.title
  const id = uuidv4() // ユニークidを作成
  
  // TODOを作成し追加する
  const todoItem = {
    id,
    title: todoTitle,
    done: false,
  }
  todoList.push(todoItem)
  console.log(`Add: ${JSON.stringify(todoItem)}`)

  res.json(todoItem)
})

/**
 * TODOLISTからタスクを削除
 */
app.delete(`${apiUrl}item/:id`, (req, res) => {
  // TODO
})

/**
 * TODOLISTのタスクを更新
 */
app.put(`${apiUrl}item/:id`, (req, res) => {
  // TODO
})