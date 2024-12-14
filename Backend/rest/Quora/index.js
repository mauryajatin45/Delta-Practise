import express from 'express';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// const methodOverride = require('method-override')
import methodOverride from 'method-override';

const app = express();
const port = 3000;

// Get __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log('Server started on port ' + port);
});

let posts = [
  {
    id: uuidv4(),
    username: 'Jatin Maurya',
    content: 'Hello whatsapp',
  },
  {
    id: uuidv4(),
    username: 'nitin',
    content: 'Hello',
  },
  {
    id: uuidv4(),
    username: 'Jigar don ',
    content: 'kam cho maja ma ',
  },
];

app.get('/posts', (req, res) => {
  res.render('index.ejs', { posts });
});

app.get('/posts/new', (req, res) => {
  res.render('form.ejs');
});

app.post('/posts', (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4(); // No need to destructure from uuidv4()
  posts.push({ id, username, content });
  res.redirect('/posts');
});

app.get('/posts/:id', (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render('show.ejs', { post });
});

app.get('/posts/:id/edit', (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  if (!post) {
    return res.status(404).send("Post not found");
  }
  res.render('edit.ejs', { post });
});


app.patch('/posts/:id/resource', (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  post.content = newContent;

  res.redirect("/posts");
});

