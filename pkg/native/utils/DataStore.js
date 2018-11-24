import {
  fetchNotesBegin,
  fetchNotesSuccess,
  fetchNotesFailure,
  deleteNoteBegin,
  deleteNoteSuccess,
  deleteNoteFailure,
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

  fetchNotes(){
    return async (dispatch) => {
      let notes = null;
      try {
        await dispatch(fetchNotesBegin());
        const response = await fetch(`${baseUrl}/notes`, {
          method: 'GET',
          headers: {
            'apikey': this.apikey,
          },
        });
        const result = await this.jsonOrErrors(response);
        await dispatch(fetchNotesSuccess(result.notes));
      } catch (error) {
        await dispatch(fetchNotesFailure(error));
      }
    }
  }
  deleteNote(id){
    return async (dispatch) => {
      try {
        await dispatch(deleteNoteBegin(id));
        const response = await fetch(`${baseUrl}/notes/${id}`, {
          method: 'DELETE',
          headers: {
            'apikey': this.apikey,
          },
        });
        await this.jsonOrErrors(response);
        await dispatch(deleteNoteSuccess());
      } catch (error) {
        await dispatch(deleteNoteFailure(error));
      }
    }
  }

  async createNote(text){
    const response = await fetch(`${baseUrl}/notes`, {
      method: 'POST',
      headers: {
        'apikey': this.apikey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text: text}),
    });
    const result = await this.jsonOrErrors(response);
    return result.note;
  }
  async updateNote(id, text){
    const response = await fetch(`${baseUrl}/notes/${id}`, {
      method: 'PATCH',
      headers: {
        'apikey': this.apikey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text: text}),
    });
    const result = await this.jsonOrErrors(response);
    return result.note;
  }
}

const Api = new _Api();
export default Api;
