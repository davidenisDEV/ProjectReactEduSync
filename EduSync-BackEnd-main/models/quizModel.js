import mongoose from "mongoose";

const accSchema = mongoose.Schema(
    {
        courseId:{
            type: String,
            required:true,
        },
        quiz:[{
            question:{  
                type:String,
                required:true,
            },
            answers:[{
                answer:{
                    type: String,
                    required: true
                },
                isCorrect:{
                    type: Boolean,
                    required: true
                }
            }]
        }]
    }
);

export const Quiz = mongoose.model('quiz', accSchema);