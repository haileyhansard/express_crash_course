const express = require('express'); //STEP 1
const path = require('path'); //STEP 11
const exphbs = require('express-handlebars'); //STEP 35 first, npm i express-handlesbars
const members = require('./Members'); //STEP 17

const app = express(); //STEP 2

// Init middleware
// app.use(logger); //STEP 19

//STEP 36
// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' })); //STEP 37
app.set('view engine', 'handlebars'); //STEP 38

// Body Parser Middleware //STEP 31
app.use(express.json()); //this allows us to handle raw JSON
app.use(express.urlencoded({ extended: false })); //this allows us to handle url encoded data

//STEP 7
// Homepage Route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Member App',
    members
  })
); //STEP 42 is adding the index so that it renders the index view, then added the object that includes the title and members

//STEP 12
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//STEP 13 and 29 when we replace the url with the new route
// Members API Routes
app.use('/api/members', require('./routes/api/members')); 

const PORT = process.env.PORT || 7000; //STEP 3

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); //STEP 4

//STEP 5: npm run server (if nodemon) or 'node index' in terminal
//STEP 6: go to your browser and go to localhost:5000/

//STEP 8: install nodemon: 'npm i -D nodemon'
//STEP9: in package.json create 2 scripts: 
//  - in scripts: "start": "node index", "dev": "nodemon index"
//STEP 10: in termal, type 'npm run dev' to run nodemon watcher

