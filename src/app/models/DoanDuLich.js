
const mongoose = require('mongoose')
// const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
// var slug = require('mongoose-slug-generator');
// mongoose.plugin(slug);

const DoanDuLich = new Schema({
  MaDoan: { type: String, maxLength: 100 },
  TenDoan: { type: String },
  MaCTDoan: { type: String },
  NgayKhoiHanh: { type: Date},
  MaTour: { type: String},
  CheckFinish: { type: String},
  SoThuTuDiaDiem: { type: String},
  ChiPhi: { type: String},
},{
  timestamps: true
});

// DoanDuLich.plugin(mongooseDelete,{ overrideMethods: 'all' });
module.exports = mongoose.model('DoanDuLich', DoanDuLich);
