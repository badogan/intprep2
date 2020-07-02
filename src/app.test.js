const app = require("./app");

describe(".testing bringFirstNPosts:", () => {
  test(" ASYNC testing bringFirstNPosts w/ N=5 - valid number", () => {
    return app.bringFirstNPosts(5).then(data => expect(data.length).toBe(5));
  });
  test(" ASYNC testing bringFirstNPosts w/ N='A' - invalid input", () => {
    return app.bringFirstNPosts('A').then(data => expect(data.length).toBe(0));
  });
  test(" ASYNC testing bringFirstNPosts w/o any input - first 10 expected by default", () => {
    return app.bringFirstNPosts().then(data => expect(data.length).toBe(10));
  });
  test(" ASYNC - bringFirstNPosts - returns posts array - with expected key userId", () => {
    return app.bringFirstNPosts(1).then(data => expect(data[0]).toHaveProperty("userId"));
  });
  test(" ASYNC - bringFirstNPosts - returns posts array - with expected key id", () => {
    return app.bringFirstNPosts(1).then(data => expect(data[0]).toHaveProperty("id"));
  });
  test(" ASYNC - bringFirstNPosts - returns posts array - with expected key title", () => {
    return app.bringFirstNPosts(1).then(data => expect(data[0]).toHaveProperty("title"));
  });
  test(" ASYNC - bringFirstNPosts - returns posts array - with expected key body", () => {
    return app.bringFirstNPosts(1).then(data => expect(data[0]).toHaveProperty("body"));
  });
});

describe(".testing testBooleanFunction:", () => {
  test("testing funnyFunction with expected false is working", () => {
    expect(app.testBooleanFunction(11)).toBe(false);
  });

  test("testing testBooleanFunction with expected true is working", () => {
    expect(app.testBooleanFunction(10)).toBe(true);
  });
});

describe(".testing testTypeFunction function:", () => {
  test("testing testTypeFunction is working for string - string expected", () => {
    expect(app.testTypeFunction("string")).toBe("string");
  });
  test("testing testTypeFunction is working for number - number expected", () => {
    expect(app.testTypeFunction(2)).toBe("number");
  });
  test("testing testTypeFunction is working for array - object expected", () => {
    expect(app.testTypeFunction([1, 2, 3])).toBe("object");
  });
  test("testing testTypeFunction is working for array - object expected", () => {
    expect(app.testTypeFunction({ a: "b", c: "d" })).toBe("object");
  });
});
