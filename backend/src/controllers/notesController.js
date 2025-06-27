const { response } = require("express");
const Note = require("../models/Note")

const getAllNotes = async (req,res)=>{
  try{
    const notes = await Note.find();
    res.status(200).json(notes);
  }catch(err){
    console.error("Error in getAllNotes controller", error);

    res.status(500).json({message:"Internal server error"});
  }
};

async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found!" });
    res.json(note);
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const postANotes =  async (req,res)=>{
  try{
    
    const {title, content} = req.body;
    const newNote = new Note({title,content});
    await newNote.save();
    res.status(201).json({message : "Note created successfully"})

  }catch(err){

    console.error("Error in postAnote controller : ", err);
    res.status(500).json({message: "Internal server error"});

  }
};

const updateAnote = async (req,res)=>{
  try{
    const {title,content} = req.body;
    const updatedNode = await Note.findByIdAndUpdate(req.params.id, {title,content},{new:true});
    if(!updatedNode) res.status(404).json({message : "Note not found"});

    res.status(200).json(updatedNode);
  }catch(err){
    console.error("Error in updateAnote controller : ", err);
    res.status(500).json({message: "Internal server error"});
  }
};

const deleteAnote = async (req, res)=>{
  try{

    const deleteNode = await Note.findByIdAndDelete(req.params.id);

    if(!deleteNode) res.status(404).json({message : "Note not found"});
    res.status(200).json({message : 'note deleted succesfully'});

    

  }catch(err){

    console.error("Error in deleteAnote controller : ", err);
    res.status(500).json({message: "Internal server error"});

  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  postANotes,
  updateAnote,
  deleteAnote
}