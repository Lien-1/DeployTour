
const mongoose = require('mongoose')
// const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
// var slug = require('mongoose-slug-generator');
// mongoose.plugin(slug);

const NhanVien = new Schema({
  MaNhanVien: { type: String, maxLength: 100 },
  TenNhanVien: { type: String },
  SDTNhanVien: { type: String },
  ActiveTour: { type: Date},
  ChucVu: { type: String},
},{
  timestamps: true
});

// NhanVien.plugin(mongooseDelete,{ overrideMethods: 'all' });
module.exports = mongoose.model('NhanVien', NhanVien);
