export const SET_EDITOR_NOTE     = 'SET_EDITOR_NOTE';
export const SET_EDITOR_FOCUS    = 'SET_EDITOR_FOCUS';
export const UPSERT_NOTE_BEGIN   = 'UPSERT_NOTE_BEGIN';
export const UPSERT_NOTE_SUCCESS = 'UPSERT_NOTE_SUCCESS';
export const UPSERT_NOTE_FAILURE = 'UPSERT_NOTE_FAILURE';
export const FETCH_NOTES_BEGIN   = 'FETCH_NOTES_BEGIN';
export const FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';
export const FETCH_NOTES_FAILURE = 'FETCH_NOTES_FAILURE';
export const DELETE_NOTE_BEGIN   = 'DELETE_NOTE_BEGIN';
export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS';
export const DELETE_NOTE_FAILURE = 'DELETE_NOTE_FAILURE';

export const setEditorNote = note => ({
  type: SET_EDITOR_NOTE,
  note,
});

export const setEditorFocus = focused => ({
  type: SET_EDITOR_FOCUS,
  focused,
});

export const upsertNoteBegin = note => ({
  type: UPSERT_NOTE_BEGIN,
  payload: { note },
});

export const upsertNoteSuccess = note => ({
  type: UPSERT_NOTE_SUCCESS,
  payload: { note },
});

export const upsertNoteFailure = error => ({
  type: UPSERT_NOTE_FAILURE,
  payload: { error },
});

export const fetchNotesBegin = () => ({
  type: FETCH_NOTES_BEGIN,
});

export const fetchNotesSuccess = notes => ({
  type: FETCH_NOTES_SUCCESS,
  payload: { notes },
});

export const fetchNotesFailure = error => ({
  type: FETCH_NOTES_FAILURE,
  payload: { error },
});

export const deleteNoteBegin = id => ({
  type: DELETE_NOTE_BEGIN,
  payload: { id },
});

export const deleteNoteSuccess = notes => ({
  type: DELETE_NOTE_SUCCESS,
});

export const deleteNoteFailure = error => ({
  type: DELETE_NOTE_FAILURE,
  payload: { error },
});
