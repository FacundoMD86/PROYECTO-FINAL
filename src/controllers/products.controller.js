import ProductsService from "../services/products.services.js";

export default class ProductsController {
  constructor() {
    this.service = new ProductsService();
  }
  createController(data) {
    try {
      let response = this.service.createService(data);
      return response;
    } catch (error) {
      error.where = "controller";
      return next(error);
    }
  }
  readController() {
    try {
      let response = this.service.readService();
      return response;
    } catch (error) {
      error.where = "controller";
      return next(error);
    }
  }
  readOneController(id) {
    try {
      let response = this.service.readOneService(id);
      return response;
    } catch (error) {
      error.where = "controller";
      return next(error);
    }
  }
  updateController(id, data) {
    try {
      let response = this.service.readOneService(id, data);
      return response;
    } catch (error) {
      error.where = "controller";
      return next(error);
    }
  }
  destroyController(id) {
    try {
      let response = this.service.destroyService(id);
      return response;
    } catch (error) {
      error.where = "controller";
      return next(error);
    }
  }
}
