const fs = require('node:fs/promises')
const path = require('path')

const express = require('express')
const app = express()
app.listen(5000)
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// const users = [
//     {
//         name: 'Oleh',
//         age: 19,
//         gender: 'male'
//     },
//     {
//         name: 'Anton',
//         age: 22,
//         gender: 'female'
//     },
//     {
//         name: 'Anya',
//         age: 25,
//         gender: 'female'
//     },
//     {
//         name: 'Ielizavetta',
//         age: 35,
//         gender: 'female'
//     },
//     {
//         name: 'Cocos',
//         age: 70,
//         gender: 'mixed'
//     }
// ]
//
// fs.writeFile(path.join(__dirname,'users.json'),JSON.stringify(users),(err)=>{
//     if (err) throw new Error(err.message)
// })

const read = async () => {
    let dataArr = []
    const data = fs.readFile(path.join(__dirname, 'users.json'), {encoding: 'utf8'})
    return await data
}
app.get('/users', (req, res) => {
    try {
        read().then(data => res.send(data))
    } catch (e) {
        console.log(e.message);
    }

})
app.get('/users/:userId', (req, res) => {
    const {userId} = req.params
    try {
        read().then(data => {
            const users = JSON.parse(data)
            if ((+userId >= 0) && (+userId < users.length)) {
                res.send(users[userId])
            } else {
                res.send(`incorrect userId. 0<userId<${users.length}`)
            }
        })
    } catch (e) {
        console.log(e.message);
    }
})

// app.post('/users',(req, res)=>{
//     console.log(req.json(body));
//
//     // fs.readFile(path.join(__dirname,'users.json'), {encoding:'utf8'},(err, data)=>{
//     //     const users=JSON.parse(data)
//     //     if ((+userId>0) && (+userId<users.length)){
//     //         res.send(JSON.parse(data)[userId])
//     //     }else{
//     //         res.send(`uncorrect userId. 0<userId<${users.length}`)
//     //     }
//     // })
// })

app.post('/users', (req, res) => {
    const body = req.body;
    let reqMassage = ''
    let ageIsValid = false;
    let nameIsValid = false;
    let genderIsValid = false;

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
        read().then(data=>{
            const users=[...JSON.parse(data)]
            users.push(body)
            fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users), (err) => {
                if (err) throw new Error(err.message)
            })

        })

        res.status(201).json({
            message: 'User created!'
        })
    } else {
        res.status(400).json({
            message: reqMassage
        })
    }

})

app.delete('/users/:userId', (req, res) => {
    const {userId}=req.params
    try{
        read().then(data=> {
            let users=[...JSON.parse(data)]

            if ((+userId+1>0)&&(+userId<users.length)){

                users.splice(userId,1)

                fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users), (err) => {
                    if (err) throw new Error(err.message)
                })
                res.send(`User ${userId} deleted!`)

            }else {
                res.send('UserId not found')
            }

        })

    }catch (e) {
        console.log(e.message)
    }
})

app.put('/users/:userId', (req, res) => {
    const body = req.body;
    const {userId}=req.params

    let reqMassage = ''
    let ageIsValid = false;
    let nameIsValid = false;
    let genderIsValid = false;


    console.log(body);
    console.log(userId);

    try{
        read().then(data=> {


            let users=[...JSON.parse(data)]


            console.log(body);
            console.log(userId);

            if ((+userId+1>0)&&(+userId<users.length)){

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
                        const users=[...JSON.parse(data)]
                        users[userId]={...body}
                        fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users), (err) => {
                            if (err) throw new Error(err.message)
                        })

                    res.status(201).json({
                        message: `User ${userId} updated!`
                    })
                } else {
                    res.status(400).json({
                        message: reqMassage
                    })
                }

            }else {
                res.send('UserId not found')
            }

        })

    }catch (e) {
        console.log(e.message)
    }
})