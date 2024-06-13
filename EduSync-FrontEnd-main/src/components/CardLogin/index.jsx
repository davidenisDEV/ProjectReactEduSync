import './style.css'
import {Card} from '../Card'
import { FormInput } from '../FormInput'
import { Button } from '../Button'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function CardLogin() {



    function Form() {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const navigate = useNavigate();

        const handleClickLogin = async (event) => {
            event.preventDefault();

            axios.post('http://localhost:3001/acc/login',{email, password}).
            then( (response) => {
                const {data} = response;
                console.log(response)

                localStorage.setItem('email', data.email);
                localStorage.setItem('_id', data._id);
                localStorage.setItem('username', data.username);

                navigate('/');
                

            })

        }

        return(
            <form className='login-form' onSubmit={handleClickLogin}>
                    <h3 className='form-title'>Membro da comunidade?</h3>
                    <FormInput placeholder="E-mail" type = 'email' value = {email} onChange={(e) => setEmail(e.target.value)}></FormInput>
                    <FormInput placeholder="Senha" type = "password" value = {password} onChange={(e) => setPassword(e.target.value)}></FormInput>
                    <div className='justify-between'>
                        <p>Esqueceu a senha? <a href="#">Clique aqui</a></p>
                        <Button
                            className="form-button"
                            text="Entrar"
                            type = 'submit'>
                        </Button>             
                    </div>
                </form>
        )
    }

    return (
        <div className='log-in'>
            <div  className="card-wrapper" >      
                <Card width={'30%'}>
                    <Form/>
                </Card>
            </div>
        </div>
    )
}