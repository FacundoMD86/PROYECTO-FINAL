import ProductMongo from "../dao/mongo/products.mongo.js";

export default class ProductsService {
  constructor() {
    this.model = new ProductMongo();
  }
  createService(data) {
    try {
      let response = this.model.createModel(data);
      return response;
    } catch (error) {
      error.where = "service";
      return next(error);
    }
  }
  readService() {
    try {
      let response = this.model.readModels();
      return response;
    } catch (error) {
      error.where = "service";
      return next(error);
    }
  }
  readOneService(id) {
    try {
      let response = this.model.readOneModel(id);
      return response;
    } catch (error) {
      error.where = "service";
      return next(error);
    }
  }
  updateService(id, data) {
    try {
      let response = this.model.updateModel(id, data);
      return response;
    } catch (error) {
      error.where = "service";
      return next(error);
    }
  }
  destroyService(id) {
    try {
      let response = this.model.destroyModel(id);
      return response;
    } catch (error) {
      error.where = "service";
      return next(error);
    }
  }
}
