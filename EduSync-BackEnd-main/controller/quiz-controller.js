import * as service from "../service/quiz-service.js";

export async function createQuiz(req, res) {
    try {
        console.log(req.body)
        const quiz = await service.createQuiz(req.body);
        res.status(201).send(quiz);
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }
}

export async function getByCourseId(req, res) {
    try {
        const { courseId } = req.params;
        const quiz = await service.getByCourseId(courseId);
        console.log(quiz)
        return res.status(200).json(quiz);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}