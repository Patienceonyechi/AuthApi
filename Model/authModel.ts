import  mongoose from "mongoose"


interface userAuth {
    fullName: string;
    email: string;
    password: string;
    isActive:boolean;
    profileImage: string;
}

interface iuserAuth extends  userAuth, mongoose.Document{}

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        lowercase: true,
        unique: true,
    },
    password:{
        type:String
    },
    isActive:{
        type:Boolean
    },
    profileImage:{
        type:String
    }
},
{
    timestamps:true
}
)
export default mongoose.model<iuserAuth>("userAuth", userSchema)