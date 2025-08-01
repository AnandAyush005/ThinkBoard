const mongoose  = require("mongoose");

// 1- create a schema
// 2- model based of that schema

const noteSchema = new mongoose.Schema({
  title : {
    type: String,
    required : true,
  },
  content : {
    type : String,
    required : true,
  }
}, {timestamps: true});

const Note = mongoose.model("Note", noteSchema);

module.exports =  Note;