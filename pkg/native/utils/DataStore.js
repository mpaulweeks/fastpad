
const baseUrl = "http://localhost:3001";

// todo persist locally, then try to save/delete when internet available

class _Api {
  // example | hunter2
  apikey = '42e741065168145c:00f54c7e6d0b3748';

  loadApiKey(apikey){
    this.apikey = apikey;
  }

  async getNotes(){
    const response = await fetch(`${baseUrl}/notes`, {
      method: 'GET',
      headers: {
        'apikey': this.apikey,
      },
    });
    const result = await response.json();
    return result.notes;
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
    const result = await response.json();
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
    const result = await response.json();
    return result.note;
  }
  async deleteNote(id){
    const response = await fetch(`${baseUrl}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': this.apikey,
      },
    });
    const result = await response.json();
    return result.notes;
  }
}

const Api = new _Api();
export default Api;
