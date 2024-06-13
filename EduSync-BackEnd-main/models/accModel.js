import mongoose from "mongoose";

const accSchema = mongoose.Schema(
    {
        username:{  
            type:String,
            required:true,
            // match: '/^[A-Za-z]+$/',
            // message: "Your name must contain only letters."
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        subscribed:[],
        concludedCourses:[]
    }
);

export const Acc = mongoose.model('accounts', accSchema);