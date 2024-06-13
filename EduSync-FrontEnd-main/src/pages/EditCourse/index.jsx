import './style.css'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Button } from '../../components/Button'
import { FormInput } from '../../components/FormInput'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'


function CreateVideo(props) {

    const [title, setTitle] = useState(props.title ? props.title : "");
    const [link, setLink] = useState(props.link ? props.link : "");

    return (
        <div className='create-video'>
            <FormInput name={'aa'} id={"title"} value={title} placeholder="Título" onChange={(e) => setTitle(e.target.value)}></FormInput>
            <FormInput name={'bb'} id={"link"} value={link} onChange={(e) => setLink(e.target.value)} placeholder="link"></FormInput>
        </div>
    )
}

export function EditCourse() {

    const [courseVideos, setCourseVideos] = useState([])

    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");

    const {courseId} = useParams()

    useEffect(() => {
        getCourse()
    },[])

    async function getCourse() {
        const response = await axios.get(`http://localhost:3001/course/${courseId}`);
        setCourseTitle(response.data[0].title);
        setCourseDescription(response.data[0].description);
        response.data[0].chapters.forEach( (item,index) => {
            setCourseVideos(previous => [...previous, <CreateVideo title={item.chapterTitle} link={item.videoURL} key={index}/>])
        })
    }

    function addCourseVideo() {
        setCourseVideos([...courseVideos, <CreateVideo key={courseVideos.length}/>]);
    }

    function editCourse(event) {
        event.preventDefault();
        const inputs = event.target.querySelectorAll('input');

        const videosData = [];

        for (let i = 0; i < inputs.length / 2; i++) {
            const chapter = {chapterTitle: inputs[i * 2].value, videoURL: inputs[(i * 2)+1].value}
            videosData.push(chapter);
        }

        const data = {
            authorId: localStorage.getItem('_id'),
            title: courseTitle,
            description: courseDescription,
            chapters: videosData
        }

        axios.put(`http://localhost:3001/course/${courseId}`, {course: data}).then((response) => {
            alert(response.data.message);
            if (response.data.message === 'Course succesfully created'){
                window.location.reload();
            }
        })

        
    }

    return (
        <>
            <Navbar></Navbar>
                <div className="wrapper">
                    <div className='create-course'>
                        <div className='create-course-info'>
                            <h2>Editar curso</h2>
                            <FormInput placeholder="Título" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)}></FormInput>
                            <FormInput placeholder="Descrição" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)}></FormInput>
                        </div>
                        <div className='create-course-videos'>
                            <h2>Adicionar vídeos</h2>
                            <form onSubmit={editCourse} className='course-videos'>
                                {courseVideos.map(c => c)}
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <Button onClick={addCourseVideo} text="+"></Button>
                                    <Button text={"Editar Curso"}></Button>
                                </div>
                            </form>
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>
            <Footer></Footer>       
        </>
    )
}