/**
 * TODOリストを描画
 * @param {*} todoList 
 */
function renderTodoList (todoList) {
  const todoContainer = document.querySelector('#todo-container')
  todoContainer.innerHTML = ''

  for (let item of todoList) {
    const li = document.createElement('li')
    const label = document.createElement('label')
    
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = item.done
    checkbox.dataset.id = item.id
    checkbox.addEventListener('change', checkboxListener)

    const text = new Text(item.title)

    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete'
    deleteButton.classList.add('delete-button')
    deleteButton.dataset.id = item.id
    deleteButton.addEventListener('click', deleteButtonListener)

    label.appendChild(checkbox)
    label.appendChild(text)
    label.appendChild(deleteButton)

    li.appendChild(label)

    todoContainer.appendChild(li)
  }
}

/**
 * APIでTODOリストのタスクを削除
 * @param {*} event 
 */
function deleteButtonListener (event) {
  const button = event.currentTarget
  const id = button.dataset.id

  fetch(`./api/v1/item/${id}`, { method: 'DELETE' })
    .then(() => fetchTodoList())
}

/**
 * APIでTODOリストを更新
 * @param {*} event 
 */
function checkboxListener (event) {
  const checkbox = event.currentTarget
  const id = checkbox.dataset.id

  const body = new FormData()
  body.append('done', checkbox.checked.toString())

  fetch(`./api/v1/item/${id}`, {
    method: 'PUT',
    body
  }).then(() => fetchTodoList())
}

/**
 * APIからTODOリストを取得して描画する
 */
async function fetchTodoList () {
  return fetch('./api/v1/list')
    .then(response => response.json())
    .then(todoList => renderTodoList(todoList))
}

/**
 * APIでTODOリストを追加する
 * @param {*} todoItem 
 */
async function postNewTodoItem (todoItem) {
  const body = new FormData()
  body.append('title', todoItem.title)
  return fetch('./api/v1/add', {
      method: 'POST',
      body
    }).then(response => response.json())
}

const newTodoItemTitleInput = document.querySelector('#new-todo-item-title')
const newTodoAddButton = document.querySelector('#new-todo-item-add-button')

newTodoAddButton.addEventListener('click', (event) => {
  const title = newTodoItemTitleInput.value
  if (title) postNewTodoItem({title}).then(item => fetchTodoList())
})

fetchTodoList()