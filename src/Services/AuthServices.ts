import axios from 'axios';

async function iniciarSesion(credenciales: { usuario: string; password: string }) {
  try {
    const URL = process.env.URL_OPERATIVO_API+'public/api/auth/login';
    const response = await axios.post(URL, credenciales);
    if(response.status == 200){
        const TOKEN = response.data.data.token;
        const usuario = response.data.data.usuario?.id ?? 0;
        return { success: true, token: TOKEN , idUsuario : usuario};
    }else{
        return { success: false, error: 'Credenciales inválidas' };
    }
  } catch (error) {
    return { success: false, error: "Error con las credenciales de acceso." };
  }
}

export { iniciarSesion };