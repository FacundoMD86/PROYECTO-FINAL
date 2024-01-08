import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let collection = "products";
//una coleccion es un espacio donde voy a almacenar un conjunto de docuemntos (en este caso: productos)
//en ingles, plural y representativo del recurso a operar
let schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: Number },
  price: { type: Number },
  stock: { type: Number },
  category: { type: String },
  url_photo: { type: String },
});

//un schema de datos configura la forma que debe tener CADA documento de mongo (nombre d ela propiedad, tipo de dato, si es unico, si es indexable )
schema.plugin(mongoosePaginate);
let Producto = model(collection, schema);
export default Producto;
