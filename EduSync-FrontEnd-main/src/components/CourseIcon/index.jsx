import './style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdQuiz } from "react-icons/md";




export function CourseIcon(props) {
    const navigate = useNavigate();
    const userId = localStorage.getItem('_id');

    function handleCourseIconClick(courseId) {
        axios.get(`http://localhost:3001/course/${courseId}/${userId}`).then((response) =>{
            if (response.data.message === true) {
                return navigate(`/course/${courseId}`);
            }
        navigate(`/subscription-page/${courseId}`);
        })
    }

    async function deleteCourse() {
        await axios.delete(`http://localhost:3001/course/${props.courseId}`)
        alert("Curso Deletado!")
        window.location.reload();
    }

    return (
        <div  className='course-block'>
            <img  onClick={() => handleCourseIconClick(props.courseId)} className='course-img' src={props.img} alt=""/>
            <p className='text course-name'>{props.name}</p>
            <p className='text course-author'>{props.author}</p>
            {  
                props.isCreator ?
                <div className='course-rating'>
                    <div className='icons'>
                        <div onClick={deleteCourse} className='icon-background red'>
                            <FaTrashAlt/>
                        </div>
                        <div onClick={() => navigate(`/edit-course/${props.courseId}`)} className='icon-background blue'>
                            <MdEdit/>
                        </div>
                        <div onClick={() => navigate(`/create-quiz/${props.courseId}`)} className='icon-background blue'>
                            <MdQuiz/>
                        </div>
                    </div>    
                </div>
                :
                ""
            }

        </div>
    )
}