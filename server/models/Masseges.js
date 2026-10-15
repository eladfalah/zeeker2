const mongoose = require('mongoose');

const massegesSchema = new mongoose.Schema({
firebaseUID: {
type: String,
required:true
},
userMasseges:[{
title: String,
text: String,
date: Date
}],

})
module.exports = mongoose.model('Masseges', massegesSchema);
