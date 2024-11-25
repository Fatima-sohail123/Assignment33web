let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

// Create the User schema
let User = mongoose.Schema({
    username: {
        type: String,
        default: "",
        trim: true,
        required: "Username is required"
    },
    displayName: {
        type: String,
        default: "",
        trim: true,
        required: "DisplayName is required"
    },
    email: {
        type: String,
        default: "",
        trim: true,
        required: "Email is required",
        match: [/.+\@.+\..+/i, 'Invalid email address'] // Basic email validation
    },
    created: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},
{
    collection: "user"
});

// Set options for passport-local-mongoose plugin
let options = {
    errorMessages: {
        MissingPasswordError: 'Wrong or Missing Password'
    }
};

// Apply the passport-local-mongoose plugin for password hashing
User.plugin(passportLocalMongoose, options);

// Export the User model
module.exports.User = mongoose.model('User', User);