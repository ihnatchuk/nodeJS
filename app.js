const path = require('path')
const os = require('os')
const fs = require('fs')


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

const createFiles = (dirName) => {
    fs.mkdir(path.join(__dirname, dirName), (err) => {
        if (err) throw new Error(err.message)
    })
    for (let i = 0; i < 5; i++) {
        fs.mkdir(path.join(__dirname, dirName, `${i}`), (err) => {
            if (err) throw new Error(err.message)
        })
        fs.appendFile(path.join(__dirname, dirName, `${i}.txt`), `student id${i}`, (err) => {
            if (err) throw new Error(err.message)
        })
    }
}
const readFiles=(dirName)=>{
    fs.readdir(path.join(__dirname, dirName), {withFileTypes: true}, (err, files) => {
        if (err) throw new Error(err.message)
        for (let file of files) {
            if (file.isFile()) {
                console.log(`FILE: ${file.name}`)
            }
            if (file.isDirectory()) {
                console.log(`FOLDER: ${file.name}`)
            }
        }
    })
}


const createRead=async (dirName)=>{
    await createFiles(dirName)
    await readFiles(dirName)
}

createRead('hw1')











