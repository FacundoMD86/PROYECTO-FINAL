import assert from "assert";
import dao from "../../src/dao/factory.js";
const { Products } = dao;

describe("Testing Products", () => {
  const model = new Products();
  const data = { title: "Tee normal 20mm", description: "fusion" };
  let id = "656a782bd40914c0138fc104";
  it("CREATE - Must required title property", async () => {
    assert.ok(data.title);
  });
  it("CREATE - Must required description property", async () => {
    assert.ok(data.description);
  });
  it("CREATE - Title is a string", () => {
    assert.strictEqual(typeof data.title, "string");
  });
  it("CREATE - Description is a string", () => {
    assert.strictEqual(typeof data.description, "string");
  });
  /*it("READ - Skip & Limit are number", () => {
    assert.strictEqual(typeof skip, "number");
    assert.strictEqual(typeof limit, "number");
  });*/
  it("READ - Must response with an array", async () => {
    let response = await model.readModels();
    console.log(response);
    assert.strictEqual(Array.isArray(response), true);
    return Promise.resolve();
  });
  it("UPDATE - Id is a string", () => {
    assert.strictEqual(typeof id, "string");
  });
  it("UPDATE - Must response with an object", async () => {
    let response = await model.updateModel(id, { description: "fusion" });
    console.log(response);
    assert.strictEqual(typeof response, "object");
  });                                                                                                 
  //it("", () => {});
  //it("", () => {});
});
