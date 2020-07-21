import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import logo from '../../assets/artemis-logo-azul.png';
import mail from '../../assets/mail.svg';

import './index.css';
import { ong } from '../../services/auth';

function Welcome() {
  const [casos, setCasos ] = useState([]);

  async function loadDados(){

    const dados = await api.get('/publico');
    console.log(dados)
    let resposta = dados.data;
    if(resposta.status === 'sucesso'){
      if(resposta.casos.length > 0){
        setCasos(resposta.casos);
        console.log(resposta.casos)
      }else{
      }
  }
}
  useEffect(()=>{
    loadDados();
  },[]);

  return (
    <div className="painel-container">
      <div className="container">
        <header>
          <div className="esquerdo">
            <img src={logo} className="painel-logotipo" alt="Ártemis - Todos por UM"/>
          </div>
          <div className="direito">
            <Link to="/cadastro-ong" className="cadastrar-caso">Cadastre sua ONG</Link>
            <Link to="/login" className="acessar-painel">
              <span>Painel</span>
            </Link>
          </div>
        </header>

        <main>
          <div className="titulo">
            <h1>VEJA TODOS OS CASOS CADASTRADOS</h1>
          </div>
          <div className="casos">
            {casos.map(caso=>(
              <ul key={caso.id + caso.ong_id}>
                <li>
                  <h2>{caso.titulo}</h2>
                </li>
                <li>
                  <h3>Descrição</h3>
                  <p>{caso.descricao}</p>
                </li>
                <li>
                  <h3>Categoria</h3>
                  <p>{caso.tipo}</p>
                </li>
                <li>
                  <h3>Valor necessário</h3>
                  <p>{caso.valor}</p>
                </li>
                <li>
                  <h3 id={caso.id}>ONG:</h3>
                  <p>{caso.nome}</p>
                </li>
                <li className="painel-contatos">
                  <a href={`mailto:${caso.email}`} className="painel-email">
                    <img src={mail} alt="Email"/>
                  </a>
                </li>
              </ul>
            ))}
          
          </div>
        </main>
      </div>
    </div>
  );
}

export default Welcome;