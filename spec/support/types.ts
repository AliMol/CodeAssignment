import { Response } from 'supertest';
import { Iproduct } from '@entities/Product';


export interface IResponse extends Response {
    body: {
        product: Iproduct;
        products: Iproduct[];
        error: string;
        message: string;
    };
}

export interface IReqBody {
    product?: Iproduct;
}
