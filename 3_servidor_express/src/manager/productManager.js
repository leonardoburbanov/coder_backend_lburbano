import fs from 'fs';

export default class ProductManager {
    constructor(path){
        this.path = path

    }
    getProducts = async () =>{
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const users = JSON.parse(data);
            return users;
        }else{
            return [];
        }
    }
    addProduct = async (product) => {
        const products = await this.getProducts();

        if(products.length === 0){
            product.id = 1
        }else{
            product.id = products[products.length-1].id+1;
        }
        products.push(product)
        await fs.promises.writeFile(this.path, JSON.stringify(products,null, '\t'))
        return product
    }
    getProductById = async(id_product)=>{
        let products = await this.getProducts();
        let product_found = products.find(product => product.id == id_product)
        if(product_found){
            return product_found
        }else{
            return;
        }
    }
    updateProduct = async(id_product,object_to_update)=>{
        let products = await this.getProducts();
        let product_found = products.find(product => product.id == id_product)
        if(product_found){
            let new_products = []
            products.forEach(element => {
                if(element.id == id_product){
                    Object.assign(element,object_to_update)
                    new_products.push(element)
                }else{
                    new_products.push(element)
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(new_products,null, '\t'))
            return new_products;   
        }else{
            return 'Error in update operation. Product not found.'
        }
    
       

    }

    deleteProduct = async(id_product)=>{
        let products = await this.getProducts();
        let product_found = products.find(product => product.id == id_product)
        if(product_found){
            let new_products = []
            products.forEach(element => {
                if(element.id == id_product){
                    
                }else{
                    new_products.push(element)
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(new_products,null, '\t'))
            return product_found;   
        }else{
            return 'Error in delete operation. Product not found.'
        }
    
       

    }

}