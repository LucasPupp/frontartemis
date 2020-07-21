import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import logo from '../../assets/artemis-logo-azul.png';
import './index.css'
export default function CadastroCaso(){
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
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
    setNome('');
    setEmail('');
    setSenha('');
    setTelefone('');
    setCidade('');
    setUf('');
  }

  const cadastrarOng = async (e)=>{
    e.preventDefault()
    if(!nome || !email || !senha || !telefone || !cidade || !uf){
      setErro('Preencha todos os campos');
      return 
    }

    let {data} = await api.post(`/admin-ongs`, {nome, email,senha,telefone,cidade,uf});
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
          <p>Preencha todos os Dados para cadastrar a ONG.</p>
          <Link to={link} >Voltar ao painel</Link>
        </div>

        <form className="direito" onSubmit={cadastrarOng}>
          <h2>Cadastro ONG</h2>

          <input
            type="text"
            placeholder="Nome" 
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            type="password"
            placeholder="Senha"
            value={senha} 
            onChange={e => setSenha(e.target.value)}
          />
          <input 
            type="tel"
            placeholder="Telefone"
            value={telefone} 
            onChange={e => setTelefone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cidade" 
            value={cidade}
            onChange={e => setCidade(e.target.value)}
          />
          <input
            type="text"
            placeholder="Estado (UF)" 
            value={uf}
            onChange={e => setUf(e.target.value)}
          />
          <button type="submit">
            <span>Cadastrar</span>
          </button>
        </form>

      </div>
    </div>
    
  )
}