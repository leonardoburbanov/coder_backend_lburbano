import mongoose from 'mongoose';

const collection = 'carts';
/*
		"products": []
*/
const schema = new mongoose.Schema({
    products:{
        type:Array,
        require:false
    }
})

const cartModel = mongoose.model(collection,schema);
export default cartModel;