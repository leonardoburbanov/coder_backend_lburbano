import mongoose from 'mongoose';

const collection = 'User';

const schema = new mongoose.Schema({
    first_name: String,
    last_name:String,
    email:String,
    age:Number,
    password:String,
    rol: {
        type: String,
        default: 'user'
    },
    githubProfile: { type: Object, required: false },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"carts"
    }
})
schema.pre('find', function(){
    this.populate("carts.cart");
})
const userModel = mongoose.model(collection, schema);

export default userModel;
