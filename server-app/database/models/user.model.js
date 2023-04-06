const mongoose = require("mongoose");
const { addressSchema } = require("./address.model");
const { creditCardSchema } = require("./creditCard.model");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    addresses: [addressSchema],
    creditCards: [creditCardSchema],
});

userSchema.statics.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    } catch (e) {
        throw e;
    }
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
}; // Pouvoir comparer le mot de passe haché du l'utilisateur en cours avec le mot de passe non-haché fourni par le front-end

const User = mongoose.model("User", userSchema);

module.exports = User;
