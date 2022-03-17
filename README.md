# full-stack-bank-app

# API

Auth api:

POST/login
The login path uses json body to pass username and password 

```javascript
const { usenrame, password } = req.body
```

to a mongoose model function findOne() that checks if the user exists and signs 
a JWT token with the username and the id provided by mongoDB together with a refresh token similarly created.
The tokens are sent as a response or an error status is raised.

POST/signup
The signup route uses the same json body

```javascript
const { usenrame, password } = req.body
```

but calls a mongoose method to create() a user after checking if it already exists,
initializing these parameters:

```javascript
{
          username: username,
          password: password,
          balance: 0,
        }
```

POST/logout
The logout route filters the tokens and deletes the token passed as json body.
