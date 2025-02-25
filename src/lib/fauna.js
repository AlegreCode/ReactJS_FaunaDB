import { Client, fql } from "fauna"

// Asegúrate de crear un archivo .env para almacenar tu clave secreta
const client = new Client({
  secret: import.meta.env.VITE_REACT_APP_FAUNA_SECRET,
})

export default client