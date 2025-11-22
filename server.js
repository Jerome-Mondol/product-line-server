import express from 'express'
import cors from 'cors'
import jwtRoute from './routes/jwt.routes.js'
import usersRoute from './routes/users.routes.js'
import { connectDB } from './mongo.js';


const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  // <--- your frontend origin
  credentials: true                // <--- allow cookies
}));

connectDB();


app.use('/jwt', jwtRoute);
app.use('/users', usersRoute);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));