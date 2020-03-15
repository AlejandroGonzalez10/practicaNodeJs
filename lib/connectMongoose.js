'use strict';

const mongoose = require('mongoose');
const connection = mongoose.connection;

connection.on('error', function(err){
    console.log(err);
});

connection.once('open', function(){
    console.log('Connected to mongodb.');
});

mongoose.connect('mongodb://localhost:27017/practicaNode');