const testHelper = require('./testhelper');
const auth = require('./auth');

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

  const expected = testHelper.toJSON(data);
  const result = testHelper.toJSON(decrypted);
  expect(result).toBe(expected);
});
