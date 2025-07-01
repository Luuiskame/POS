import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';

//routes
import checkRoutes from './routes/checkRoutes';
import authRoutes from './routes/authRoutes';

//admin routes
import adminRoutes from './routes/adminRoutes';

//store routes
import storeRoutes from './routes/storeRoutes';

// Crear instancia de Express
export const app = express();

// Crear instancia de Prisma (conexión a la DB)
export const prisma = new PrismaClient();

// ==========================================
// MIDDLEWARES DE SEGURIDAD
// ==========================================

// Helmet - Headers de seguridad
app.use(helmet());
// Cookie Parser - Para manejar cookies
app.use(cookieParser());

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
app.use('/api/auth', authRoutes);
app.use('/api/store', storeRoutes)
// app.use('/api/admin', adminRoutes);

