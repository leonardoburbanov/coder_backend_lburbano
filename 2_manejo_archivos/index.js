import ProductManager from "./manager/productManager.js";
const path = './files/Products.json'

//Se creará una instancia de la clase “ProductManager”
const manager = new ProductManager(path);

const env = async () =>{
    let product ={
        title:'producto prueba',
        description:'Este es un producto prueba',
        price:200,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock: 25
    }

    //Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
    let products = await manager.getProducts()
    console.log('Products: ',products)

    await manager.addProduct(product);
    //Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
    console.log('Products: ',await manager.getProducts())

    //Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
    let addedProduct = await manager.getProductById(1)
    console.log(addedProduct)
    addedProduct = await manager.getProductById(400)
    console.log(addedProduct)

    //Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
    let newProduct ={
        code: 'TESTUPDATE',
        stock: 555555
    }
    await manager.updateProduct(1,newProduct)
    products = await manager.getProducts()
    console.log('Products: ',products)

    //Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
    await manager.deleteProduct(1)
    products = await manager.getProducts()
    console.log('Products: ',products)

    console.log(await manager.deleteProduct(400))
} 

env()