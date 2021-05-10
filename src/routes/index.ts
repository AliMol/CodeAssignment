import { Router } from 'express';
import { getAllproducts, getOneproduct, addOneproduct, deleteOneproduct } from './Products';


// Product-route
const productRouter = Router();
productRouter.get('/getall', getAllproducts);
productRouter.get('/getone/:id', getOneproduct);
productRouter.post('/add', addOneproduct);
// productRouter.put('/update', updateOneproduct);
productRouter.delete('/delete/:id', deleteOneproduct);


// Export the base-router
const baseRouter = Router();
baseRouter.use('/products', productRouter);
export default baseRouter;
