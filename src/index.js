
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const users = [];
let counter = 1;
const photos = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.put('/user', (req,res) => {
  const {username, password} = req.body;
  if(!username || !password) {
    res.status(400).send('missing user name or password');
    return;
  }
  if(username.length < 3 || password.length < 6) {
    res.status(400).send('password or username too short');
    return;
  }
  const newUser = {
    id: users.length +1,
    ...req.body,
    username,
    password
  };
  counter++;
  users.push(newUser);
  res.sendStatus(201);
});

app.get('/users', (req, res) => {
  res.send(users);
});

app.get('/user/:id', (req, res)=>{
  const userId = parseInt(req.params.id);
  const requestedUser = users.find(user => user.id === userId);
  if (!requestedUser) {
    res.sendStatus(404);
    return;
  } 
  res.send(requestedUser);
});   

app.delete('/user/:id', (req,res) => {
  const userId = parseInt(req.params.id);
  const deletedUser = users.find(user => user.id === userId);
  if(!deletedUser) {
    res.status(404).send(`user not found`);
    return;
  }
  users.splice(users.indexOf(deletedUser),1);
  res.sendStatus(204);
});

app.post('/user/login', (req, res) => {
  const { username, password} = req.body;
  const requestedUser = users.find(user => username === user.username && password === user.password)
  if (requestedUser) {
    res.status(200).send('Login successfully')
  } else {
    res.status(404).send('login faild')
  }
});

app.post('/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const {username, password} = req.body;
  const editUser = users.find(user => user.id === userId);
  if(!editUser) {
    res.status(404).send(`user not foud`);
    return;
  } else {
    editUser.username = username;
    editUser.password = password;
    res.status(200).send(`user changed`);
  }
});

app.put('/photo', (req,res) => {
  const {title, fileName} = req.body;
  if(!title || !fileName) {
    res.status(400).send('missing photo');
    return;
  }
  
  const newPhoto = {
    id: photos.length +1,
    ...req.body,
    title,
    fileName
  };
  counter++;
  photos.push(newPhoto);
  res.sendStatus(201);
});

app.get('/photos', (req, res) => {
  res.send(photos);
});

app.get('/photo/:id', (req, res)=>{
  const photoId = parseInt(req.params.id);
  const requestedPhoto = photos.find(photo => photo.id === photoId);
  if (!requestedPhoto) {
    res.sendStatus(404);
    return;
  } 
  res.send(requestedPhoto);
});   

app.delete('/photo/:id', (req,res) => {
  const pohotoId = parseInt(req.params.id);
  const deletedPhoto = photos.find(photo => photo.id === photoId);
  if(!deletedPhoto) {
    res.status(404).send(`photo not found`);
    return;
  }
  photos.splice(photos.indexOf(deletedPhoto),1);
  res.sendStatus(204);
});

app.post('/photo/:id', (req, res) => {
  const photoId = parseInt(req.params.id);
  const {fileName, title} = req.body;
  const editPhoto = photos.find(photo => photo.id === photoId);
  if(!editPhoto) {
    res.status(404).send(`photo not foud`);
    return;
  } else {
    editPhoto.fileName = fileName;
    editPhoto.title = title;
    res.status(200).send(`photo editor changed`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});