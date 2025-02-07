const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
            type: String,
            trim: true,
            minlength: 3,
            MAX_LENGTH: 20,
            required: [true, "User Name is required"],
             },
    email: {
                type: String,
                unique: [true, "Email address already exists"],
                required: true,
                lowercase : true,
                validate: {
                    validator: function(v) {
                        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
                    },
                    message: props => `${props.value} is not a valid email!`
                }
            },
    password: {
                type: String,
                required: [true,"Password is required"],
                minlength: 10,
                select: false,
                validate: {
                    validator: function(v) {
                        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v);
                    },
                    message: props => `${props.value} is not a valid password!`
                },
     confirmPassword: {
        type: String,
        required: [true, "Confirm Password is required"],
        validate: {
            validator: function(v, obj) {
                return obj.password === v;
            },
            message: "Passwords do not match"
        }
     },
      photo: {
                type: String,
                  default: "default.jpg"
                },


    }        
});
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});

userScheman.method.comparePasswordInDB = async function(password, confirmPassword) {
    return await bcrypt.compare(password, confirmPassword);
}

module.exports = mongoose.model("User", userSchema);