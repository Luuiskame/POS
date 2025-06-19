import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';

//routes
import checkRoutes from './routes/checkroutes';

// Crear instancia de Express
export const app = express();

// Crear instancia de Prisma (conexión a la DB)
export const prisma = new PrismaClient();

// ==========================================
// MIDDLEWARES DE SEGURIDAD
// ==========================================

// Helmet - Headers de seguridad
app.use(helmet());

// CORS - Para permitir requests desde el frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate Limiting - Prevenir ataques de fuerza bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por IP
  message: {
    error: 'Demasiadas solicitudes, intenta de nuevo más tarde'
  }
});
app.use(limiter);

// ==========================================
// MIDDLEWARES DE PARSEO
// ==========================================

// Parsear JSON
app.use(express.json({ limit: '10mb' }));

// Parsear URL-encoded
app.use(express.urlencoded({ extended: true }));

// ==========================================
// LOGGING
// ==========================================

// Morgan - Logging de requests
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.use('/api', checkRoutes)

// ==========================================
// RUTAS
// ==========================================

// Ruta de salud del servidor
// app.get('/health', (req, res) => {
//   res.json({
//     status: 'OK',
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV || 'development'
//   });
// });

// // Ruta de prueba de base de datos
// app.get('/db-test', async (req, res) => {
//   try {
//     // Intentar conectar a la base de datos
//     await prisma.$connect();
//     res.json({
//       status: 'Database connected successfully',
//       timestamp: new Date().toISOString()
//     });
//   } catch (error) {
//     console.error('Database connection error:', error);
//     res.status(500).json({
//       error: 'Database connection failed',
//       message: error instanceof Error ? error.message : 'Unknown error'
//     });
//   }
// });

// // TODO: Aquí irán las rutas de la API
// // app.use('/api/auth', authRoutes);
// // app.use('/api/products', productRoutes);
// // app.use('/api/transactions', transactionRoutes);

// // ==========================================
// // MANEJO DE ERRORES
// // ==========================================

// // Ruta no encontrada
// app.use('*', (req, res) => {
//   res.status(404).json({
//     error: 'Ruta no encontrada',
//     path: req.originalUrl
//   });
// });

// // Manejo global de errores
// app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   console.error('Error:', err);
  
//   res.status(500).json({
//     error: 'Error interno del servidor',
//     message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
//   });
// });

// // ==========================================
// // GRACEFUL SHUTDOWN
// // ==========================================

// // Cerrar conexiones limpiamente al terminar el proceso
// process.on('SIGINT', async () => {
//   console.log('\n🔄 Cerrando servidor...');
//   await prisma.$disconnect();
//   console.log('✅ Conexiones cerradas');
//   process.exit(0);
// });

// process.on('SIGTERM', async () => {
//   console.log('\n🔄 Cerrando servidor...');
//   await prisma.$disconnect();
//   console.log('✅ Conexiones cerradas');
//   process.exit(0);
// });