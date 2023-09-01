const express = require("express");
const router = express.Router();
const fetchusers = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1 : Fetching all notes : GET and Path is "/api/notes/fetchallnotes"  . Need to login/auth

router.get("/fetchallnotes", fetchusers, async (req, res) => {
    try {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Errors ");
}
});

// ROUTE 2 : Adding Notes : Post and Path is "/api/notes/"  . Need to login/auth

router.post(
  "/addnote",
  fetchusers,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", " Description must be atleast 5 charactors").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
        
    const {title , description , tag} = req.body;

    // If ther  e is errors then return bad request error , and erros
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
        title, description,tag,user : req.user.id
    })
    const savenote = await note.save();


    res.json(savenote);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Errors ");
}
});

// ROUTE 3 : Update Notes (existing) : PUT and Path is "/api/notes/addnote"  . Need to login/auth

router.put(
    "/updatenote/:id",fetchusers,async (req, res) => {

        const {title , description , tag} = req.body;
        try {
            
        
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}
        // Update notes : creating notes object
        // updste notes object : Find note by note id and update notes object
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found");}


        //  Checking if notes object exists or not exists // checking for user info about notes object
        if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed");}
        
        note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote } , {new : true})

        res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Errors ");
    }
    });  




// ROUTE 4 :Delete Notes (existing) : DELETE and Path is "/api/notes/addnote"  . Need to login/auth

router.delete(
    "/deletenote/:id",fetchusers,async (req, res) => {
        try {
            
        // Update notes : creating notes object
        // updste notes object : Find note by note id and update notes object
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found");}


        //  Checking if notes object exists or not exists // checking for user info about notes object
        if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed");}
        
        note = await Note.findByIdAndDelete(req.params.id)

        res.json({"Success": "Note has been deleted" , note:note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Errors ");
    }
    });  

module.exports = router;
