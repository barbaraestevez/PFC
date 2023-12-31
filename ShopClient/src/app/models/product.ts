export class Product {
    _id?: string;
    name: string;
    category: string;
    location: string;
    img: string;
    price: number;
    isLocalFile?:boolean;

    constructor(name: string, category: string, location: string, img: string, price: number) {
        this.name = name;
        this.category = category;
        this.location = location;
        this.img = img;
        this.price = price;
    }

}