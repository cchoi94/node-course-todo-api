const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

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

    return _.pick(userObject, ['_id', 'email'])
}

//instance methods, instance methods have access to the individual documents. Using function, cause we cant use this
UserSchema.methods.generateAuthToken = function () {
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

const User = mongoose.model('User', UserSchema);

module.exports = {User}