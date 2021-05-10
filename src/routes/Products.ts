import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import ProductDao from '@daos/Product/ProductDao.mock';
import { paramMissingError } from '@shared/constants';

const productDao = new ProductDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;


/**
 * Get all products.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function getAllproducts(req: Request, res: Response) {
    const products = await productDao.getAll();
    return res.status(OK).json({products});
}

/**
 * Get one product.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export async function getOneproduct(req: Request, res: Response) {

    if(req.query && req.params.id){
        const product = await productDao.getOne(req.params.id);

        if(product.message === 'Request failed with status code 404') {

            return res.status(400).send({
                message: 'Product has not found!'
            });
        }
        return res.status(OK).json({product});
    } else {

        return res.status(400).send({
            message: 'Product id has not been provided!'
        });
    }
}


/**
 * Add one product.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function addOneproduct(req: Request, res: Response) {
    const { product } = req.body;

    if (!product.id || !product.name || !product.price || !product.quantity) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await productDao.add(product);
    return res.status(CREATED).end();
}


/**
 * Update one product.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
// export async function updateOneproduct(req: Request, res: Response) {
//     const { product } = req.body;
//     if (!product) {
//         return res.status(BAD_REQUEST).json({
//             error: paramMissingError,
//         });
//     }
//     product.id = product.id;
//     await productDao.update(product);
//     return res.status(OK).end();
// }

/**
 * Delete one product.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function deleteOneproduct(req: Request, res: Response) {

    if(req.query && req.params.id){

        const product = await productDao.delete(Number(req.params.id));
        if(product?.message === 'Request failed with status code 404') {

            return res.status(400).send({
                message: 'Product has not found!'
            });
        }
        return res.status(OK).json({
            message: 'Product has been deleted!'
        });
    } else {
            
        res.status(400).send({
            message: 'Product id has not been provided!'
        });
    }
}
