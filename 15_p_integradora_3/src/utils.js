import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import {Faker, en, es } from "@faker-js/faker";

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validatePassword = (password, user) => bcrypt.compareSync(password, user.password);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const customFaker = new Faker({
    //Por Ej. el idioma
    locale: [en],
})

const { commerce, image, database, string, internet, person, phone, datatype, lorem } = customFaker;

const generateProduct = () => {
    return {
        _id: database.mongodbObjectId(),
        title: commerce.productName(),
        description: commerce.productDescription(),
        price: parseFloat(commerce.price()),
        thumbnail:[image.url()],
        code: string.alphanumeric(10),
        stock: parseInt(string.numeric(2)),
        status: datatype.boolean(),
        category: commerce.department(),
    }
}

export const generateProducts = () => {    
    const productsNumber = 50
    let products = [];
    for (let i = 0; i < productsNumber; i++) {
        const product = generateProduct();
        products.push(product);
    }
    return products 
}

export default __dirname;
