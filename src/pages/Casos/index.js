import React, {useEffect, useState} from 'react';
import ModalEdit from '../../components/ModalEdit';
import api from '../../services/api';
import lixeira from '../../assets/delete.svg';
import edit from '../../assets/edit.svg';

export default function Casos(props){
  const [ casos, setCasos ] = useState([]);
  const [texto, setTexto] = useState('');
  const [idCaso, setIdCaso] = useState('');
  const [ongId, setOngId] = useState('');
  const [modal, setModal] = useState('');
  
  async function loadDados(){

    const dados = await api.get('/admin-casos');
    let resposta = dados.data;
    if(resposta.status === 'sucesso'){
      if(resposta.casos.length > 0){
        setCasos(resposta.casos);
        console.log(resposta.casos)
        setTexto('');
      }else{

        setTexto('Ainda não tem nenhum caso criado. Clique no botão acima e crie seu primeiro caso.')
      }
  }
}
  useEffect(()=>{
    loadDados();
  },[]);

  const modalOpen = (valor,ong) =>{
    setIdCaso(valor);
    setOngId(ong);
    setModal('open')
  }

  const deletar = async (casoid)=>{


    let {data} = await api.delete(`admin-casos/${casoid}`);
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

  return (
    <>
    {texto && <h2 className="texto-primeiro">{texto}</h2>}
    <div className="casos">
      {casos.map(caso =>(
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
                  <button onClick={()=>{modalOpen(caso.id,caso.ong_id)}}>
                    <img src={edit} alt="Editar"/>
                  </button>
                  <button onClick={()=>{deletar(caso.id)}}>
                    <img src={lixeira} alt="deletar"/>
                  </button>
                </li>
          </ul>
        ))}

        <ModalEdit isOpen={modal} idCaso={idCaso} isClose={()=>{setModal('')}} limpaId={()=>{setIdCaso('')}} load={loadDados} idOng={ongId}/>
      </div>
    </>
  )
}