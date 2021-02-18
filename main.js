const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  age: Number
});

const User = mongoose.model('User', userSchema);

mongoose.connect("mongodb://localhost:27017/usersdb", { useUnifiedTopology: true, useNewUrlParser: true },
  function (err) {
    if (err) return console.log(err);
    app.listen(8080, function () {

      console.log('Server open!');
    });
  });

app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return console.log(err);
    res.send(users)
  });
});

app.post('/users', (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const userName = req.body.name;
  const userAge = req.body.age;
  const user = new User({ name: userName, age: userAge });

  user.save((err) => {
    if (err) return console.log(err);
    res.send(user);
  });
});

app.delete('/users/delete/:id', (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id, (err, user) => {
    if (err) return console.log(err);
    res.send(user);
  });
});

app.put('/users/update/:id', (req, res) => {
  const id = req.body._id;
  const userName = req.body.name;
  const userAge = req.body.age;
  const newUser = { name: userName, age: userAge };

  User.findByIdAndUpdate(id, newUser, { new: true }, (err, user) => {
    if (err) return console.log(err);
    res.send(user);
  });
});