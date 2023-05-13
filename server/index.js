const express = require('express');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use((reg, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
})


let Product = require('./model');


app.post('/api/db/create', async (request, response) => {
    try {
        const form = request.body;
        const data = {
            name: form.name || '',
            price: form.price || 0,
            detail: form.detail || '',
            date_added: new Date(Date.parse(form.date_added)) || new Date()
        };
        await Product.create(data);
        response.send(true);
    } catch (error) {
        console.log(error);
        response.send(false);
    }
});

app.get('/api/db/read', async (request, response) => {
    try {
        const docs = await Product.find().exec();
        response.json(docs);
    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
});

app.post('/api/db/update', (request, response) => {

    const form = request.body;
    let data = {
        name: form.name || '',
        price: form.price || 0,
        detail: form.detail || '',
        date_added: new Date(Date.parse(form.date_added)) || new Date()
    }

    Product
    .findByIdAndUpdate(form._id, data, { useFindAndModify: false })
    .then(() => {
        response.json({});
    })
    .catch(err => {
        response.json({ error: err });
    });
})

app.post('/api/db/delete', (request, response) => {
    let _id = request.body._id;
    Product
        .findByIdAndDelete(_id, { useFindAndModify: false })
        .then(() => {
            response.json({});
        })
        .catch((err) => {
            response.json({ error: err });
        });
});


app.get('/api/db/paginate', (request, response) => {
    let options = {
        page: request.query.page || 1,
        limit: 2
    }
    Product.paginate({}, options, (err, result) => {
        response.json(result)
    })
})

app.get('/api/db/search', (request, response) => {
    let q = request.query.q || '';
    let pattern = new RegExp(q, 'ig');
    let conditions = {
        $or: [
            { name: { $regex: pattern } },
            { detail: { $regex: pattern } }
        ]
    }
    let options = {
        page: request.query.page || 1,
        limit: 2
    }

    Product.paginate(conditions, options, (err, result) => {
        response.json(result)
    })
})
app.listen(port, () => console.log('server listening on port ' + port))