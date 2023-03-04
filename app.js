const express = require('express')
const app = express()
app.listen(5000)
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const fsService = require('./fs.service')

app.get('/users', async (req, res) => {
    const users = await fsService.reader()
    res.json(users)
})
app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params
    const users = await fsService.reader()
    res.json(users[userId])
})

app.post('/users', async (req, res) => {
    const body = req.body;
    let reqMassage = ''

    let genderIsValid = false;
    let ageIsValid = false;
    let nameIsValid = false;

    if ((typeof body.age !== 'undefined') && (!isNaN(+body.age))) {
        if (+body.age > 0) {
            ageIsValid = true
        } else {
            ageIsValid = false
            reqMassage = 'Age is incorrect'
        }
    } else {
        ageIsValid = false
        reqMassage = 'Data is incorrect'
    }

    if (typeof body.name !== 'undefined') {
        if ((typeof body.name === 'string') && (body.name.length > 1)) {
            nameIsValid = true
        } else {
            nameIsValid = false
            reqMassage = 'Name is incorrect'
        }
    } else {
        nameIsValid = false
        reqMassage = 'Data is incorrect'
    }

    if (typeof body.gender !== 'undefined') {
        if (body.gender === 'male' || body.gender === 'female' || body.gender === 'mixed') {
            genderIsValid = true
        } else {
            genderIsValid = false
            reqMassage = 'Gender is incorrect'
        }
    } else {
        nameIsValid = false
        reqMassage = 'Data is incorrect'
    }

    if (ageIsValid && nameIsValid && genderIsValid) {
        const users = await fsService.reader()
        users.push(body)
        await fsService.writer(users)
        res.status(201).json({
            message: 'User created!'
        })
    } else {
        res.status(400).json({
            message: reqMassage
        })
    }

})

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params
    const users = await fsService.reader()

    if ((+userId + 1 > 0) && (+userId < users.length)) {

        users.splice(userId, 1)
        await fsService.writer(users)
        res.send(`User ${userId} deleted!`)

    } else {
        res.send('UserId not found')
    }
})

app.put('/users/:userId', async (req, res) => {
    const body = req.body;
    const {userId} = req.params

    let reqMassage = ''
    let ageIsValid = false;
    let nameIsValid = false;
    let genderIsValid = false;


    console.log(body);
    console.log(userId);

    const users = await fsService.reader()

    if ((+userId + 1 > 0) && (+userId < users.length)) {

        if ((typeof body.age !== 'undefined') && (!isNaN(+body.age))) {
            if (+body.age > 0) {
                ageIsValid = true
            } else {
                ageIsValid = false
                reqMassage = 'Age is incorrect'
            }
        } else {
            ageIsValid = false
            reqMassage = 'Data is incorrect'
        }

        if (typeof body.name !== 'undefined') {
            if ((typeof body.name === 'string') && (body.name.length > 1)) {
                nameIsValid = true
            } else {
                nameIsValid = false
                reqMassage = 'Name is incorrect'
            }
        } else {
            nameIsValid = false
            reqMassage = 'Data is incorrect'
        }

        if (typeof body.gender !== 'undefined') {
            if (body.gender === 'male' || body.gender === 'female' || body.gender === 'mixed') {
                genderIsValid = true
            } else {
                genderIsValid = false
                reqMassage = 'Gender is incorrect'
            }
        } else {
            nameIsValid = false
            reqMassage = 'Data is incorrect'
        }
        console.log("body", body);
        // users.push(body);
        if (ageIsValid && nameIsValid && genderIsValid) {

            users[userId] = {...body}
            await fsService.writer(users)

            res.status(201).json({
                message: `User ${userId} updated!`
            })
        } else {
            res.status(400).json({
                message: reqMassage
            })
        }

    } else {
        res.send('UserId not found')
    }

})