import { Course } from '../models/courseModel.js'
import { Acc } from '../models/accModel.js';

export async function createCourse(input) {
    if(!input.authorId) throw new Error("id not recieved");
    if(!input.title) throw new Error("title is empty");
    if(!input.description) throw new Error("description is empty");
    if(!input.chapters) throw new Error("chapters is empty");
    const newCourse = {
        authorId:input.authorId,
        title:input.title,
        description:input.description,
        chapters:input.chapters
    }; 
    try {
        const existingCourse = await Course.exists({title: input.title});
        if (existingCourse){
            return {message: 'Service: Course already exists'};
        }
        try {
            await Course.create(newCourse); 
            return {message: 'Course succesfully created'};
        } catch (error) {
            return {message: 'An error occurred when trying to create a course'}
        }
    } catch (error) {
        return console.log(error);
    }
}

export async function getAllCourses() {
    const authors = await Acc.find();
    const courses =  await Course.find();

    const courseAuthor = []

    courses.forEach( course => {
        const author = authors.find( author => author._id == course.authorId);  
        courseAuthor.push({course, author: author.username});
    })

    return courseAuthor;
}

export async function getCoursesByAuthorId(authorId) {
    const author = await Acc.find({_id: authorId});
    const courses = await Course.find({authorId});
    return {courses, author};
}

export async function getCourseById(courseId) {
    const course = await Course.find({_id: courseId})
    return course;
}

export async function courseSubscribe(courseId, userId) {
    const course = await Course.findOne({_id: courseId});
    console.log(userId)
    if (!course) throw new Error("This course doesn't exist");
    if (course.subscribers.includes(userId)) throw new Error("This user is alrealdy subscribed");
    console.log(course.subscribers)
    course.subscribers.push(userId)

    await course.save();
}

export async function checkUserId(courseId, userId) {
    try {
        const course = await Course.findOne({_id: courseId});
        const existingUserId = course.subscribers.includes(userId)
        if (existingUserId){
            return {message: true};
        }
        return {message: false}
    } catch (error) {
        return console.log(error);
    }
}

export async function deleteCourse(courseId) {
    await Course.deleteOne({_id: courseId})
}

export async function updateCourse(newCourse, courseId) {
    await Course.findOneAndUpdate({_id: courseId}, newCourse);
}

