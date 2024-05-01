import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //Después de reiniciar, el entorno de desarrollo de React funcionará como proxy . Si el código React realiza 
  //una solicitud HTTP a una dirección de servidor en http://localhost:5173 no administrada por la propia 
  //aplicación React (es decir, cuando las solicitudes no tratan de recuperar el CSS o JavaScript 
  //de la aplicación), la solicitud se redirigirá a el servidor en http://localhost:3001 .

  //Tenga en cuenta que con la configuración de vite que se muestra, solo las solicitudes que se 
  //realizan a rutas que comienzan con /api se redirigen al servidor.
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },
})
