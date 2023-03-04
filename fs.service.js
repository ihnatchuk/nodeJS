const fs = require('node:fs/promises')
const path = require('node:path')

const pathDb=path.join(process.cwd(),'dataBase' ,'users.json')
const reader = async () => {
    const data = await fs.readFile(pathDb, {encoding: 'utf8'})
    return JSON.parse(data)
}
const writer = async (data) => {
    await fs.writeFile(pathDb, JSON.stringify(data))
}

module.exports={
    reader,
    writer
}