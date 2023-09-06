const express = require('express')
const app  = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const url = process.env.MongoUrl

mongoose.connect(url).then(() => console.log('Connected Successfully'))

const schema = new mongoose.Schema({
    name : String,
    email : String,
    role : String,
    salary : String,
    Sdate : String
})

const modal = new mongoose.model('employees', schema)

app.use(express.json())
app.use(cors())

app.post('/addemployee', async(req, res) => {
    await modal.create({name : req.body.employeeName, email : req.body.email, role : req.body.role, salary : req.body.salary, Sdate : req.body.date})
    .then(() => {
        res.status(200).send('Added Successfully')
    }).catch(err => {
        res.send(401).send('Failed to add')
    })
})

app.get('/read', async(req, res) => {
    modal.find({}).then(data => res.status(200).send(data))
})

app.delete('/delete/:id', async(req, res) => {
    await modal.findByIdAndDelete(req.params.id).then(() => res.status(200).send('Deleted Successfully'))
})

app.get('/edit/:id', async(req, res) => {
    await modal.findOne({ _id : req.params.id}).then(data => res.status(200).send(data))
})

app.put('/update/:id', async(req, res) => {
    await modal.findByIdAndUpdate(req.params.id, {name : req.body.employeeName, email: req.body.email, role : req.body.role, salary : req.body.salary, Sdate : req.body.date})
    .then(() => res.status(200).send('Updated Successfully'))
})

app.listen(3002, () => console.log('Server Started'))