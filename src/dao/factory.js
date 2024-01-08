import args from "../config/arguments.js"; //para traerme la persistencia
import MongoConnect from "../config/Mongo.js"; //para tarerme la conexion de Mongo
import config from "../config/config.js"; //para traerme las variables de entorno

let dao = {}; 

switch (args.persistence) {
  case "MEMORY":
    console.log("memory: connected");
    const { default: ProductMemory } = await import("./memory/products.mem.js");
    const { default: CartMemory } = await import("../dao/memory/carts.mem.js");
    const { default: UserMemory } = await import("./memory/users.mem.js");
    dao = { Products: ProductMemory, Cart: CartMemory, User: UserMemory };
    break;
  case "FS":
    console.log("file system: connected");
    const { default: ProductFs } = await import("./fs/products.fs.js");
    const { default: CartFs } = await import("../dao/fs/carts.fs.js");
    const { default: UserFs } = await import("../dao/fs/users.fs.js");
    dao = { Products: ProductFs, Cart: CartFs, User: UserFs };
    break;
  default: //"MONGO"
    const mongo = new MongoConnect(config.LINK_DB);
    mongo.connect_mongo();
    const { default: ProductMongo } = await import("../dao/mongo/products.mongo.js");
    const { default: CartMongo } = await import("../dao/mongo/carts.mongo.js");
    const { default: UserMongo } = await import("../dao/mongo/users.mongo.js");
    dao = { Products: ProductMongo, Cart: CartMongo, User: UserMongo };
    break;
}

export default dao;
