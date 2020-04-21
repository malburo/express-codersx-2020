
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.set('view engine', 'pug')
app.set('views', './views')
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 
let todos = [
  {id: 1, content: 'Đi chợ ahihi'},
  {id: 2, content: 'Nấu cơm'},
  {id: 3, content: 'Rửa bát'},
  {id: 4, content: 'Học code tại CodersX'}
]
// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/todos', (req, res) => {
  let q = req.query.q;
  if(q) {
    let matchedTodos = todos.filter(todo => {
      return todo.content.toLowerCase().indexOf(q.toLowerCase()) >=0;
    })
    res.render('todos/index', {
      todos: matchedTodos
    });
  }
  res.render('todos/index', {
    todos: todos
  });
});

app.post('/todos/create', (req,res) => {
  console.log(req.body);
  todos.push(req.body);
  res.redirect('/todos')
})
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
