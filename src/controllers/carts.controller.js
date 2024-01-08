import CartsService from "../services/carts.services.js";

export default class CartsController {
  constructor() {
    this.service = new CartsService();
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
  readController(user_id, state) {
    try {
      let response = this.service.readService(user_id, state);
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
  destroycontroller(id) {
    try {
      let response = this.service.destroyService(id);
      return response;
    } catch (error) {
      error.where = "controller";
      return next(error);
    }
  }
}
