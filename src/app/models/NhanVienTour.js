
const mongoose = require('mongoose')
// const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
// var slug = require('mongoose-slug-generator');
// mongoose.plugin(slug);

const NhanVienTour = new Schema({
  MaDoan: { type: String, maxLength: 100 },
  MaNhanVien: { type: String },
},{
  timestamps: true
});

// NhanVienTour.plugin(mongooseDelete,{ overrideMethods: 'all' });
module.exports = mongoose.model('NhanVienTour', NhanVienTour);
