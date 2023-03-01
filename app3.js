const fs=require('node:fs')
const path = require("node:path");

fs.stat(path.join(process.cwd(), 'app.js'), (err,stats)=>{
    console.log(stats)
    console.log(stats.isFile());
});

