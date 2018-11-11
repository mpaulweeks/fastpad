const auth = require('./auth');

function toJSON(data){
  return JSON.stringify(data);
}

test('hashUsername', () => {
  const username = 'hello@aol.com';
  const result = auth.hashUsername(username);
  expect(result).toBe('d844a89346310b72');
});

test('encrypt/decrypt', () => {
  const passHash = '12345';
  const data = { a: '123', b: 45 };

  const encrypted = auth.encryptData(passHash, data);
  const decrypted = auth.decryptData(passHash, encrypted);

  const expected = toJSON(data);
  const result = toJSON(decrypted);
  expect(result).toBe(expected);
});
