import NoteContext from './noteContext';
import {useState,useEffect} from 'react';


const NoteState=(props)=>{

    const host="http://localhost:5000";

    const notesInitial=[];
    const [notes,setNotes] = useState(notesInitial);



      //Get all notes
  //     const getNotes=async ()=>{

  //       //API CALL
  //       const response = await fetch(`${host}/api/notes/fetchallnotes`, {
  //         method: "GET", 
  //         headers: {
  //           "Content-Type": "application/json",
  //           "auth-token":localStorage.getItem('token')
  //         }
  //       });
  //       const note=await response.json();
  //       console.log(note);
  //       setNotes(note);
  // }


  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error(errorResponse.error);
        setNotes([]);
        return;
      }

      const fetchedNotes = await response.json();
      setNotes(Array.isArray(fetchedNotes) ? fetchedNotes : []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setNotes([]);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);



      // //Add a note
      // const addNote =async (title,description,tag)=>{

      //       //API CALL
      //       const response = await fetch(`${host}/api/notes/addnote`, {
      //         method: "POST", 
      //         headers: {
      //           "Content-Type": "application/json",
      //           "auth-token":localStorage.getItem('token')
      //         },
      //         body: JSON.stringify({title,description,tag}) 
      //       });
      //       const note =await response.json();
      //       console.log(note);
            
      //       setNotes(notes.concat(note));
      // }

      const addNote = async (title, description, tag) => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('No token found in localStorage');
            return;
          }
      
          // API CALL
          const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token
            },
            body: JSON.stringify({ title, description, tag })
          });
      
          if (!response.ok) {
            const errorResponse = await response.json();
            console.error('Error adding note:', errorResponse.error);
            return;
          }
      
          const note = await response.json();
          console.log('Note added:', note);
      
          // Update state with the newly added note
          setNotes([...notes, note]);
        } catch (error) {
          console.error('Error adding note:', error);
        }
      };
      
      
    

      //Delete a note
      const deleteNote=async (id)=>{

        //API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          
        });
        const json =await response.json();
        console.log(json);

        // console.log("Deleting note with id "+id);
        const newNote=notes.filter((note)=>{return note._id!==id});
        setNotes(newNote);
      }

      //Edit a note
      const editNote=async (id,title,description,tag)=>{
        //API call

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
        const json=await response.json();
        console.log(json);
        

        let newNotes=JSON.parse(JSON.stringify(notes))
        //Logic for editing note on client side
        for(let index=0;index<newNotes.length;index++){
          const element=newNotes[index];
          if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
          }
        }
        setNotes(newNotes)
      }
    
     return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children};
        </NoteContext.Provider>
     )
}

export default NoteState;


