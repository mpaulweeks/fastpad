import {
  FETCH_NOTES_BEGIN,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAILURE,
  DELETE_NOTE_BEGIN,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
} from '../actions';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function notesReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_NOTES_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_NOTES_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.notes,
      };

    case FETCH_NOTES_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };

    case DELETE_NOTE_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DELETE_NOTE_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
      };

    case DELETE_NOTE_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
