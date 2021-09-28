const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://bibi030301:bibi030301@cluster0.hcxyl.mongodb.net/Tour-Du-Lich');
        console.warn('success')

    } catch (error) {
        console.error('fail')
    }
}
module.exports = { connect }
