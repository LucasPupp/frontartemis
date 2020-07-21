import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import {login, usuario, idusuario,acesso,nome} from '../../services/auth';
import logo from '../../assets/artemis-logo-azul.png';
import cadeado from '../../assets/cadeado.svg';
import user from '../../assets/usuario.svg'
import './index.css';

export default function Login(props){
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error,setError] = useState('');
  
  async function signIn(e){
    e.preventDefault();
    if(!email||!senha){

			setError('Preencha e-mail e senha para continuar!');
			return console.log(error);
		}
		try{

			let response = await api.post('/login', {email,senha});
      response = response.data;

      if(response.status === 'erro'){
        return setError(response.message);
      }

      if(response.acesso === 'ong'){

        let logado = response.ong[0];
        setError('');
        login(response.token);
        usuario(logado.email);
        acesso(response.acesso);
        nome(logado.nome);
        idusuario(logado.id);
        return props.history.push('/painel');

      }else{

        let logado = response.user[0];
        setError('');
        login(response.token);
        usuario(logado.email);
        acesso(response.acesso);
        nome(logado.nome);
        idusuario(logado.id);
        return props.history.push('/dashboard');

      }

		}catch(e){
			return console.log(e);
		}
  }

  return(
    <div className="login-container">
      <div className="container">
        <div className="esquerda">
          <img src={logo} alt="Ártemis - Todos por UM" className="login-logotipo"/>
          {error && <p className="erro">{error}</p>}
          <form onSubmit={signIn}>
            <div className="group-input">
              <label htmlFor="login-senha">
                <img src={user} alt="email"/>
              </label>
              <input type="email" id="login-email" onChange={ e => setEmail(e.target.value)} placeholder="Email"/>
            </div>
            <div className="group-input">
              <label htmlFor="login-senha">
                <img src={cadeado} alt="senha"/>
              </label>
              <input type="password" id="login-senha" onChange={ e => setSenha(e.target.value)} placeholder="Senha"/>
            </div>
            <button type="submit" className="login-button">
              ACESSAR
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}