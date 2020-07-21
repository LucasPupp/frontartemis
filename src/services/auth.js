export const TOKEN_KEY = "token";
export const USER = "usuario";
export const ONG = "ong";
export const IDUSER = 'id_user';
export const ACESSO = 'acesso';
export const NOME = 'nome';

export const isAuthenticated = () =>localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => localStorage.getItem(USER);
export const getIdUser = () => localStorage.getItem(IDUSER);
export const getOng = () => localStorage.getItem(ONG);
export const getAcesso = () => localStorage.getItem(ACESSO);
export const getNome = () => localStorage.getItem(NOME);


export const login = token =>{localStorage.setItem(TOKEN_KEY, token)};
export const usuario = usuario =>{localStorage.setItem(USER, usuario)};
export const idusuario = idusuario =>{localStorage.setItem(IDUSER, idusuario)};
export const ong = ong =>{localStorage.setItem(ONG, ong)};
export const acesso = acesso =>{localStorage.setItem(ACESSO, acesso)};
export const nome = nome =>{localStorage.setItem(NOME, nome)};

export const logout = ()=>{
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(USER);
  localStorage.removeItem(IDUSER);
  localStorage.removeItem(ONG);
  localStorage.removeItem(ACESSO);
  localStorage.removeItem(NOME);
  localStorage.clear();
}