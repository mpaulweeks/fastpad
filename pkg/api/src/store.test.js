const AWS = require('aws-sdk-mock');
const exception = require('./exception');
const auth = require('./auth');
const store = require('./store');

function mockGetUser(username, result){
  const userHash = auth.hashUsername(username);
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

test('checkUsername return true', async () => {
  const username = 'hello@aol.com';
  const expected = 'encrypted';
  mockGetUser(username, expected);

  const result = await store.checkUsername(username);
  expect(result).toBe(true);
  AWS.restore();
});

test('checkUsername return error', async () => {
  const username = 'hello@aol.com';
  const expected = 'encrypted';
  mockGetUser(username + '_wrong', expected);

  expect(store.checkUsername(username))
    .rejects.toThrow(exception.UserNotFound);
  AWS.restore();
});
