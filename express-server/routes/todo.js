var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


const dbHost = 'mongodb://database/mean-docker';

// Connect to mongodb
mongoose.connect(dbHost);

// Creating Mongoose Schema
const Todo = mongoose.model('Todo', {
  todotext: String
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// get all todos
router.get('/api/todos', (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err)
      res.send(err)
    res.status(200).json(todos);
  });
});

// create todo and send back all todos after creation
router.post('/api/todos', (req, res) => {
  let todo = new Todo({
    todotext: req.body.todotext
  });

  todo.save(error => {
    if (error) res.status(500).send(error);

    res.status(201).json({
      message: 'todo created successfully'
    });
  })

});

// delete a todo
router.delete('/api/todos/:todo_id', (req, res) => {
  Todo.remove({
    _id: req.params.todo_id
  }, function (err, todo) {
    if (err)
      res.send(err);

    // get and return all the todos after you create another
    Todo.find(function (err, todos) {
      if (err)
        res.send(err)
      res.json(todos);
    });
  });
});

module.exports = router;
