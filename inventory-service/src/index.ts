import express from 'express';
import { Inventory } from './models/inventory.model';

const app = express();
const port = 3001;

app.use(express.json());

const inventories: Inventory[] = [
  { id: '1', productId: '1', quantity: 10 },
  { id: '2', productId: '2', quantity: 5 },
  { id: '3', productId: '3', quantity: 20 },
];

app.get('/inventories', (req:any, res:any) => {
  res.json(inventories);
});

app.get('/ping', (req:any, res:any) => res.send('pong'  ))

//  create a simple endpoint to get inventory by product id
app.get('/inventories/:productId', (req:any, res:any) => {
  const productId = req.params.productId;
  const inventory = inventories.find(i => i.productId === productId);
  if (inventory) {
    res.json(inventory);
  } else {
    res.status(404).send('Inventory not found');
  }
});

//  create a simple endpoint to update inventory by product id
app.put('/inventories/:productId', (req:any, res:any) => {
  const productId = req.params.productId;
  const quantity = req.body.quantity;
  const inventory = inventories.find(i => i.productId === productId);
  if (inventory) {
    inventory.quantity = quantity;
    res.status(200).send('Inventory updated successfully!');
  } else {
    res.status(404).send('Inventory not found');
  }
});


app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});