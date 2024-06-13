import {Navbar} from '../../components/Navbar'
import {Banner} from '../../components/Banner'
import {Footer} from '../../components/Footer'
import { CategoriesBar } from '../../components/CategoriesBar'
import { CoursesList } from '../../components/CoursesList'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'


export function Homepage() {

    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    async function getCourses() {
        const response = await axios.get('http://localhost:3001/course');
        setCourses(response.data);
        setFilteredCourses(response.data);
    }

    useEffect( () => {
        getCourses();
    }, []);


    function searchCourses(param) {
        setFilteredCourses(courses.filter( c => c.name.toLowerCase().includes(param.toLowerCase()) || c.author.toLowerCase().includes(param.toLowerCase())))
    } 


    return (
        <>
            <Navbar onSearch={searchCourses}></Navbar>
            <Banner></Banner>
            {/* <CategoriesBar></CategoriesBar> */}
            <CoursesList courses={filteredCourses}></CoursesList>
            <Footer></Footer>
        </>

    )
}