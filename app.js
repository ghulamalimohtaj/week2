var express = require('express');
var path = require('path');
var methodOverride = require('method-override');
//install body parser to access request fields
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var db = require('./mongoosedb.js');
var Post = require('./models/post.js')

var app = express();
/* A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. */
app.set('view engine', 'pug');
app.use(methodOverride('_method'));// to be able to make PUT AND DELETE requests
app.set("views", path.join(__dirname, "views"));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(urlencodedParser);
app.use(bodyParser.json());

//all blogs
app.get('/', function(req, res){//0728501000
  Post.find((err, posts)=>{
    if(err){
      console.log('Error getting post');
    }
    console.log(posts);
    //return index page
    res.render('index', {
      posts: posts
    })
  })
});

//find a specific post
app.get('/post/:id', function(req,res) {
  Post.findById(req.params.id,function(err,post) {
    res.render('show',
    {post:post})
  })
});

// route for adding posts
app.get('/post/create', function(req,res) {
  res.render('add');
});

app.get('/about', function(req, res){
  res.render('about')
});

app.get('/contact', function(req, res){
  res.render('contact')
});






app.listen(8888);