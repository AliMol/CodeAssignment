import supertest from 'supertest';
import StatusCodes from 'http-status-codes';
import { SuperTest, Test } from 'supertest';

import app from '@server';
import productDao from '@daos/Product/ProductDao.mock';
import Product, { Iproduct } from '@entities/Product';
import { pErr } from '@shared/functions';
import { paramMissingError } from '@shared/constants';
import { IReqBody, IResponse } from '../support/types';



describe('Products Routes', () => {

    const productsPath = '/api/products';
    const getproductsPath = `${productsPath}/getall`;
    const getoneproductPath = `${productsPath}/getone/:id`;
    const addproductsPath = `${productsPath}/add`;
    const updateproductPath = `${productsPath}/add`;
    const deleteproductPath = `${productsPath}/delete/:id`;

    const { BAD_REQUEST, CREATED, OK } = StatusCodes;
    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    describe(`"GET:${getproductsPath}"`, () => {

        const callApi = (id: number) => {
            const result = agent.get(getoneproductPath.replace(':id', id.toString()));
            return result
        };

        it(`should return a JSON object with all the products and a status code of "${OK}" if the
            request was successful.`, (done) => {
            // Setup spy
            const products = [
                {"quantity": 3,"id": "3000","price": 1.05,"name": "xxx"},
                {"quantity": 4,"id": "4000","price": 1.05,"name": "xxx"},
                {"quantity": 5,"id": "5000","price": 1.05,"name": "xxx"},
            ];
            spyOn(productDao.prototype, 'getAll').and.returnValue(Promise.resolve(products));
            // Call API
            agent.get(getproductsPath)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(200);
                    // Caste instance-objects to 'Product' objects
                    const respproducts = res.body.products;
                    // const retproducts: Product[] = respproducts.map((product: Iproduct) => {
                    //     return new Product(products);
                    // });
                    expect(respproducts).toEqual(products);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with one product and a status code of "${OK}" if the
            request was successful.`, (done) => {

            // Setup spy
            const product = {"quantity": 3,"id": "221","price": 1.05,"name": "xxx"};
            spyOn(productDao.prototype, 'getOne').and.returnValue(Promise.resolve(product));
            // Call API
            callApi(221)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(200);
                    // Caste instance-objects to 'Product' objects
                    const respproduct = res.body.product;
                    // const retproducts: Product[] = respproducts.map((product: Iproduct) => {
                    //     return new Product(products);
                    // });
                    expect(respproduct).toEqual(product);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the Product has not found.`, (done) => {
            // Setup spy
            const deleteErrMsg = 'Product has not found!';
            spyOn(productDao.prototype, 'getOne').and.throwError(deleteErrMsg);
            // Call Api
            callApi(3000)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(deleteErrMsg);
                    done();
            });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the Product has not found.`, (done) => {
            // Setup spy
            const deleteErrMsg = 'Product id has not been provided!';
            spyOn(productDao.prototype, 'getOne').and.throwError(deleteErrMsg);
            // Call Api
            agent.get(getoneproductPath)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(400);
                    expect(res.body.error).toBe(deleteErrMsg);
                    done();
                });
        });

    });


    describe(`"POST:${addproductsPath}"`, () => {

        const callApi = (reqBody: IReqBody) => {
            return agent.post(addproductsPath).type('form').send(reqBody);
        };

        const productData = {
            product: new Product("3000", "MyTest", 1.05, 3 ),
        };

        it(`should return a status code of "${CREATED}" if the request was successful.`, (done) => {
            // Setup Spy
            spyOn(productDao.prototype, 'add').and.returnValue(Promise.resolve());
            // Call API
            agent.post(addproductsPath).type('form').send(productData)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(CREATED);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
            // Setup spy
            const errMsg = 'One or more of the required parameters was missing.';
            spyOn(productDao.prototype, 'add').and.throwError(errMsg);
            // Call API
            callApi(productData)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });
    });

    describe(`"PUT:${updateproductPath}"`, () => {

        const callApi = (reqBody: IReqBody) => {
            return agent.post(updateproductPath).type('form').send(reqBody);
        };

        const productData = {
            product: new Product("3000", "MyTest", 2.05, 4 ),
        };

        it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
            // Setup spy
            spyOn(productDao.prototype, 'add').and.returnValue(Promise.resolve());
            // Call Api
            callApi(productData)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(201);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });
    });

    describe(`"DELETE:${deleteproductPath}"`, () => {

        const callApi = (id: number) => {
            return agent.delete(deleteproductPath.replace(':id', id.toString()));
        };

        it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
            // Setup spy
            const deleteErrMsg = 'Product has been deleted!';
            spyOn(productDao.prototype, 'delete').and.returnValue(Promise.resolve());
            // Call api
            callApi(201)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    expect(res.body.message).toBe(deleteErrMsg);
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the Product has not found.`, (done) => {
            // Setup spy
            const deleteErrMsg = 'Product has not found!';
            spyOn(productDao.prototype, 'delete').and.throwError(deleteErrMsg);
            // Call Api
            callApi(3000)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(deleteErrMsg);
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the Product id has not been provided!`, (done) => {
            // Setup spy
            const deleteErrMsg = 'Product id has not been provided!';
            spyOn(productDao.prototype, 'delete').and.throwError(deleteErrMsg);
            // Call Api
            agent.get(deleteproductPath)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(404);
                    done();
                });
        });
    });
});
