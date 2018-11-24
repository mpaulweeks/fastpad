import {
  fetchNotesBegin,
  fetchNotesSuccess,
  fetchNotesFailure,
  deleteNoteBegin,
  deleteNoteSuccess,
  deleteNoteFailure,
  createNoteBegin,
  createNoteSuccess,
  createNoteFailure,
  updateNoteBegin,
  updateNoteSuccess,
  updateNoteFailure,
} from '../redux/actions';


const baseUrl = "http://localhost:3001";

// todo persist locally, then try to save/delete when internet available

class _Api {
  // example | hunter2
  apikey = '42e741065168145c:00f54c7e6d0b3748';
  loadApiKey(apikey){
    this.apikey = apikey;
  }

  jsonOrErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  }
  generateDispatcher = (begin, fetch, success, failure) => {
    return async (dispatch) => {
      try {
        await dispatch(begin());
        const response = await fetch();
        const result = await this.jsonOrErrors(response);
        await dispatch(success(result));
      } catch (error) {
        await dispatch(failure(error));
      }
    }
  }

  fetchNotes = () => this.generateDispatcher(
    () => fetchNotesBegin(),
    () => fetch(`${baseUrl}/notes`, {
      method: 'GET',
      headers: {
        'apikey': this.apikey,
      },
    }),
    result => fetchNotesSuccess(result.notes),
    err => fetchNotesFailure(err),
  );
  deleteNote = id => this.generateDispatcher(
    () => deleteNoteBegin(),
    () => fetch(`${baseUrl}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': this.apikey,
      },
    }),
    result => deleteNoteSuccess(),
    err => deleteNoteFailure(err),
  );
  createNote = text => this.generateDispatcher(
    () => createNoteBegin(text),
    () => fetch(`${baseUrl}/notes`, {
      method: 'POST',
      headers: {
        'apikey': this.apikey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text: text}),
    }),
    result => createNoteSuccess(result.note),
    err => createNoteFailure(err),
  );
  updateNote = (id, text) => this.generateDispatcher(
    () => updateNoteBegin(id, text),
    () => fetch(`${baseUrl}/notes/${id}`, {
      method: 'PATCH',
      headers: {
        'apikey': this.apikey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text: text}),
    }),
    result => updateNoteSuccess(result.note),
    err => updateNoteFailure(err),
  );
}

const Api = new _Api();
export default Api;
