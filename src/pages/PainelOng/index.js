import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import {logout } from '../../services/auth';
import ModalEdit from '../../components/ModalEdit';
import sair from '../../assets/sair.svg';
import edit from '../../assets/edit.svg';
import logo from '../../assets/artemis-logo-azul.png';
import lixeira from '../../assets/delete.svg';

import './index.css';

export default function PainelOng(props){
  const [casos, setCasos] = useState([]);
  const [texto, setTexto] = useState('');
  const [nome, setNome] = useState(localStorage.getItem('nome'));
  const [idCaso, setIdCaso] = useState('');
  const [modal, setModal] = useState('');

  async function loadDados(){
    const id = localStorage.getItem('id_user');
    const dados = await api.get(`/casos/all/${id}`);
    let resposta = dados.data;
    if(resposta.status === 'sucesso'){
      if(resposta.casos.length > 0){
        setCasos(resposta.casos);
        setTexto('');
        console.log(resposta.casos)
      }else{

        setTexto('Você ainda não tem nenhum caso criado. Clique no botão acima e crie seu primeiro caso.')
      }
    }
  }
  useEffect(()=>{
    loadDados();

  },[])


  function signOut(e){
    e.preventDefault();
    try{
      logout();
      return props.history.push('/');
    }catch(e){
      return console.log(e)
    }
  }

  const modalOpen = (valor) =>{
    setIdCaso(valor);
    setModal('open')
  }

  const deletar = async (casoid)=>{
    let ong_id = localStorage.getItem('id_user');
    console.log(casoid);
    console.log(ong_id);
    let {data} = await api.delete(`casos/${casoid}-${ong_id}`);
    console.log(data)
    try{
      if(data.status === 'sucesso'){
        loadDados();
      }else{
        alert(data.message);
      }
    }catch(e){
      console.log(e);
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
            <Link to="/cadastro-caso" className="cadastrar-caso">Cadastrar novo caso</Link>
            <button onClick={signOut}>
              <img src={sair} alt="Fazer logout"/>
            </button>
          </div>
        </header>

        <main>
          <div className="titulo">
            <h1>SEUS CASOS CADASTRADOS</h1>
          </div>
          {texto && <h2 className="texto-primeiro">{texto}</h2>}
          <div className="casos">
            {casos.map(caso=>(
              <ul key={caso.id}>
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
                <li className="painel-contatos">
                  <button onClick={()=>{modalOpen(caso.id)}}>
                    <img src={edit} alt="Editar"/>
                  </button>
                  <button onClick={()=>{deletar(caso.id)}}>
                    <img src={lixeira} alt="deletar"/>
                  </button>
                </li>
              </ul>
            ))}
          
          </div>
        </main>
          
      </div>
      <ModalEdit isOpen={modal} idCaso={idCaso} isClose={()=>{setModal('')}} limpaId={()=>{setIdCaso('')}} load={loadDados}/>
    </div>
  )
}