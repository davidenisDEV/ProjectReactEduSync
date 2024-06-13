import './style.css'
import { CourseIcon } from '../CourseIcon'
import jsImg from '../../assets/js.png';


export function CoursesList(props) {
    return (
        <div className='bg'>
            <div className="course-list">
                {props.courses.map((c, i) => {
                    return (
                        <CourseIcon
                        courseId={c.course._id}
                        img={jsImg}
                        key={i}
                        name={c.course.title}
                        author={c.author}
                        rate={5}>
                        </CourseIcon>
                    )
                })}
            </div>
        </div>
    )
}