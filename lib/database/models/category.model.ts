import { Document, model, models, Schema } from "mongoose";

export interface ICategory extends Document{
    _id:String,
    name:string
}

const CategorySchema= new Schema({
    name_category:{type: String, required:true, unique: true}
})

const Category= models.Category || model('Category', CategorySchema)

export default Category