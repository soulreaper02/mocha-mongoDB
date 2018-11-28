const assert = require("assert");
const User = require("../src/user");

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({ 
      name: 'Joe', 
      posts:[{ title: 'Post title'}]
    });

    joe.save()
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      assert(user.posts[0].title === 'Post title');
      done();
    })
  });

  it('Can add subdocuments to an existing record', done => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });

    joe.save()
    .then(() => User.findOne({ name: 'Joe'}))
    .then((user) => {
      user.posts.push({ title: 'New Post' });
      return user.save() // when you use the => without the {} it implicitly calls return.
      // But here we are inside the {} so in order to return the promise we have to explicitly call retun.
    })
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      assert(user.posts[0].title === 'New Post');
      done();
    });
  });

  it('Can remove an existing subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New title' }]
    });
    joe.save()
    .then(() => User.findOne({ name: 'Joe' }))
    .then(user => {
      const post = user.posts[0];
      post.remove(); //remove is injected by mongoose.
      return user.save();
    })
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      assert(user.posts.length === 0);
      done();
    })
  })
})