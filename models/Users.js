'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    cedula: String,
    nombre: String,
    apellidos: String,
    edad: Number,
    password: String
});

userSchema.statics.list = function(cb){
    User.find().exec(cb);
};

userSchema.statics.listOne = function(params, cb){
    User.findOne(params).exec(cb);
};

const User = mongoose.model('User', userSchema);