export interface Iproduct {
    id: string;
    name: string;
    price: number;
    quantity: number
}

class Product implements Iproduct {

    public id: string;
    public name: string;
    public price: number;
    public quantity: number;

    constructor(id: string, nameOrproduct: string | Iproduct, price: number, quantity: number) {
        if (typeof nameOrproduct === 'string') {
            this.id = id || '-1';
            this.name = nameOrproduct;
            this.price = price;
            this.quantity = quantity;
            
        } else {
            this.id = nameOrproduct.id;
            this.name = nameOrproduct.name;
            this.price = nameOrproduct.price;
            this.quantity = nameOrproduct.quantity;
        }
    }
}

export default Product;
