import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {logout } from '../../services/auth';
import sair from '../../assets/sair.svg';
import logo from '../../assets/artemis-logo-azul.png';
import lixeira from '../../assets/delete.svg';

import Casos from '../Casos';
import Ongs from '../Ongs';

import './index.css';

export default function Dashboard(props){
  const [nome, setNome] = useState(localStorage.getItem('nome'));
  const [classOng, setClassOng] = useState('ativa');
  const [classCaso, setClasscaso] = useState('');
  const [cards, setCards] = useState(<Ongs/>);

  function signOut(e){
    e.preventDefault();
    try{
      logout();
      return props.history.push('/');
    }catch(e){
      return console.log(e)
    }

  }

  function abaOng(e){
    e.preventDefault();
    if(classOng===''){
      setClassOng('ativa');
      setClasscaso('');
      setCards(<Ongs/>)

    }
  }
  function abaCaso(e){
    e.preventDefault();
    if(classCaso===''){
      setClassOng('');
      setClasscaso('ativa');
      setCards(<Casos/>)
    }
  }

  return(
    <div className="painel-container">
      <div className="container">
        
        <header>
          <div className="esquerdo">
            <img src={logo} className="painel-logotipo" alt="Ártemis - Todos por UM"/>
            <span>Olá, {nome}</span>
          </div>
          <div className="direito">
            <Link to="/cadastro-ong" className="cadastrar-caso">Cadastrar nova ONG</Link>
            <button onClick={signOut}>
              <img src={sair} alt="Fazer logout"/>
            </button>
          </div>
        </header>

        <main>

          <div className="titulo">
            <h1>CASOS E ONG's CADASTRADOS</h1>
          </div>
          <ul className="abas">
            <li className={classOng} onClick={abaOng}>ONGS</li>
            <li className={classCaso} onClick={abaCaso}>CASOS</li>
          </ul>
        {cards}
        </main>
      </div>
    </div>
  )
}