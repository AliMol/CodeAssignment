import { Iproduct } from '@entities/Product';
import { AxiosResponse } from 'axios';


export interface IproductDao {
    getOne: (id: string) => Promise<AxiosResponse<any>>;
    getAll: () => Promise<AxiosResponse<any>>;
    add: (product: Iproduct) => any;
    // update: (product: Iproduct) => Promise<AxiosResponse<any>>;
    delete: (id: number) => Promise<AxiosResponse<any>>;
}

class productDao implements IproductDao {


    /**
     * @param id
     */
    public getOne(id: string): Promise<any> {
        // TODO
        return Promise.resolve();
    }

    /**
     *
     */
    public getAll(): Promise<any> {
         // TODO
        return Promise.resolve([]);
    }

    /**
     *
     * @param product
     */
    public async add(product: Iproduct):  Promise<any> {
         // TODO
        return Promise.resolve();
    }

    /**
     *
     * @param product
     */
    // public async update(product: Iproduct): Promise<any> {
    //      // TODO
    //     return Promise.resolve();
    // }

    /**
     *
     * @param id
     */
    public async delete(id: number): Promise<any> {
         // TODO
        return Promise.resolve();
    }
}

export default productDao;
