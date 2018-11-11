const AWS = require('aws-sdk-mock');
const testHelper = require('./testhelper');
const exception = require('./exception');
const auth = require('./auth');
const store = require('./store');


afterEach(() => {
  AWS.restore();
});

function newTestApiKey(){
  const username = Math.floor(Math.random()*100000).toString();
  const password = Math.floor(Math.random()*100000).toString();
  return auth.generateApiKey(username, password);
}

function newTestUser(){
  return {
    notes: [0,1,2].map(i => ({
      id: i,
      text: 'text for ' + i,
      created: i,
      updated: i,
    })),
  };
}

function mockGetObject(userHash, result){
  AWS.mock('S3', 'getObject', function (params, callback){
    if (params.Key === `data/${userHash}.json`){
      callback(null, {
        Body: {
          toString: () => result,
        },
      });
    } else {
      callback('s3 error', null);
    }
  });
}

function mockGetUser(apikey, data){
  const { userHash, passHash } = auth.parseApiKey(apikey);
  const encrypted = auth.encryptData(passHash, data);
  mockGetObject(userHash, encrypted);
}

test('checkUsername returns true', async () => {
  const username = 'hello@aol.com';
  const userHash = auth.hashUsername(username);
  const expected = 'encrypted';
  mockGetObject(userHash, expected);

  const result = await store.checkUsername(username);
  expect(result).toBe(true);
});
test('checkUsername returns error', async () => {
  const username = 'hello@aol.com';
  const userHash = auth.hashUsername(username);
  const expected = 'encrypted';
  mockGetObject(userHash + '_wrong', expected);

  expect(store.checkUsername(username))
    .rejects.toThrow(exception.UserNotFound);
});

test('getNotes returns notes', async () => {
  const apikey = newTestApiKey();
  const data = newTestUser();
  mockGetUser(apikey, data);

  const expected = testHelper.toJSON(data.notes);
  const result = testHelper.toJSON(await store.getNotes(apikey));
  expect(result).toBe(expected);
});
test('getNotes returns user error', async () => {
  const apikey = newTestApiKey();
  const data = newTestUser();
  mockGetUser(apikey, data);

  expect(store.getNotes('wrong_user' + apikey))
    .rejects.toThrow(exception.UserNotFound);
});
test('getNotes returns auth error', async () => {
  const apikey = newTestApiKey();
  const data = newTestUser();
  mockGetUser(apikey, data);

  expect(store.getNotes(apikey + 'wrong_pass'))
    .rejects.toThrow(exception.IncorrectAuth);
});
