const {SHA256} = require('crypto-js')
// const message = 'I am user number 3'
// const hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`)

// const data = {
//     id: 4
// };

// const token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString() //'somesecret' is known as a salt, to make the hash more secure
// }


// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();


// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed')
// } else {
//     console.log('Data was Changed. Do not trust')
// }

///////////////////////

// const jwt = require('jsonwebtoken');

// const data = {
//     id: 10
// }

// const token = jwt.sign(data, '123abc'); //here, you are hashing data as the info and '123abc' is the salt
// console.log(token)

// const decoded = jwt.verify(token, '123abc'); //only if seceret and token is not altered, then we will get info back
// console.log('decoded', decoded)

// jwt.sign //creates hash and returns token
// jwt.verify //takes token and make sure data is not manipulated

//////////////////////////

//hasing password

const bcrypt = require('bcryptjs');

const password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(password)
    })
})

const hashPassword = '$2a$10$0afv8eYp57JbddWo1M44q.hig2BYFC2IGCYIvHeSR0cMNcYyDNuN.'

bcrypt.compare(password, hashPassword, (err, res) => { //res is a boolean whether or not the password and hashPassword match
    console.log(res)
})