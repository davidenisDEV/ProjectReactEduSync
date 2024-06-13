import './style.css'
import { Card } from '../Card'
import { FormInput } from '../FormInput'
import { Button } from '../Button'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export function CardSignin() {


    function Form() {
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [passwordConfirmation, setPasswordConfirmation] = useState("");

        const navigate = useNavigate();

        const handleClickSignup = (event) => {
            event.preventDefault(); 
            if (password === passwordConfirmation){
                const data = {
                    username,
                    email,
                    password,
                    passwordConfirmation
                }

                try {
                    axios.get(`http://localhost:3001/acc/check/${email}`).then((response) =>{
                        if (response.data.message === true) {
                            return alert('Email already in use.')
                        }
                        axios.post('http://localhost:3001/acc/sign-up', data).then(() =>{
                            alert('Conta criada com sucesso.');
                            setUsername('')
                            setEmail('')
                            setPassword('')
                            setPasswordConfirmation('')

                            navigate("/signin");
                        }).catch((error) =>{
                            console.log(error)
                            alert(error.message)
                        })
                    }).catch((error) =>{
                        alert('Erro ocorreu durante checagem de email')
                    })
                } catch (error) {
                    alert('Servidor está encontrando dificuldades para checar o email.')
                }

            } else alert("Senha está diferente de confirmação de senha.")
        }

        return(
            <form className='signin-form' onSubmit={handleClickSignup}>
                    <h3 className='form-title'>Seja bem-vindo!</h3>
                    <FormInput placeholder="Nome Completo" value = {username} onChange={(e) => setUsername(e.target.value)} ></FormInput>
                    <FormInput placeholder="E-mail" type = 'email' value = {email} onChange={(e) => setEmail(e.target.value)}></FormInput>
                    <FormInput placeholder="Senha" type = "password" value = {password} onChange={(e) => setPassword(e.target.value)}></FormInput>
                    <FormInput placeholder="Confirmar senha" type = "password" value = {passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}></FormInput>
                    <div className='justify-between'>
                        <p>Conhecer termos? <a href="#">Clique aqui</a></p>
                        <Button
                            className="form-button"
                            text="Cadastrar-se"
                            type = 'submit'>
                        </Button>             
                    </div>
                </form>
        )
    }

    return (
        <div className='sign-in'>
            <div  className="card-wrapper" >      
                <Card width={'30%'}>
                    <Form/>
                </Card>
            </div>
        </div>
    )
}