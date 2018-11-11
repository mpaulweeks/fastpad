# redirect-api

https://1d7ibyh21j.execute-api.us-east-1.amazonaws.com/latest
https://1d7ibyh21j.execute-api.us-east-1.amazonaws.com/production
https://1d7ibyh21j.execute-api.us-east-1.amazonaws.com/staging

This folder should have a `.env` file with the following variables:

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

## installation

Following this [setup guide](https://medium.freecodecamp.org/express-js-and-aws-lambda-a-serverless-love-story-7c77ba0eaa35)

slightly altered steps for the initial setting up lambda deploy via claudia:

### AWS permissions

ensure user as full access for:
- s3
- lambda
- iam
- gateway

### create lambda proxy

export `.env` vars

```
yarn run claudia generate-serverless-express-proxy --express-module src/api
rm package-lock.json
```

generated `lambda.js`

### create remote AWS resources

```
yarn run claudia create --handler lambda.handler --deploy-proxy-api --region us-east-1
```

generated `claudia.json`
