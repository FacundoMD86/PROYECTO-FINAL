import MyRouter from "../routes/router.js";
import CartsController from "../controllers/carts.controller.js";
import passport from "passport";

const cartsController = new CartsController();

export default class CartsRouter extends MyRouter {
  init() {
    this.create("/", passport.authenticate("jwt"), async (req, res, next) => {
      try {
        let user = req.user;
        let data = req.body;
        data.user_id = user._id;
        let response = await cartsController.createController(data);
        return res.sendSuccessCreate(response);
      } catch (error) {
        next(error);
      }
    });
    this.read("/",["PUBLIC"], passport.authenticate("jwt"), async (req, res, next) => {
      try {
        let user_id = req.user._id;
        let state = "pending"; 
        if (req.query.state) {
          state = req.query.state;
        }
        let response = await cartsController.readController(user_id, state);
        if (response) {
          return res.sendSuccess(response);
        } else {
          return res.sendNotFound();
        }
      } catch (error) {
        next(error);
      }
    }); 
    this.update("/:id", ["PUBLIC"], async (req, res, next) => {
      try {
        let { id } = req.params;
        let data = req.body;
        let response = await controller.update(id, data);
        if (response) {
          return res.sendSuccess(response);
        } else {
          return res.sendNotFound("carts");
        }
      } catch (error) {
        next(error);
      }
    });
    this.destroy("/:id", ["PUBLIC"], async (req, res, next) => {
      try {
        let { id } = req.params;
        let response = await controller.destroy(id);
        if (response) {
          return res.sendSuccess(response);
        } else {
          return res.sendNotFound("carts");
        }
      } catch (error) {
        next(error);
      }
    });
    this.create("/ticket", ["PUBLIC"], async (req, res, next) => {
      try {
        let user_id = req.user._id;
        let response = await controller.destroyAll(user_id);
        if (response) {
          return res.sendSuccess(response);
        } else {
          return res.sendNotFound("carts");
        }
      } catch (error) {
        next(error);
      }
    });
    this.read("/all", ["PUBLIC"], async (req, res, next) => {
      try {
        //let page = req.query.page || 1;
        let response = await controller.readAll();
        if (response) {
          return res.sendSuccess(response);
        } else {
          return res.sendNotFound("carts");
        }
      } catch (error) {
        next(error);
      }
    });
    this.read("/gains", ["PUBLIC"], async (req, res, next) => {
      try {
        let user_id = req.user._id; 
        let response = await controller.getGain(user_id);
        if (response) {
          return res.sendSuccess(response);
        } else {
          return res.sendNotFound("carts");
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
}

