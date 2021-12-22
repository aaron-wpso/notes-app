import React, { useState, useEffect } from "react";
import "./App.css";
import DUMMY_NOTES from "./DUMMY_NOTES";
// import axios from "axios";
import Note from "./components/Note/Note";
import INote from "./interfaces/note.interface";

function App() {
  const [noteList, setNoteList] = useState<Array<any>>([]);

  useEffect(() => {
    const noteListFromStorageString = localStorage.getItem("my-notes");
    if (noteListFromStorageString) {
      const noteListFromStorageArray = JSON.parse(noteListFromStorageString);
      setNoteList(noteListFromStorageArray);
    } else {
      setNoteList(DUMMY_NOTES);
    }
  }, []);

  useEffect(() => {
    console.log("saving items to localstorage.");
    const noteListString = JSON.stringify(noteList);
    localStorage.setItem("my-notes", noteListString);
  }, [noteList]);

  // const getNote = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/notes");
  //     setNoteList(response.data.notes);
  //     console.log(noteList);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const updateNoteItem = (updatedNote: INote) => {
    //temp variable
    const updatedList = noteList.map((noteItem: INote) => {
      if (noteItem._id === updatedNote._id) {
        return updatedNote;
      }
      return noteItem;
    });
    setNoteList(updatedList); //updating the state of note list
  };

  return (
    <div className="App">
      <div className="note-list">
        {noteList.map((noteItem, index) => {
          return (
            <Note key={index} note={noteItem} onNoteUpdate={updateNoteItem} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
