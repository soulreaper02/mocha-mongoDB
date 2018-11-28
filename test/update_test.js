const assert = require("assert");
const User = require("../src/user");

describe("Updating a user", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "Joe", likes: 0 });
    joe.save().then(() => done());
  });

  it("instance type using set n save", done => {
    joe.set("name", "Alex");
    joe
      .save()
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  });

  it("A model class can update", done => {
    User.update({ name: "Joe" }, { name: 'Alex' })
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  });

  it("A model class instance can update one record", done => {
    User.findOneAndUpdate({ name: "Joe" }, {name: 'Alex'})
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  });

  it("A model class instance can find record with id and update", done => {
    User.findByIdAndUpdate(joe._id, { name: "Alex" })
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  });

  it('User post conunt incremented by 1', done => {
    User.update({name: 'Joe'}, { $inc: { likes: 1} })
    .then(() => User.findOne({name: 'Joe'}))
    .then(user => {
      assert(user.likes === 1);
      done();
    })
  })


});
