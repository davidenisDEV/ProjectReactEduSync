import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Chat } from '../../components/Chat'
import './style.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Quiz } from '../../components/Quiz'





export function CoursePage() {
    const [courseChapters, setCourseChapters] = useState([]);
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseUrl, setCourseUrl] = useState("");
    const [isVideo, setIsVideo] = useState(true)

    const {courseId} = useParams();

    async function getCourseData() {
        const response = await axios.get(`http://localhost:3001/course/${courseId}`);
        setCourseChapters(response.data[0].chapters);
        setCourseName(response.data[0].title);
        setCourseDescription(response.data[0].description);
        setCourseUrl(response.data[0].chapters[0].videoURL);

        const responseQuestions = await axios.get(`http://localhost:3001/quiz/${courseId}`);
        setCourseQuestions(responseQuestions.data[0].quiz);
        
    }

    useEffect( () => {
        getCourseData();
    }, [])

    function onClickQuiz(){
        setIsVideo(false);
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className='course'>
            <div style={{display: isVideo ? 'none' : 'block'}}   className='questions'>
                {<Quiz/>}
            </div>
            <iframe style={{display: isVideo ? 'block' : 'none'}} className='course-video' height={600} src={courseUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <div className='course-playlist'>
                    {courseChapters.map( (c, i) => {
                        function onClickChapter(chapterLink) {
                            setCourseUrl(chapterLink);
                            setIsVideo(true);
                        }
                        
                        return (
                            <div onClick={() => onClickChapter(c.videoURL)} key={i} className='course-chapter'>
                                <p className='course-chapter_name'>{c.chapterTitle}</p>
                                <p className='course-chapter_time'></p>                      
                            </div>
                        )
                    })}
                    <div onClick={onClickQuiz} className = 'course-chapter'>
                        <p className='course-chapter-name'>Questionário</p>
                        
                    </div>
                </div>
            </div>
            <div className='course-details'>
                <div>
                    <h2 className='course-title'>{courseName}</h2>
                    <p className='course-author'>John Python</p>
                </div>

                <p className='course-description'>{courseDescription}</p>
            </div>
            <Chat></Chat>
            <Footer></Footer>
        </div>
    )
}