const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
            type: String,
            trim: true,
            minlength: 3,
            MAX_LENGTH: 20,
            required: [true, "Room Name is required"],
            unique: [true,"Room Already Exists"],
             },
    email: {
                type: String,
                unique: [true, "Email address already exists"],
                required: true,
                validate: {
                    validator: function(v) {
                        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
                    },
                    message: props => `${props.value} is not a valid email!`
                }
            },
    password: {
                type: String,
                required: true,
                minlength: 10,
                select: false,
                validate: {
                    validator: function(v) {
                        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v);
                    },
                    message: props => `${props.value} is not a valid password!`
                }

    }        
});

module.exports = mongoose.model("User", userSchema);