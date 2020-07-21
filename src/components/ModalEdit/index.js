import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import './index.css'

function ModalEdit(props){
  const [titulo, setTitulo] = useState('')
  const [valor, setValor] = useState('')
  const [categoria, setCategoria] = useState('')
  const [descricao, setDescricao] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [id, setId] = useState();
  const [ongid, setOngId] = useState(localStorage.getItem('id_user'))

  const limpaState = ()=>{
    setTitulo();
    setValor();
    setCategoria();
    setDescricao();
  }
  useEffect(()=>{
    if(props.isOpen==='open'){
      loadDados();

    }
  },[props.isOpen])
  
  const loadDados = async ()=>{
    let ong_id ="";
    if(props.idOng){
      ong_id = props.idOng
    }else{
      ong_id = ongid;
    }
    let {data} = await api.get(`/casos/${props.idCaso}-${ong_id}`);
    let caso = data.caso[0];
    console.log(caso);
    setTitulo(caso.titulo);
    setDescricao(caso.descricao);
    setValor(caso.valor);
    setCategoria(caso.tipo);
  }
  const salvarDados = async(e)=>{
    e.preventDefault();
    setErro('');
    setSucesso('');
    if(!titulo || !valor || !descricao || !categoria){
      setErro('Preencha todas as informações!')
      return 
    }
    let tipo = categoria;
    let ong_id="";
    if(props.idOng){
      ong_id = props.idOng
    }else{
      ong_id = ongid;
    }
    let {data} = await api.put(`/casos/${props.idCaso}`, {titulo,descricao,valor,tipo,ong_id})
    console.log(data);
    if(data.status ==='sucesso'){
      props.load();
      setErro('');
      setSucesso(data.message);
      console.log('sucesso');
    }else{
      setSucesso('');
      setErro(data.message);
      console.log(data.message);
    }
    console.log(titulo)
    console.log(descricao)
    console.log(valor)
    console.log(categoria)
  }

  const fechar = () =>{
    limpaState();
    props.limpaId();
    props.isClose();
  }

  return (
    <div className={"modal " + props.isOpen}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Atualizar Caso</h2>
          {erro && <p className="erro">{erro}</p>}
          {sucesso && <p className="sucesso">{sucesso}</p>}
        </div>
        <form className="modal-body">
          <input 
            type="text" 
            placeholder="Título"
            defaultValue={titulo}
            onChange={e=>setTitulo(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Valor" 
            defaultValue={valor}
            onChange={e=>setValor(e.target.value)}  
          />
          <input
            type="text"
            placeholder="Categoria"
            defaultValue={categoria}
            onChange={e=>setCategoria(e.target.value)}
          />
          <textarea 
            name="descricao" 
            id="descricao" 
            placeholder="Descrição" 
            defaultValue={descricao}
            onChange={e=>setDescricao(e.target.value)}
          ></textarea>
        </form>

        <div className="modal-footer">
          <button className="cancelar" onClick={fechar}>Cancelar</button>
          <button className="salvar" onClick={salvarDados}>Salvar</button>
        </div>
      </div>
    </div>
  )
}

export default ModalEdit;