const auth = require('./auth');

test('hashUsername', () => {
  const username = 'hello@aol.com';
  const result = auth.hashUsername(username);
  expect(result).toBe('535473844');
});