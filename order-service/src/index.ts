import express from 'express';
import { Order } from './models/order.model';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/ping', (req:any, res:any) => res.send('pong'  ))


app.post('/api/v1/orders', (req:any, res:any) => {
  const order: Order = req.body;
  console.log('Order received:', order);
  res.status(201).send('Order created successfully!');
});

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});