import CartMongo from "../dao/mongo/carts.mongo.js";

export default class CartsService {
  constructor() {
    this.model = new CartMongo();
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
  readService(user_id, state) {
    try {
      let response = this.model.readModels(user_id, state);
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
