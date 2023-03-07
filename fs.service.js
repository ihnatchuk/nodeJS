const fs = require('node:fs/promises')
const path = require('node:path')
const User=require('./dataBase/User')

const pathDb=path.join(process.cwd(),'dataBase' ,'users.json')
const reader = async () => {

    // const data = await fs.readFile(pathDb, {encoding: 'utf8'})
    const data = await User.find()

    return JSON.parse(data)
}
const writer = async (data) => {
    await fs.writeFile(pathDb, JSON.stringify(data))
}

module.exports={
    reader,
    writer
}