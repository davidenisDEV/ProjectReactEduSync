import { Quiz } from '../models/quizModel.js'

export async function createQuiz(input) {
    const newQuiz = {
        courseId:input.courseId,
        quiz:input.quiz
    };
    
    const existingQuiz = await Quiz.findOne({courseId: input.courseId})
    if (existingQuiz){
        console.log(existingQuiz.quiz);
        existingQuiz.quiz = [...existingQuiz.quiz, ...input.quiz];
        await existingQuiz.save();
        return;
    }

    await Quiz.create(newQuiz);    
}

export async function getByCourseId(courseId) {
    const quiz = await Quiz.find({courseId})
    console.log(quiz)
    return quiz;
}