import { Iproduct } from "@entities/Product";

declare module 'express' {
    export interface Request  {
        body: {
            product: Iproduct
        };
    }
}
