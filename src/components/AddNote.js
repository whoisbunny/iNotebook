import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {

    
    const context = useContext(NoteContext);
    const{ addNote} = context;
    const [note , setNote] = useState({title:"", description : "", tag : ""})
    const handleClick = (e) => {
            e.preventDefault();
            addNote(note.title , note.description , note.tag);
            setNote({title:"", description : "", tag : ""});
            props.showalert("Note Added Successfully" , "success")

    }
    const onChange = (e) => {
        setNote({...note,[e.target.name]: e.target.value})
    }


  return (
          <div className="container my-3">
      <h2 className=" my-3">Add a note</h2>

      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" value={note.title}name="title"aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="desc" className="form-label">Descriptions</label>
    <input type="text" className="form-control" id="description" value={note.description}name="description" onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" value={note.tag}name="tag" onChange={onChange} minLength={5} required/>
  </div>
  
  <button type="submit"  disabled={note.title.length < 5 || note.description.length<5}className="btn btn-primary" onClick={handleClick}>Submit</button>
</form>
</div> 
  )
}

export default AddNote