import fs from "fs";

export default class Product {
  constructor() {
    this.products = [];
    this.path = "./src/dao/fs/files/Productos.json";
    this.init();
  }
  init() {
    let file = fs.existsSync(this.path);
    if (!file) {
      fs.writeFileSync(this.path, "[]");
    } else {
      this.products = JSON.parse(fs.readFileSync(this.path, "UTF-8"));
    }
    return true;
  }
  async createModel(data) {
    //data debe venir con _id en este caso
    //console.log(data);
    this.products.push(data);
    let data_json = JSON.stringify(this.products, null, 2);
    await fs.promises.writeFile(this.path, data_json);
    return {
      message: "product created!",
      response: data._id,
    };
  }
  readModels() {
    let all = this.products;
    if (this.products.length > 0) {
      return {
        message: "products found!",
        response: all,
      };
    } else {
      return null;
    }
  }
  readOneModel(id) {
    let one = this.products.find((each) => each._id == id);
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
      let one = this.products.find((each) => each._id == id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        let data_json = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, data_json);
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
      let one = this.products.find((each) => each._id == id);
      if (one) {
        this.toys = this.products.filter((each) => each._id !== id);
        let data_json = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, data_json);
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
