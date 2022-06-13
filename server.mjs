import express from 'express';
import { faker } from '@faker-js/faker';

// const data = [];

// const user = () => {
//     return {
//         id: faker.datatype.uuid(),
//         username: faker.internet.userName(),
//         email: faker.internet.email()
//     };
// }

const createUser = () => {
    return {
        id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email()
    };
}

const data = Array.from( { length: 10 } ).map(createUser);



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


app.set('views', './views');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs', { data });
});

app.get('/test', (req, res) => {
    res.render('test.ejs', { data });
});

app.get('/test2', (req, res) => {
    res.render('test2.ejs', { data });
});

app.post('/new-user', (req, res) => {
    const newUser = {
        id: createUser().id,
        username: req.body.username,
        email: req.body.email
    };
    data.push(newUser); 
    res.send(newUser);
})

app.listen(3001, () => {
	console.log('Server has started...');
});