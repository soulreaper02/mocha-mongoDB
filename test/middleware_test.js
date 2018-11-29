const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe('Middleware', () => {
  let joe, blogPost
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is great', content: 'Who writes mocha tests'});
  
    joe.blogPosts.push(blogPost);
    //promise.all combine all promises
    Promise.all([joe.save(), blogPost.save()])
    .then(() => done());
  });

  it('Users clean up dangling blogpost on delete', (done) => {
    joe.remove()
    .then(() => BlogPost.count())
    .then((count) => {
      assert(count === 0);
      done();
    });
  });

})