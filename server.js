import express from 'express'
import cors from 'cors'

import jwtRoute from './routes/jwt.routes.js'

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  // <--- your frontend origin
  credentials: true                // <--- allow cookies
}));


app.use('/jwt', jwtRoute);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));