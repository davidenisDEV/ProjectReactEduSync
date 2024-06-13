import React from 'react';
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const CourseSubscription = () => {
    const [courseChapters, setCourseChapters] = useState([]);
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseUrl, setCourseUrl] = useState("");
    const {courseId} = useParams();
    const userId = localStorage.getItem('_id');
    const navigate = useNavigate();

    async function getCourseData() {
        const response = await axios.get(`http://localhost:3001/course/${courseId}`);
        setCourseChapters(response.data[0].chapters);
        setCourseName(response.data[0].title);
        setCourseDescription(response.data[0].description);
        setCourseUrl(response.data[0].chapters[0].videoURL);
    }

    useEffect( () => {
        getCourseData();
    }, [])


  const curso = {
    nome: 'Curso de Programação em React',
    descricao: 'Aprenda React, uma biblioteca JavaScript para a criação de interfaces de usuário.',
    autor: 'João Silva',
    imagem: 'url_da_imagem_do_curso.jpg',
  };

  // Função para lidar com o clique no botão de inscrição
  const handleInscricaoClick = async (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/acc/subscribe',{courseId, userId});
    axios.post('http://localhost:3001/course/subscribe',{courseId, userId}).
    then( (response) => {
      alert(response)
      navigate(`/course/${courseId}`);
    })
  };

  return (
    <div>
        <Navbar></Navbar>  
        <div>
        {/* <img src={curso.imagem} alt={curso.nome} /> */}
        <h1>{courseName}</h1>
        <p>{courseDescription}</p>
        <p>Autor: John</p>
        <button onClick={handleInscricaoClick}>Inscrever-se</button>
        </div>
        <Footer></Footer>
    </div>
  );
};
