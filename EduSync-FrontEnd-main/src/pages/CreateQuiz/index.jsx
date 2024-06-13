import './style.css'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Button } from '../../components/Button'
import { FormInput } from '../../components/FormInput'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';


export function CreateQuiz() {

    const [todos, setTodos] = useState([{ question: "", answer: "", i1: "", i2: "", i3: "", i4: "" }]);
    const {courseId} = useParams();
  
  const handleTodoChange = (e, i) => { 
    const field = e.target.name; 
    const newTodos = [...todos]; 
    newTodos[i][field] = e.target.value; 
    setTodos(newTodos); 
  }; 
  
  const handleAddTodo = () => { 
    setTodos([...todos, { question: "", answer: "", i1: "", i2: "", i3: "", i4: "" }]); 
  }; 
  
  const handleDeleteTodo = (i) => { 
    const newTodos = [...todos]; 
    newTodos.splice(i, 1); 
    setTodos(newTodos); 
  }; 

  var quiz = []
  const model = todos.forEach(element => {
    quiz = [...quiz, {question: element.question, answers:[{answer:element.answer, isCorrect:true},
        {answer:element.i1, isCorrect:false}, {answer:element.i2, isCorrect:false},
        {answer:element.i3, isCorrect:false}, {answer:element.i4, isCorrect:false}]}]
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {courseId, quiz: quiz}
    console.log(data)
    axios.post('http://localhost:3001/quiz', data).then((response) => {
        alert(response.data.message);
        if (response.data.message === 'Course succesfully created'){
            window.location.reload();
        }
    })
  }; 

    return (
        <>
            <Navbar></Navbar>
                        <div className='wrapper-quiz'>
                            <h2 className='add-questions-title'>Adicionar Questões</h2>
                            <form  onSubmit={handleSubmit}> 
                                {todos.map((todo, index) => ( 
                                    <div className='question' key={index}> 
                                    <input 
                                        type="text"
                                        placeholder="Question"
                                        name="question"
                                        value={todo.question} 
                                        onChange={(e) => handleTodoChange(e, index)} 
                                        required 
                                    />
                                    <input 
                                        type="text"
                                        placeholder="Resposta"
                                        name="answer"
                                        value={todo.answer} 
                                        onChange={(e) => handleTodoChange(e, index)} 
                                        required 
                                    />
                                    <input 
                                        type="text"
                                        placeholder="Alernativa"
                                        name="i1"
                                        value={todo.i1} 
                                        onChange={(e) => handleTodoChange(e, index)} 
                                        required 
                                    />
                                    <input 
                                        type="text"
                                        placeholder="Alernativa"
                                        name="i2"
                                        value={todo.i2} 
                                        onChange={(e) => handleTodoChange(e, index)} 
                                        required 
                                    />
                                    <input 
                                        type="text"
                                        placeholder="Alernativa"
                                        name="i3"
                                        value={todo.i3} 
                                        onChange={(e) => handleTodoChange(e, index)} 
                                        required 
                                    />
                                    <input 
                                        type="i4"
                                        placeholder="Alernativa"
                                        name="i4"
                                        value={todo.i4} 
                                        onChange={(e) => handleTodoChange(e, index)} 
                                        required 
                                    />
                                    <button onClick={() => handleDeleteTodo(index)}>Delete</button> 
                                    </div> 
                                ))} 
                                <button onClick={handleAddTodo}>Add Questão</button> 
                                <button type="submit">Enviar Questionário</button> 
                            </form> 
                        </div>
            <Footer></Footer>       
        </>
    )
}