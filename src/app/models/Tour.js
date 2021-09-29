
const mongoose = require('mongoose')
// const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
// var slug = require('mongoose-slug-generator');
// mongoose.plugin(slug);

const Tour = new Schema({
    MaTour: { type: String },
    TenTour: { type: String },
    ThoiGianTour: { type: String },
    AnhDaiDien: { type: String },
    MoTa: { type: String },
}, {
    timestamps: true
});

// Tour.plugin(mongooseDelete,{ overrideMethods: 'all' });
module.exports = mongoose.model('Tour', Tour);
