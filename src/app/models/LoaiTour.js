
const mongoose = require('mongoose')
// const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
// var slug = require('mongoose-slug-generator');
// mongoose.plugin(slug);

const LoaiTour = new Schema({
  MaLoaiTour: { type: String, maxLength: 100 },
  TenLoaiTour: { type: String },
  
},{
  timestamps: true
});

// LoaiTour.plugin(mongooseDelete,{ overrideMethods: 'all' });
module.exports = mongoose.model('LoaiTour', LoaiTour);
