const express = require('express');
const morgan = require('morgan');
const data = require('./data/restaurant.js').RESTAURANT;

// VAR
const port = 3000;

// APP
const app = express();

// MID
app.use(morgan('tiny'));
app.use(express.static('public'));

// ROUTE
app.get('/', (req,res) => {
    res.render('home.ejs', { data });
});

app.get('/menu', (req,res) => {
    res.render('menu.ejs', { data });
});

app.get('/menu/:category', (req,res) => {
    const category = req.params.category
    console.log("CATEGORY:", category.toTitleCase());
    const filtered = data.menu.filter(item => item.category===req.params.category);
    res.render('category.ejs', { 
        data:filtered, 
        title:String(req.params.category).toTitleCase() });
})

// LISTEN
app.listen(port, ()=>console.log(`Server Running on Port ${port}. Access at [http://localhost:${port}]`));

// FUNC
String.prototype.toTitleCase = function() {
    return `${this.charAt(0).toUpperCase()}${this.substring(1).toLowerCase()}`
};
