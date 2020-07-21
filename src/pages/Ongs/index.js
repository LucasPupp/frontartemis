import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import lixeira from '../../assets/delete.svg';
import phone from '../../assets/phone.svg';
import mail from '../../assets/mail.svg';

export default function Ongs(props){
  const [ongs, setOngs] = useState([]);
  const [texto, setTexto] = useState('');
  
  async function loadDados(){
    const dados = await api.get(`/admin-ongs`);
    let resposta = dados.data;
    if(resposta.status === 'sucesso'){
      if(resposta.ongs.length > 0){
        setOngs(resposta.ongs);
        console.log(resposta.ongs)
        setTexto('');
      }else{

        setTexto('Você ainda não tem nenhum ong criado. Clique no botão acima e crie seu primeiro ong.')
      }
    }
  }
  useEffect(()=>{
    loadDados();

  },[])

  const deletar = async (ongid)=>{
    console.log(ongid);
    let {data} = await api.delete(`admin-ongs/${ongid}`);
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
    <>
    {texto && <h2 className="texto-primeiro">{texto}</h2>}
    <div className="casos ongs">
      {ongs.map(ong=>(
      <ul key={ong.id}>
        <button className="painel-deletar" onClick={()=>{deletar(ong.id)}}>
          <img src={lixeira} alt="deletar"/>
        </button>
        <li>
          <h2>{ong.nome}</h2>
        </li>
        <li>
          <h3>E-mail: </h3>
          <p>{ong.email}</p>
        </li>
        <li>
          <h3>Telefone: </h3>
          <p><a href={`https://web.whatsapp.com/send?phone=55${ong.telefone}`} target="_blank" rel="noopener noreferrer">{ong.telefone}</a></p>
        </li>
        <li>
          <h3>Cidade</h3>
          <p>{ong.cidade}</p>
        </li>
        <li>
          <h3>Estado (UF)</h3>
          <p>{ong.uf}</p>
        </li>
        <li className="painel-contatos">
          <a href={`https://web.whatsapp.com/send?phone=55${ong.telefone}`} target="_blank" rel="noopener noreferrer" className="painel-whats">
            <img src={phone} alt="WhatsApp"/>
          </a>
          <a href={`mailto:${ong.email}`} className="painel-email">
            <img src={mail} alt="Email"/>
          </a>
        </li>
      </ul>
      ))}
    </div>
    </>
  )
}