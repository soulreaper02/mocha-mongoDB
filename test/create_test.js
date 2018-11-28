const assert = require("assert");
const User = require("../src/user");

describe("Creating user records test", () => {
  it("Saves a user", (done) => {
    // Make assertion : check if test passes or no.
    const joe = new User({ name: "Joe" });
    joe.save().then(() => {
      // Has joe been successfully saved ? 'joe is a new model instance' mongo flags new or old
      assert(!joe.isNew);
      done(); 
    });
  });
});
