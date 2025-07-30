import express from 'express';
import cors from 'cors'
import { verifyApiToken } from "./middlewares/auth.js";
import taskRoutes from "./routes/taskRoutes.js"


const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://192.168.0.106:5173'
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  
    allowedHeaders: ["Content-Type", "x-api-token", "Authorization"],
    credentials: true,
}));

app.use(express.json());


// app.use(verifyApiToken);


app.get('/', (req, res) => {
  res.send('Success...');
});



app.use('/api/tasks', taskRoutes);

export default app;