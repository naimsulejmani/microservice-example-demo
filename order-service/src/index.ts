import express from 'express';
import { Order } from './models/order.model';
import axios from 'axios';
import { config } from './config/environment.config';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/ping', (req:any, res:any) => res.send('pong'  ))


app.post('/api/v1/orders', async (req: any, res: any) => {
  /*
    Zbriti komplet artikujt, 
    ruaje porosine
  */
  const order: Order = req.body;
  console.log('Order received:', order);

  for (const item of order.items) {
    const response = await axios.put(`${config.INVENTORY_MANAGEMENT_URL}/inventories/${item.productId}`, { quantity: item.quantity });
    if (response.status !== 200) {
      return res.status(500).send('Inventory update failed');
    }
    console.log(`Inventory updated for product ${item.productId}`, order);
  }
  //ruajt porosine

  res.status(201).send('Order created successfully!');
});

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});