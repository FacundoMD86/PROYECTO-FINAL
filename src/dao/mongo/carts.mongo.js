import { Types } from "mongoose";
import Cart from "./models/carts.model.js";

export default class CartMongo {
  constructor() {}
  async createModel(data) {
    try {
      let one = await Cart.create(data);
      return {
        message: "cart created!",
        response: { store_id: one._id },
      };
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  }
  async readModels(user_id, state) {
    try {
      let all = await Cart.find(user_id, state);
      if (all.length > 0) {
        let ticket = await Cart.aggregate([
          { $match: { user_id } },
          { $set: { subtotal: { $multiply: ["$price", "$quantity"] } } },
          { $group: { _id: "$user_id", total: { $sum: "$subtotal" } } },
          {
            $project: {
              _id: 0,
              user_id: "$_id",
              total: "$total",
              date: new Date(),
            },
          },
        ]);
        return {
          message: "products found!",
          response: { products: all },
          ticket,
        };
      } else {
        return null;
      }
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  }
  async readOneModel(id) {
    try {
      let one = await Cart.findById(id);
      //let one = await Toy.findOne({ _id: id })
      return {
        message: "cart found!",
        response: one,
      };
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  }
  async updateModel(id, data) {
    try {
      let one = await Cart.findByIdAndUpdate(id, data, { new: true });
      return {
        message: "cart updated!",
        response: one,
      };
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  }
  async destroyModel(id) {
    try {
      let one = await Cart.findByIdAndDelete(id);
      return {
        message: "cart destroyed!",
        response: one,
      };
    } catch (error) {
      error.where = "mongo";
      return next(error);
    }
  }
  async destroyAll(user_id) {
    let all = await Cart.find(
      { user_id },
      "-createdAt -updatedAt -__v -user_id -_id"
    ).sort({ type: 1 });
    if (all.length > 0) {
      await Cart.aggregate([
        { $match: { user_id } },
        { $set: { subtotal: { $multiply: ["$price", "$quantity"] } } },
        { $group: { _id: "$user_id", total: { $sum: "$subtotal" } } },
        { $set: { orders: all } },
        {
          $project: {
            _id: 0,
            user_id: "$_id",
            total: "$total",
            date: new Date(),
          },
        },
        { $merge: { into: "tickets" } },
      ]);
      await Order.deleteMany({ user_id });
      return {
        message: "carts destroyed",
        response: null,
      };
    } else {
      return null;
    }
  }
  async getGain(user_id) {
    let carts = await Cart.find({ user_id }, "type size quantity price -_id");
    let gain = await Cart.aggregate([
      { $match: { user_id: new Types.ObjectId(user_id) } },
      { $set: { subtotal: { $multiply: ["$price", "$quantity"] } } },
      { $group: { _id: "$user_id", total: { $sum: "$subtotal" } } },
      {
        $project: {
          _id: 0,
          user_id: "$_id",
          total: "$total",
          date: new Date(),
          carts,
        },
      },
      { $merge: { into: "gains" } },
    ]);
    return {
      response: gain,
      message: "get gain",
    };
  }
}
