import dotenv from 'dotenv';
import { app } from './src/app';

// Cargar variables de entorno
dotenv.config();

const PORT = process.env.PORT || 3001;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 Entorno: ${process.env.NODE_ENV || 'development'}`);
});