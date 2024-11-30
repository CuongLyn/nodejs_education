//npm: Node package manager
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars'); // giúp dễ dàng render đến các trang của html từ server
const app = express();
const port = 3000;

const route = require('./routes');

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//File tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
// app.use(morgan('combined'))

// Template Engine
app.engine(
    'hbs',
    engine({
        //Đặt phần mở rộng cho handlebars
        extname: '.hbs',
    }),
);

          app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views')); //Cài đặt thư mục chứa các tệp templater

//Routes init
route(app);

      app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
