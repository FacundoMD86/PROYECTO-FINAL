import { model, Schema, Types } from "mongoose";
import  paginate  from 'mongoose-paginate-v2';

let collection = "carts";
let schema = new Schema(
  {
    products_id: { type: Types.ObjectId, ref: "products", required: true },
    user_id: { type: Types.ObjectId, ref: "users", required: true },
    quantity: { type: Number, required: true },
    state: {
      type: String,
      enum: ["pending", "paid", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);
schema.plugin(paginate)
let Cart = model(collection, schema);
export default Cart;
