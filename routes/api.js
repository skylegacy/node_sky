var express = require('express');
var router = express.Router();

const { User, Blog, Tag } = require('../sequelize');
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express' });
//   });


router.get('/users', (req, res) => {
    User.findAll().then(users => res.json(users))
  })

  router.post('/users', (req, res) => {
    User.create(req.body)
        .then(user => res.json(user))
  })

 


  router.post('/blogs', (req, res) => {

    const body = req.body
    // either find a tag with name or create a new one 尋找 tag 創造新的tag
    // const tags = body.tags.map(tag => Tag.findOrCreate({ where: { name: tag.name }, defaults: { name: tag.name }}) .spread((tag, created) => tag))
                                         
    // User.findById(body.userId)
//     User.Promise()
//         .then(() => Blog.create(body))
//         .then(blog => Promise.all(tags).then(storedTags => blog.addTags(storedTags)).then(() => blog))
//         .then(blog => Blog.findOne({ where: {id: blog.id}, include: [User, Tag]}))
//         .then(blogWithAssociations => res.json(blogWithAssociations))
//         .catch(err => res.status(400).json({ err: `User with id = [${body.userId}] doesn\'t exist.`}))
        Blog.create(body).then(blog => res.json(blog))
 })


 // find blogs belonging to one user or all blogs
 router.get('/blogs/:userId?', (req, res) => {
  let query;
  if(req.params.userId) {
      query = Blog.findAll({ include: [
          { model: User, where: { id: req.params.userId } },
          { model: Tag }
      ]})
  } else {
      query = Blog.findAll({ include: [Tag, User]})
  }
  return query.then(blogs => res.json(blogs))
})


// find blogs by tag
router.get('/blogs/:tag/tag', (req, res) => {
  Blog.findAll({
      include: [
          { model: Tag, where: { name: req.params.tag } }
      ]
  })
  .then(blogs => res.json(blogs))
})

module.exports = router;