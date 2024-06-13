import express from "express";
import * as courseController from "../controller/course-controller.js";  

const courseRouter = express.Router();

courseRouter.post('/create', courseController.createCourse);
courseRouter.get('/author/:authorId', courseController.getCoursesByAuthorId);
courseRouter.get('/:courseId', courseController.getCoursesById);
courseRouter.put('/:courseId', courseController.updateCourse);
courseRouter.delete('/:courseId', courseController.deleteCourse);
courseRouter.post('/subscribe', courseController.courseSubscribe);
courseRouter.get('/:courseId/:userId', courseController.checkUserId);
courseRouter.get('/', courseController.getAllCourses);


export default courseRouter;