import {
  SET_EDITOR_NOTE,
  SET_EDITOR_FOCUS,
  UPSERT_NOTE_BEGIN,
  UPSERT_NOTE_SUCCESS,
  UPSERT_NOTE_FAILURE,
  FETCH_NOTES_BEGIN,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAILURE,
  DELETE_NOTE_BEGIN,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
} from '../actions';

import { sortNotes, convertNotesToObj } from '../../utils';

const initialState = {
  editor: {
    focused: false,
    note: null,
    saving: false,
    error: null,
  },
  list: {
    notes: {},
    loading: false,
    error: null,
  },
};

function appendEditor(state, newState){
  return {
    ...state,
    editor: {
      ...state.editor,
      ...newState,
    },
  };
}
function appendList(state, newState){
  return {
    ...state,
    list: {
      ...state.list,
      ...newState,
    },
  };
}
function copyEditorNote(state){
  return appendList(state, {
    notes: {
      ...state.list.notes,
      [state.editor.note.id]: state.editor.note,
    },
  });
}
export default function notesReducer(state = initialState, action) {

  switch (action.type) {

    case SET_EDITOR_NOTE:
      return appendEditor(state, {
        note: action.note,
      });

    case SET_EDITOR_FOCUS:
      return appendEditor(state, {
        focused: action.focused,
      });

    case UPSERT_NOTE_BEGIN:
      return copyEditorNote(appendEditor(state, {
        saving: true,
        error: null,
      }));
    case UPSERT_NOTE_SUCCESS:
      return copyEditorNote(appendEditor(state, {
        saving: false,
        note: {
          ...action.payload.note,
          text: state.editor.note.text,
        },
      }));
    case UPSERT_NOTE_FAILURE:
      return appendEditor(state, {
        saving: false,
        error: action.payload.error,
      });

    case DELETE_NOTE_BEGIN:
      return appendList(state, {
        loading: true,
        error: null,
        notes: convertNotesToObj(
          sortNotes(state.list.notes)
            .filter(note => note.id !== action.payload.id)
        ),
      });
    case DELETE_NOTE_SUCCESS:
      return appendList(state, {
        loading: false,
      });
    case DELETE_NOTE_FAILURE:
      return appendList(state, {
        loading: false,
        error: action.payload.error,
      });

    case FETCH_NOTES_BEGIN:
      return appendList(state, {
        loading: true,
        error: null,
      });
    case FETCH_NOTES_SUCCESS:
      return appendList(state, {
        loading: false,
        notes: convertNotesToObj(action.payload.notes),
      });
    case FETCH_NOTES_FAILURE:
      return appendList(state, {
        loading: false,
        error: action.payload.error,
      });

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
