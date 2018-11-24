import {
  fetchNotesBegin,
  fetchNotesSuccess,
  fetchNotesFailure,
  deleteNoteBegin,
  deleteNoteSuccess,
  deleteNoteFailure,
  upsertNoteBegin,
  upsertNoteSuccess,
  upsertNoteFailure,
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
      console.log('datastore is dispatching');
      try {
        await dispatch(begin());
        console.log('datastore is fetching');
        const response = await fetch();
        console.log(response.url);
        const result = await this.jsonOrErrors(response);
        await dispatch(success(result));
      } catch (error) {
        console.log('datastore error');
        console.log(error);
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
    () => deleteNoteBegin(id),
    () => fetch(`${baseUrl}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': this.apikey,
      },
    }),
    result => deleteNoteSuccess(),
    err => deleteNoteFailure(err),
  );
  upsertNote = note => this.generateDispatcher(
    () => upsertNoteBegin(note),
    () => fetch(`${baseUrl}/notes/${note.id}`, {
      method: 'PUT',
      headers: {
        'apikey': this.apikey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: note.text,
        created: note.created,
      }),
    }),
    result => upsertNoteSuccess(result.note),
    err => upsertNoteFailure(err),
  );
}

const Api = new _Api();
export default Api;
