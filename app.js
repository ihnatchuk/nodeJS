const path = require('node:path')
const fs = require('node:fs')


// завдання від Віктора з сортуванням
// const sortFiles=(dirPath, targetDirPath, gender)=>{
//     fs.readdir(path.join(__dirname,'students', dirPath),{withFileTypes:true},(err,files)=>{
//             if (err) throw new Error(err.message)
//             console.log(files);
//
//             for (const file of files) {
//                 if (file.isFile()){
//                     console.log(file.name);
//
//                     fs.readFile(path.join(__dirname,'students', dirPath, file.name),(err,data)=>{
//                         if (err) throw new Error(err.massage)
//                         console.log(JSON.parse(data));
//                         if (JSON.parse(data).gender===gender){
//                             fs.rename(
//                                 path.join(__dirname,'students',dirPath,file.name),
//                                 path.join(__dirname,'students',targetDirPath,file.name),
//                                 (err)=> {
//                                     if (err) throw new Error(err.message)
//                                 }
//                             )
//                         }
//                     })
//                 }
//             }
//         }
//     )
// }
//
// sortFiles('boys','girls','female')
// sortFiles('girls','boys','male')

// ДЗ:
// Створіть папку
// В тій папці створіть 5 папок і 5 файлів
// І за допомогою модулю fs виведіть в консоль, чи це папка чи це файл
// !!все робіть кодом, не руками
//
// FILE: {fileName}
// FOLDER: {folderName}

const createFiles = async (dirName,n) => {
    const arr=[]
    for (let i = 0; i < n; i++) {
        arr.push(i);
    }
    fs.mkdir(path.join(__dirname, dirName),{recursive:true}, (err) => {
        if (err) throw new Error(err.message)
    })
    const filesPromises = arr.map(async (i)=>{
        await fs.mkdir(path.join(__dirname, dirName, `${i}`),{recursive:true}, (err) => {
            if (err) throw new Error(err.message)
        })
        await fs.writeFile(path.join(__dirname, dirName, `${i}.txt`), `student id${i}`, (err) => {
            if (err) throw new Error(err.message)
        })
    })

    const promises=Promise.allSettled(filesPromises)
    console.log(promises);
}
// const readFiles=async (dirName)=>{
//     await fs.readdir(path.join(__dirname, dirName), {withFileTypes: true}, (err, files) => {
//         if (err) throw new Error(err.message)
//         for (let file of files) {
//             if (file.isFile()) {
//                 console.log(`FILE: ${file.name}`)
//             }
//             if (file.isDirectory()) {
//                 console.log(`FOLDER: ${file.name}`)
//             }
//         }
//     })
// }
const readFiles=async (dirName)=>{
    await fs.readdir(path.join(__dirname, dirName), (err, files) => {
        if (err) throw new Error(err.message)
        for (let file of files) {
            fs.stat(path.join(__dirname,dirName,file),(err, stats)=>{
                const isFile=stats.isFile()
            if (isFile) {
                console.log(`FILE: ${file}`)
            }
            if (!isFile) {
                console.log(`FOLDER: ${file}`)
            }
            })
        }
    })
}

const createRead=async (dirName,n)=>{
    await createFiles(dirName,n).then(readFiles(dirName))
}

createRead('hw1',10)











