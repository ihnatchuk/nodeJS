const {model, Schema}=require('mongoose')

const userSchema= new Schema({
    name:{type:String, required:true, detail:''},
    email:{type:String, required: true, trim:true, lowercase:true, unique:true},
    age:{type:Number}
},
    {
        timestamps: true
    }
)
module.exports=model('User', userSchema)