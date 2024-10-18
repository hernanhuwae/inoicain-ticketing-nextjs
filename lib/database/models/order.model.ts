import {Document, model, models, Schema} from 'mongoose'

export interface IOrder extends Document {
    createAt:Date,
    totalAmount:String,
    stripeId:String,
    event:{
        _id:String,
        title:String
    },
    buyer:{
        _id:String,
        firstname:String,
        lastname:String
    },

}

export type IOrderItems={
    _id: String,
    createAt:Date,
    totalAmount:String,
    eventId:String,
    eventTitle:String
}

const OrderSchema= new Schema({
    createAt:{
        type:Date,
        default:Date.now
    },
    totalAmount:{
        type:String,
    },
    stripeId:{
        type: String,
        reequired:true
    },
    event:{
        type:Schema.Types.ObjectId,
        ref: 'Event'
    },
    buyer:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Order= models.Order || model('Order', OrderSchema)

export default Order