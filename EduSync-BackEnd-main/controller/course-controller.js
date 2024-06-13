import * as service from "../service/course-service.js"


export async function createCourse(req, res) {
    try {
        const course = await service.createCourse(req.body);
        res.status(201).send(course);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}

export async function getCoursesById(req, res) {
    try {
        const { courseId } = req.params;
        const course = await service.getCourseById(courseId);
        return res.status(200).json(course);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}

export async function courseSubscribe(req,res) {
    try {
        const { courseId, userId } = req.body;
        await service.courseSubscribe(courseId, userId);
        return res.status(200).json({message: "Subscribed with success"});
    } catch (error) {
        res.status(500).send({error})
    }
}

export async function checkUserId(req, res) {
    try {
        const { courseId, userId } = req.params;
        const checker = await service.checkUserId(courseId, userId);
        res.status(201).send(checker);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}

// export async function putCourseById(req, res) {
//     try {
//         service.checkAccount(req.body);
//         const { userName } = req.params;
//         const accByUserName = await service.getAccountByUserNameAndUpdate(userName, req.body);
//         if(!accByUserName){
//             return response.status(404).json({message:'Account not found'})
//         }
//         return res.status(200).send({message:'Account updated'});
//     } catch (error) {
//         res.status(500).send({error: error.message});
//     }
// }

export async function getAllCourses(req, res) {
    try {
        const courses = await service.getAllCourses();
        res.status(200).send(courses); 
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message});
    }
}

export async function getCoursesByAuthorId(req , res) {
    try {
        const {authorId} = req.params;
        const courses = await service.getCoursesByAuthorId(authorId);
        res.status(200).send(courses);
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message});
    }

}

export async function deleteCourse(req, res) {
    try {
        const { courseId } = req.params;
        console.log('oi', courseId);
        await service.deleteCourse(courseId);
        res.status(200).send({messag:"Deletado com sucesso!"})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message});
    }
}

export async function updateCourse(req, res) {
    try {
        const {course} = req.body;
        const {courseId} = req.params;
        await service.updateCourse(course, courseId);
        res.status(200).send({messag:"Atualizado com sucesso!"})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message});
    }
}