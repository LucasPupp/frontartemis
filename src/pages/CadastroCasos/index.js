import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import logo from '../../assets/artemis-logo-azul.png';
import './index.css'
export default function CadastroCaso(){
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('');
  const [link, setLink] = useState('');
  const [acesso, setAcesso] = useState('')
  const [id, setId] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  useEffect(()=>{
    let local = localStorage.getItem('acesso');
    setAcesso(local);
    setId(localStorage.getItem('id_user'));
    if(local === 'ong'){
      setLink('/painel')
    }else{
      setLink('/dashboard')
    }
    limpaState();
  }, [])

  const limpaState = ()=>{
    setTitulo('');
    setDescricao('');
    setValor('');
    setTipo('');
  }

  const cadastrarCaso = async (e)=>{
    e.preventDefault()
    if(!titulo || !valor || !tipo || !descricao){
      setErro('Preencha todos os campos');
      return 
    }

    let {data} = await api.post(`/casos`, {titulo, tipo,valor,descricao,acesso,id})
    if(data.status ==="sucesso"){
      setErro('');
      setSucesso(data.message);
      limpaState();

    }else{
      setSucesso('');
      setErro('Não foi possível cadastrar, tente novamente ou entre em contato com o suporte.');
    }

  }
  return(
    <div className="cadastro-container">
      <div className="container">
        <div className="esquerdo">
          {erro && <p className="erro">{erro}</p>}
          {sucesso && <p className="sucesso">{sucesso}</p>}
          <img src={logo} alt="Ártemis - Todos por um"/>
          <p>Preencha todos os Dados para cadastrar o Caso.</p>
          <Link to={link} >Voltar ao painel</Link>
        </div>

        <form className="direito" onSubmit={cadastrarCaso}>
          <h2>Preencha todos os campos abaixo e cadastra seu caso</h2>

          <input type="text" placeholder="Título do caso" value={titulo} onChange={e => setTitulo(e.target.value)}/>
          <input type="valor" placeholder="Valor necessário" value={valor} onChange={e => setValor(e.target.value)}/>
          <input type="text" placeholder="Tipo de PET" value={tipo} onChange={e => setTipo(e.target.value)}/>
          <textarea name="descricao" id="descricao" rows="10" placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)}></textarea>
          <button type="submit">
            <span>Cadastrar</span>
          </button>
        </form>

      </div>
    </div>
    
  )
}