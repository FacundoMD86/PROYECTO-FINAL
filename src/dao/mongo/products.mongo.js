import Producto from "./models/products.model.js";

export default class ProductMongo {
  constructor() {}
  async createModel(data) {
    try {
      let one = await Producto.create(data);
      return {
        message: "product created!",
        response: { prod_id: one._id },
      };
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  }
  async readModels() {
    try {
      let all = await Producto.find();
      return {
        message: "products found!",
        response: { prod: all },
      };
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }   
  }
  async readOneModel(id) {
    try {
      let one = await Producto.findById(id);
    //let one = await Toy.findOne({ _id: id })
      return {
        message: "product found!",
        response: one,
      };
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  }
  async updateModel(id, data) {
    try {
      let one = await Producto.findByIdAndUpdate(id, data, { new: true });
      return {
        message: "product updated!",
        response: one,
      };
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  }
  async destroyModel(id) {
    try {
      let one = await Producto.findByIdAndDelete(id);
      return {
        message: "product destroyed!",
        response: one,
      };
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  }
}
