
const baseUrl = "http://localhost:3001";

class _Api {
  // example | hunter2
  apikey = '42e741065168145c:00f54c7e6d0b3748';

  loadApiKey(apikey){
    this.apikey = apikey;
  }

  async getNotes(){
    const response = await fetch(`${baseUrl}/notes`, {
      headers: {'apikey': this.apikey},
    });
    const result = await response.json();
    return result.notes;
  }
  async createNote(text){
    const response = await fetch(`${baseUrl}/notes`, {
      headers: {'apikey': this.apikey},
      method: 'POST',
      body: JSON.stringify({text: text}),
    });
    const result = await response.json();
    return result;
  }
  async updateNote(id, text){
    const response = await fetch(`${baseUrl}/notes/${id}`, {
      headers: {'apikey': this.apikey},
      method: 'PATCH',
      body: JSON.stringify({text: text}),
    });
    const result = await response.json();
    return result;
  }
  async deleteNote(id, text){
    const response = await fetch(`${baseUrl}/notes/${id}`, {
      headers: {'apikey': this.apikey},
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  }
}

const Api = new _Api();
export default Api;
