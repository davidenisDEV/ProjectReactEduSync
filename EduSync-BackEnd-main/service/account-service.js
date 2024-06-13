import { response } from 'express';
import { Acc } from '../models/accModel.js'
import { Course } from '../models/courseModel.js';

export async function createAccount(input) {
    const nameRegex = "/^[A-Za-z]+$/";
    if(!input.username) throw new Error("username is empty");
    if(!input.email) throw new Error("username is empty");
    if(!input.password) throw new Error("password is empty");
    if(!input.passwordConfirmation) throw new Error("password confirmation is empty");
    if(input.password != input.passwordConfirmation) throw new Error("password and password confirmation must be identical");
    const newAcc = {
        username:input.username,
        email:input.email,
        password:input.password
    };
    try {
        const existingEmail = await Acc.exists({email: input.email});
        if (existingEmail){
            return {message: 'Service: Email already registered'};
        }
        try {
            await Acc.create(newAcc);
            return {message: 'User succesfuly created'};
        } catch (error) {
            return {message: 'An error occurred when trying to create account'}
        }
    } catch (error) {
        return console.log(error);
    }
}

export async function checkEmail(email) {
    try {
        const existingEmail = await Acc.exists({email});
        if (existingEmail){
            return {message: true};
        }
        return {message: false}
    } catch (error) {
        return console.log(error);
    }
}

export async function loginAccount(email, password) {
    const account = await Acc.findOne({email, password});
    return {email: account.email, _id: account._id, username: account.username};
}

export async function userSubscribe(courseId, userId) {
    const user = await Acc.findOne({_id: userId});
    if (user.subscribed.includes(courseId)) throw new Error("This user is alrealdy subscribed");
    console.log(user.subscribed)
    user.subscribed.push(courseId)

    await user.save();
}

export async function userCourseConclusion(courseId, userId) {
    const user = await Acc.findOne({_id: userId});
    console.log(userId)
    if (user.concludedCourses.includes(courseId)) throw new Error("The user already concluded this course");
    user.concludedCourses.push(courseId)

    await user.save();
}

export async function getSubscribedCourses(userId) {
    const user = await Acc.findOne({_id: userId});

    let courses = [];
    
    for (let courseId of user.subscribed) {
        const userCourses = await Course.findOne({_id: courseId});
        courses = [...courses, userCourses];
    }

    return courses;
  
}

