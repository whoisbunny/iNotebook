import React, { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props)=>{

    const host = 'http://127.0.0.1:5000';

    const noteInitionals =[]

    const [notes , setNotes] = useState(noteInitionals);
    
    // Get all the notes
    const getnote =async( )=>{
            //api call
            const respone = await fetch(`${host}/api/notes/fetchallnotes`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
            })
            const json = await respone.json() 
            setNotes(json);

    
      }
    
        
    
    
    // Add the notes
  const addNote =async(title ,description , tag )=>{
        //api call
        const respone = await fetch(`${host}/api/notes/addnote`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token'),
            },
            body: JSON.stringify({title,description,tag})
        })
        const note = await respone.json() ;
        setNotes(notes.concat(note))


    
  }



  // Delete the notes
  const deleteNote = async(id)=>{

        //api call

        const respone = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token'),
            },
            
        })
        const json = respone.json() ;
        // console.log(json);

    // console.log("delting" + id);
    const newNote = notes.filter((note)=>{
        return note._id !== id;
    })
    setNotes(newNote);



  }
  

  // Edit the notes
  const editNote =async(id, title , description , tag)=>{
    //api call

    const respone = await fetch(`${host}/api/notes/updatenote/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token'),
        },
        body: JSON.stringify({title ,description ,tag})
    })
    const json =await respone.json() ;
    // console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes)) ;
    for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id) {    
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
        }
    }
    setNotes(newNotes);
  }

  return(

    <NoteContext.Provider value={{notes  , addNote ,deleteNote, editNote , getnote  }} >
        {props.children}
    </NoteContext.Provider >
    )
}

export default NoteState;