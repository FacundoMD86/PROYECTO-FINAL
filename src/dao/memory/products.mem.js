export default class Product {
  static products = [];
  init() {}
  async createModel(data) {
    Product.products.push(data);
    return {
      message: "product created!",
      response: data._id,
    };
  }
  readModels() {
    let all = Product.products;
    if (Product.products.length > 0) {
      return {
        message: "products found!",
        response: all,
      };
    } else {
      return null;
    }
  }
  readOneModel(id) {
    let one = Product.products.find((each) => each._id === id);
    if (one) {
      return {
        message: "product found!",
        response: one,
      };
    } else {
      return null;
    }
  }
  async updateModel(id, data) {
    try {
      let one = Product.products.find((each) => each._id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        return {
          message: "product updated!",
          response: one,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async destroyModel(id) {
    try {
      let one = Product.products.find((each) => each._id === id);
      if (one) {
        Product.products = Product.products.filter((each) => each._id !== id);
        return {
          message: "product destroyed!",
          response: one,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
