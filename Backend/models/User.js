const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullname: {type: String,required: true,},
    email: {type: String,required: true,unique: true,},
    password: {type: String,required: true,},
    profileImgurl: {type: String,default: null,},    
}, {timestamps: true}
);

// hashpaswordbeforesaving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}; 


module.exports = mongoose.model('User', userSchema);

