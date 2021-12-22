import React, { FC, FocusEvent } from "react";
import "./Note.css";
import INote from "../../interfaces/note.interface";

type Props = {
  note: INote;
  onNoteUpdate: Function;
};

const Note: FC<Props> = ({ note, onNoteUpdate }) => {
  const noteTextUpdated = (event: FocusEvent<HTMLHeadingElement, Element>) => {
    const newTextValue = event.currentTarget.textContent;
    if (newTextValue === note.text) {
      return;
    }
    const updatedNote: INote = {
      ...note,
      text: newTextValue || "",
    };
    onNoteUpdate(updatedNote);
  };

  return (
    <div className="note">
      <h4
        className="note__text"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onBlur={noteTextUpdated}
      >
        {note.text}
      </h4>
      <h5 className="note__link">
        <a href={note.link}>{note.link}</a>
      </h5>
    </div>
  );
};

export default Note;
