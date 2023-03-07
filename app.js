const express = require('express')
require('dotenv').config()

const configs=require('./config/configs')
const User=require('./dataBase/User')

const mongoose=require('mongoose')
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const fsService = require('./fs.service')
const {ageIsValid, nameIsValid, genderIsValid} = require("./validator");

app.get('/users', async (req, res) => {
    const users = await User.find()
    res.json(users)
})
app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params
    const users = await fsService.reader()
    const index = users.findIndex(user => user.id === +userId)

    if (index !== -1) {
        res.json(users[index])
        return
    }
    res.status(400).send('User not found')
})

app.post('/users', async (req, res) => {
    const body = req.body;
    const nameRes = nameIsValid(body.name)
    const ageRes = ageIsValid(body.age)
    const genderRes = genderIsValid(body.gender)

    if (ageRes.isValid && nameRes.isValid && genderRes.isValid) {

        const users = await fsService.reader()
        const newUserId = users.length ? users[users.length - 1].id + 1 : 1

        users.push({id: newUserId, ...body})

        await fsService.writer(users)

        res.status(201).json({
            message: 'User created!'
        })
        return
    }
    res.status(400).json({
        message: [nameRes.reqMassage,
            ageRes.reqMassage,
            genderRes.reqMassage].join(' ')
    })
})

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params

    const users = await fsService.reader()

    const index = users.findIndex(user => user.id === +userId)

    if (index !== -1) {

        users.splice(index, 1)
        await fsService.writer(users)
        res.send(`User ${userId} deleted!`)
        return
    }
    res.status(400).send('User not found')

})

app.put('/users/:userId', async (req, res) => {
    const body = req.body;
    const {userId} = req.params

    const nameRes = nameIsValid(body.name)
    const ageRes = ageIsValid(body.age)
    const genderRes = genderIsValid(body.gender)

    const users = await fsService.reader()
    const index=users.findIndex(user=>user.id===+userId)
    if (index===-1){
        res.send('UserId not found')
        return
    }

    if (ageRes.isValid && nameRes.isValid && genderRes.isValid) {

        users[index]={...users[index],...body}

        await fsService.writer(users)

        res.status(201).json({
            message: 'User updated!'
        })
        return
    }

    res.status(400).json({
        message: [nameRes.reqMassage,
            ageRes.reqMassage,
            genderRes.reqMassage].join(' ')
    })
})

app.patch('/users/:userId', async (req, res) => {
    const body = req.body;
    const {userId} = req.params
    let isUpdated=false

    const users = await fsService.reader()

    const index=users.findIndex(user=>user.id===+userId)
    if (index===-1){
        res.send('UserId not found')
        return
    }

    for (const bodyKey in body) {
        switch (bodyKey){
            case "name":
                users[index]=nameIsValid(bodyKey).isValid?{...users[index],bodyKey:body[bodyKey]}:{...users[index]}
                isUpdated=true
                break
            case "age":
                users[index]=ageIsValid(bodyKey).isValid?{...users[index],bodyKey:body[bodyKey]}:{...users[index]}
                isUpdated=true
                break
            case "gender":
                users[index]=genderIsValid(bodyKey).isValid?{...users[index],bodyKey:body[bodyKey]}:{...users[index]}
                isUpdated=true
                break
            default:
        }
    }
    if (isUpdated){
        await fsService.writer(users)

        res.status(201).json({
            message: 'User updated!'
        })
        return
    }

    res.status(400).json({
        message:'Not Updated'
        // message: [nameRes.reqMassage,
        //     ageRes.reqMassage,
        //     genderRes.reqMassage].join(' ')
    })
})

app.listen(configs.PORT,async ()=>{
    console.log(configs.MONGO_URL)
        await mongoose.connect(configs.MONGO_URL);
    // await mongoose.connect("mongodb+srv://ihnatchukpp:xtHNAdTTB1HOro4M@testdb.umj9k3d.mongodb.net/?retryWrites=true&w=majority");
    console.log(`Server listen ${configs.PORT}`)
})