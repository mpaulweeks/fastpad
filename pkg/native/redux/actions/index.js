export const setThinking = thinking => ({
  type: 'SET_THINKING',
  thinking,
});

export const setEditorNote = note => ({
  type: 'SET_EDITOR_NOTE',
  note,
});

export const setEditorFocus = focused => ({
  type: 'SET_EDITOR_FOCUS',
  focused,
});

export const FETCH_NOTES_BEGIN   = 'FETCH_NOTES_BEGIN';
export const FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';
export const FETCH_NOTES_FAILURE = 'FETCH_NOTES_FAILURE';

export const fetchNotesBegin = () => ({
  type: FETCH_NOTES_BEGIN
});

export const fetchNotesSuccess = notes => ({
  type: FETCH_NOTES_SUCCESS,
  payload: { notes }
});

export const fetchNotesFailure = error => ({
  type: FETCH_NOTES_FAILURE,
  payload: { error }
});
