const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;


const Course = new Schema({

    name: {type: String, required: true,},
    description: {type: String},
    image: {type: String},
    vidieoId: {type: String, required: true,},
    level: {type: String},
    slug: { type: String, slug: 'name', unique: true },
    
  }, {
    timestamps: true,
  });

//add plugin  
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {

    deletedAt : true ,
    overrideMethods: 'all' 
    
});

 module.exports = mongoose.model('Course', Course); 