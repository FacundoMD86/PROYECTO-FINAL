import { expect } from "chai"
import dao from "../../src/dao/factory.js"
const { Products } = dao


describe("Testing Products", () => {
  const model = new Products();
  const data = { title: "Tee normal 20mm", description: "fusion" };
  let id1 = null
  let id2 = null
  it("CREATE - Must return an object",async()=>{
    let response = await model.createModel(data)
    //id1 = response._id
    console.log(response);
    expect(response).to.be.an("object")
  })
  it("CREATE - Must return an object with an _id property", async () => {
    let response = await model.createModel(data);
    //id2 = response._id;
    console.log(response);
    //expect(response._id).to.be.ok
    expect(response).to.have.property("_id");
  });
  it("ONE - Must required an id (string)", async () => {
    expect(id1).to.be.an.instanceOf(Types.ObjectId);
  });
  it("READ - Must response with an array", async () => {
    let response = await model.readModels(skip, limit);
    expect(Array.isArray(response)).to.be.equals(true);
  });
  it("UPDATE - Must return an object", async () => {
    let response = await model.updateModel(id1, { name: "roro" });
    expect(response).to.be.an("object");
  });
  it("UPDATE - Must return a different object", async () => {
    let before = await model.readOneModel(id2);
    let after = await model.updateModel(id2, { title: "codo" });
    expect(before === after).to.be.equals(false);
  });
  it("DESTROY - Must response with an object", async () => {
    let response = await model.destroyModel(id1);
    expect(response).to.be.an("object");
  });
  it("DESTROY - Must verify that the object was deleted", async () => {
    await model.destroyModel(id2);
    let found = await model.readOneModel(id2);
    //console.log(found);
    expect(found).not.to.be.ok;
  });
});
