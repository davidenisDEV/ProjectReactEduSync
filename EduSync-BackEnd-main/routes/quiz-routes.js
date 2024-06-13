import express from "express";
import * as quizController from "../controller/quiz-controller.js";  

const quizRouter = express.Router();

quizRouter.post('/', quizController.createQuiz);
quizRouter.get('/:courseId', quizController.getByCourseId);


export default quizRouter;