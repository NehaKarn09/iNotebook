const express=require('express');
const router=express.Router();
const fetchuser=require ('../middleware/fetchuser');
const Note = require ('../models/Note')
const { body, validationResult } = require('express-validator');


//Route 1:get all the notes of loggedin user using:GET "/api/notes/fetchallnotes": Login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const notes=await Note.find({user:req.user.id});
        res.json(notes); 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})


//Route 2:Add a new Note using:POST "/api/notes/addnote": Login required
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({ min: 3 }),
    body('description','Description must be atleast 5 characters').isLength({ min: 5 }),
],async (req,res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {title,description,tag} = req.body;
    const note=new Note({
        title,description,tag,user:req.user.id
    })
    const savedNote= await note.save();
    res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

//Route 3:Update an existing Note using:PUT "/api/notes/updatenote": Login required
router.put('/updatenote/:id',fetchuser,async (req,res)=>{

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    try {
         const {title,description,tag} =req.body;
         const newnote={};
         if(title){newnote.title=title};
         if(description){newnote.description=description};
         if(tag){newnote.tag=tag};

         //Find the note to be updated and update it
         let note=await Note.findById(req.params.id);
         if(!note){
            return res.status(404).send("Not Found");
         }

         //Find the user of the note requested to be updated
         if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
         }

         note=await Note.findByIdAndUpdate(req.params.id,{$set: newnote},{new:true});
         res.json({note})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})



//Route 4:Delete an existing Note using:DELETE "/api/notes/deletenote": Login required
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    try {

         //Find the note to be deleted by its ID
         let note=await Note.findById(req.params.id);
         if(!note){
            return res.status(404).send("Not Found");
         }

         //Find the user of the note requested to be updated
         if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
         }

         note=await Note.findByIdAndDelete(req.params.id);
         res.json({"Success":"Note has been deleted", note:note});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

module.exports=router;