import { Iproduct } from '@entities/Product';
import { IproductDao } from './ProductDao';
import axios from 'axios';

const baseurl = process.env.baseurl || 'https://ev5uwiczj6.execute-api.eu-central-1.amazonaws.com/test/supply-chain';

class productDao implements IproductDao {
   
    public async getOne(id: string): Promise<any> {
        try{
            const response = await axios.get(`${baseurl}/${id}`);
            return response?.data;
        } catch(error) {
            return error;
        }
    }

    public async getAll(): Promise<any> {
        try{
            const response = await axios.get(baseurl);
            return response?.data;
        } catch(error) {
            return error;
        }
    }

    public async add(product: Iproduct): Promise<any> {
        try{
            const response = await axios.post(`${baseurl}`, {
            "quantity": product.quantity,
            "id": product.id,
            "price": product.price,
            "name": product.name
            });
            return response?.data;

        } catch(error) {
            return error;
        }
    }

    // public async update(product: Iproduct): Promise<any> {
    //     const response = await axios.put(`${baseurl}`, {
    //         "quantity": product.quantity,
    //         "id": product.id,
    //         "price": product.price,
    //         "name": product.name
    //     });
    //     return response?.data;
    // }

    public async delete(id: number): Promise<any> {
        try{
            const response = await axios.delete(`${baseurl}/${id}`);
            return response?.data;
        } catch(error) {
            return error;
        }
    }
}

export default productDao;
