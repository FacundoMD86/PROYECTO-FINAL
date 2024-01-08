import MyRouter from "../routes/router.js";
import ProductsController from "../controllers/products.controller.js";
import passport from "passport";

const productsController = new ProductsController();

export default class ProductsRouter extends MyRouter {
  init() {
    this.create("/", async (req, res, next) => {
      try {
        let data = req.body;
        let response = await productsController.createController(data);
        return res.sendSuccessCreate(response);
      } catch (error) {
        error.where = "router"
        return next(error);
      }
    });
    this.read("/", passport.authenticate("jwt"), async (req, res, next) => {
      try {
        let response = await productsController.readController();
        if (response) {
          return res.sendSuccess(response);
        } else {
          return res.sendNotFound();
        }
      } catch (error) {
        error.where = "router"
        return next(error);
      }
    });
    this.read("/:id", async (req, res, next) => {
      try {
        let { id } = req.params
        let response = await productsController.readOneController(id);
        if (response) {
          return res.sendSuccess(response);
        } else {
          return res.sendNotFound();
        }
      } catch (error) {
        error.where = "router"
        return next(error);
      }
    });
    this.update("/:id", async (req, res, next) => {
      try {
        let { id } = req.params;
        let data = req.body;
        let response = await productsController.updateController(id, data);
        if (response) {
          return res.sendSuccess(response);
        } else {
          return res.sendNotFound();
        }
      } catch (error) {
        error.where = "router";
        return next(error);
      }
    });

    this.destroy("/:id", async (req, res, next) => {
      try {
        let { id } = req.params;
        let response = await productsController.destroyController(id);
        if (response) {
          return res.sendSuccess(response);
        } else {
          return res.sendNotFound();
        }
      } catch (error) {
        error.where = "router";
        return next(error);
      }
    });
  }
}


