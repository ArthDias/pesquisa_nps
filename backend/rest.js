const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserModel = require('./user-model.js');
const bycypt = require('bcrypt');

const app = express();
mongoose.connect("mongodb+srv://arthdias:WS1eUvDZvrvsn9Tf@cluster0.8tsiut7.mongodb.net/userdb?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch(() => {
        console.log('Erro ao conectar ao MongoDB');
    });

app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.post('/create-user', (req, res) => {
    bycypt.hash(req.body.password, 10)
        .then(hash => {
            const userModel = new UserModel({
                name: req.body.name,
                company: req.body.company,
                email: req.body.email,
                password: hash
            })

            userModel.save()
            .then(result => {
                res.status(201).json({
                    message: 'Usuario criado',
                    result: result
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
        })
})

module.exports = app;