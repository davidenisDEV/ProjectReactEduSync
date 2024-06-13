import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import accRoutes from "./routes/account-routes.js";
import courseRoutes from "./routes/course-routes.js";
import quizRoutes from "./routes/quiz-routes.js";
import cors from "cors";

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    console.log(req);
    return res.send('Welcome');
})

app.use(cors())

app.use('/acc', accRoutes)
app.use('/course', courseRoutes);
app.use('/quiz', quizRoutes)

// app.use(cors({
//     origin: 'http://localhost:5173/',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }))


mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    });