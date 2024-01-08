import { model, Schema } from "mongoose";

let collection = "users";
let schema = new Schema(
  {
    first_name: { type: String /*, required: true*/ },
    last_name: { type: String /*, require: true*/ },
    age: { type: Number },
    mail: { type: String, unique: true, index: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "USER" },
  },
  { timestamps: true }
);
let User = model(collection, schema);
export default User;
