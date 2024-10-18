import { Document, model, models, Schema } from "mongoose";

export interface IEvent extends Document{
    _id:String
    title:String,
    desc:String,
    location:String,
    imageUrl:String,
    createAt:Date,
    startDateTime:Date,
    endDateTime:Date,
    price:String,
    isFree:String,
    url:String,
    category:{_id:String, name:String},
    organizer:{_id:String, firstName:String, lastName:String}
}

const EventSchema=new Schema({
    title: {type:String, requred:true},
    desc:{type:String},
    location:{type:String},
    imageUrl:{type:String},
    createAt:{type:Date, default:Date.now},
    startDateTime:{type:Date, default:Date.now},
    endDateTime:{type:Date, default:Date.now},
    price:{type:String},
    isFree:{type:Boolean},
    url:{type:String},
    category:{type:Schema.Types.ObjectId, ref:'Category'},
    organizer:{type:Schema.Types.ObjectId, ref:'User'}
})

const Event= models.Event || model('Event', EventSchema)

export default Event
