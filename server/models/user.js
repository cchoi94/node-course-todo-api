const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            minlength: 1,
            trim: true,
            unique: true,
            validate: {
                validator: validator.isEmail,
                message: '{VALUE} is not a valid email'
            }
        },
        password: {
            type: String,
            require: true,
            minlength: 6
        },
        tokens: [{
            access: {
                type: String,
                required: true
            }
        }, {
            token: {
                type: String,
                required: true
            }
        }]
});

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']) // although id is not written in the UserSchema, it exists cause of mongoDB
}

//instance methods, instance methods have access to the individual documents. Using function, cause we cant use this
UserSchema.methods.generateAuthToken = function () { //.method creates instance methods
    const user = this; 
    const access = 'auth';
    const token = jwt.sign({
        // data we want to sign
            _id: user._id.toHexString(),
            access
        },
        // secret value
        'abc123').toString();

        user.tokens = user.tokens.concat([{access, token}]);
        // user.tokens.push({access, token})

        return user.save().then(() => {
            return token;
        })
        //returning token is the passed on as the success arguement value for the next then()
    } 
//const token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

UserSchema.statics.findByToken = function (token) { //.statics create model methods
    var User = this;
    var decoded;

    try { //if any errors happens in the try block, then catch function runs
        decoded = jwt.verify(token, 'abc123')
    } catch (err) {
        
        return Promise.reject();
        
        // or write it as return new Promise((resolve, reject) => {
        //     reject()
        // })
            //what evers passed into the reject method, would be the err argument in the catch function
    }

    return User.findOne({
        _id: decoded._id,
        // 'tokens.token': token, //querying a nested document, when there are dots in the value, quotes are needed
        // 'tokens.access': 'auth'
    })
} 

UserSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
               user.password = hash;
               next();
            })
        })
    } else {
        next();
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = {User}