# Full-stack bank application

## API

#### Auth api:

POST/login
The login route uses json body to pass username and password 

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

#### Bank api:

PUT/deposit/:id
The deposit route performs a money deposit taking as a parameter the id
extracted from the JWT provided by auth apis and the deposit value sent as json body. Then updates the specified record with 
a mongoose function and the $inc and $push operators to update balance and movements:

```javascript
const deposit = req.body.deposit;
const id = req.params.id;
Users.findByIdAndUpdate(
  id,
  {
    $inc: { balance: deposit },
    $push: { movements: `deposit: ${deposit}` }
    }
    // error handling
```

PUT/withdraw/:id
The withdraw route functions really the same as deposit but the $inc operator
uses the - symbol and the records are saved as withdraws.

```javascript
const withdraw = req.body.withdraw;
  const id = req.params.id;
  console.log(req.params.id);
  Users.findByIdAndUpdate(
    id,
    {
      $inc: { balance: -withdraw },
      $push: { movements: `withdraw: ${withdraw}` },
    }
    // error handling
```

PUT/transfer/:idsend/:idreceive
The transfer route takes two params, the sender's (extracted from JWT) id and the receiver's id (provided by the user)
the transfer amount is sent as json body.\

```javascript
const idsend = req.params.idsend;
const idreceive = req.params.idreceive;
const transfer = req.body.transfer;
```

Then an async function is performed (try) using two mongoose functions similar to deposit and withdraw
and everything is awaited (catch) by the Promise.all method.

```javascript
async function transferFn() {
    try {
      let sender = Users.findByIdAndUpdate(idsend, {
        $inc: { balance: -transfer },
        $push: { movements: `sent: ${transfer}` },
      });
      let receiver = Users.findByIdAndUpdate(idreceive, {
        $inc: { balance: transfer },
        $push: { movements: `received: ${transfer}` },
      });
      let result = await Promise.all([sender, receiver]);
      // error handling
      }
```

GET/:id
This is the only get route and is used to recover all user information and display
them in the all data component. It uses the id as a parameter and calls a simple findById()
function from mongoose.

```javascript
const id = req.params.id;
  Users.findById(id, "balance movements", (err, data) => {
  // error handling
  }
```
