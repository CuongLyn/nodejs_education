//npm: Node package manager
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars'); // giúp dễ dàng render đến các trang của html từ server
const app = express();
const port = 3000;


const SortMiddleware = require('./app/middlewares/SortMiddleware');

const route = require('./routes');
const db = require('./config/db');
//Connect to db
db.connect();


app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'))

//Custom middleware
app.use(SortMiddleware);

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
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {

                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'fa-solid fa-sort',
                    asc: 'fa-solid fa-arrow-down-short-wide',
                    desc: 'fa-solid fa-arrow-down-wide-short',
                }

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                }


                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                    <i class="${icon}"></i>
                  </a>`

            }
        }
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); //Cài đặt thư mục chứa các tệp templater

//Routes init
route(app);

      app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
