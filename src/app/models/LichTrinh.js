
const mongoose = require('mongoose')
// const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
// var slug = require('mongoose-slug-generator');
// mongoose.plugin(slug);

const LichTrinh = new Schema({
  MaTour: { type: String, maxLength: 100 },
  NgayGio: { type: String },
  NoiDung: { type: String },
  SoThuTuDiaDiem: { type: String},
},{
  timestamps: true
});

// LichTrinh.plugin(mongooseDelete,{ overrideMethods: 'all' });
module.exports = mongoose.model('LichTrinh', LichTrinh);
