const fs=require('node:fs/promises')
const path = require("node:path");
const foo=async ()=>{
    const stats = await fs.stat(path.join(process.cwd(), 'app.js'));
    const isFile = stats.isFile();
    console.log(stats);
    console.log(isFile);
}
foo()

