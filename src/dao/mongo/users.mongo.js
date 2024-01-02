import User from "./models/user.model.js";
import UserResponseDTO from "../../dto/users.response.dto.js";

export default class AuthMongo {
  constructor() {}
  async register(data) {
    try {
      let one = await User.create(data);
      one = UserResponseDTO.getUserDbFrom(one);
      return {
        message: "user registered!",
        response: "user_id: " + one._id,
      };
    } catch (error) {
      error.where = "persistence";
      return next(error);
    }
  }
  async login(user) {
    return {
      message: "user logged in",
      response: true,
    };
  }
  signout() {
    return {
      message: "user signed out!",
      response: true,
    };
  }
  async read() {
    let all = await User.find({}, "-password");
    if (all.length > 0) {
      return {
        message: "users found!",
        response: { users: all },
      };
    } else {
      return null;
    }
  }
  async readOne(mail) {
    let one = await User.findOne({ mail });
    if (one) {
      return {
        message: "user found!",
        response: one,
      };
    } else {
      return {
        message: "user not found or error occurred",
        response: null,
      };
    }
  }
  async readById(id) {
    let one = await User.findById(id);
    if (one) {
      return {
        message: "user found!",
        response: one,
      };
    } else {
      return null;
    }
  }
  async updateOne(mail, data) {
    let one = await User.findOneAndUpdate({ mail }, data, { new: true });
    if (one) {
      return {
        message: "user updated!",
        response: one,
      };
    } else {
      return null;
    }
  }
  async destroyOne(mail) {
    let one = await User.findOneAndDelete({ mail });
    if (one) {
      return {
        message: "user destroyed!",
        response: one,
      };
    } else {
      return null;
    }
  }
}
