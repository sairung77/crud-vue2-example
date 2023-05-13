const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

mongoose.connect('mongodb://localhost/db1',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(r => console.log('connection OK'))
.catch(err => console.log(err));
let productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    detail: String,
    date_added: Date
});
productSchema.plugin(paginate);
module.exports = mongoose.model('Product', productSchema);
