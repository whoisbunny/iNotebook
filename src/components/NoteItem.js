import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';


const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const{deleteNote} = context;
  
   const { note , updatenotes}= props;
  return (
    <div className='col-md-3'>
      
      
      <div className="card my-3 " >
  
  <div className="card-body ">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text"> {note.description}</p>
    <i className="far  fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id); props.showalert("Deleted Successfully", "success")}}></i>
    <i className="far  fa-edit mx-2" onClick={()=>{updatenotes(note)}}></i>
  </div>
</div>

    </div>
  )
}

export default NoteItem
