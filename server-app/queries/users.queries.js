const User = require("../database/models/user.model");
const { Address } = require("../database/models/address.model");
const { CreditCard } = require("../database/models/creditCard.model");

exports.findUserByID = (_id) => {
    return User.findById(_id).select("-password");
}; // Récupérer les données de l'utilisateur par son ID

exports.getUserInfo = (_id, fields) => {
    return User.findById(_id).select(`${fields}`);
};

exports.findUserByEmail = (email) => {
    return User.findOne({ email: email });
}; // Récupérer les données de l'utilisateur par son courriel

exports.createUser = async (data) => {
    const user = await this.findUserByEmail(data.email);
    if (user) throw new Error("Courriel déjà utilisé");

    const hashedPassword = await User.hashPassword(data.password);
    const newUser = new User({
        email: data.email,
        password: hashedPassword,  
    });

    


    return newUser.save();
};

exports.addAddress = async (email, address) => {
    const { fullName, phone, line1, line2, instructions, isDefault } = address;

    let addressIsValid = false;

    const newAddress = new Address({ fullName, phone, line1, line2, instructions, isDefault });

    const user = await User.findOne({ email: email });

    let addressExists = false;

    for (let i = 0; i < user.addresses.length; i++) {
        const dbAddress = user.addresses[i];
        if (dbAddress.fullName === newAddress.fullName) {
            user.addresses[i] = newAddress;
            addressExists = true;
        }
    }

    if (newAddress.line1.length > 4 && newAddress.fullName.length > 4 && newAddress.line2.length > 4) {
        addressIsValid = true;
    }

    if (!addressIsValid) throw new Error("Adresse invalide");

    if (!addressExists) user.addresses.push(newAddress);

    return user.save();
};

exports.deleteAddress = async (email, address) => {
    const user = await User.findOne({ email: email });

    for (let i = 0; i < user.addresses.length; i++) {
        const dbAddress = user.addresses[i];
        if (dbAddress.fullName === address.fullName) {
            user.addresses.splice(i, 1);
        }
    }

    return user.save();
};

exports.addCard = async (email, creditCard) => {
    const { cardName, cardNumber, cardExpiration, cardVerificationNumber, isDefault } = creditCard;
    const newCreditCard = new CreditCard({ cardName, cardNumber, cardExpiration, cardVerificationNumber, isDefault });

    const user = await User.findOne({ email: email });

    let creditCardExists = false;
    let creditCardIsValid = false;

    for (let i = 0; i < user.creditCards.length; i++) {
        const dbCreditCard = user.creditCards[i];
        if (dbCreditCard.cardName === newCreditCard.cardName) {
            user.creditCards[i] = newCreditCard;
            creditCardExists = true;
        }
    }

    if (
        newCreditCard.cardNumber.length > 4 &&
        newCreditCard.cardExpiration.length > 3 &&
        newCreditCard.cardVerificationNumber.length === 3
    ) {
        creditCardIsValid = true;
    }

    if (!creditCardIsValid) throw new Error("Carte de crédit invalide");

    if (!creditCardExists) user.creditCards.push(newCreditCard);

    return user.save();
};

exports.deleteCard = async (email, creditCard) => {
    const user = await User.findOne({ email: email });

    for (let i = 0; i < user.creditCards.length; i++) {
        const dbCreditCard = user.creditCards[i];
        if (dbCreditCard.cardName === creditCard.cardName) {
            user.creditCards.splice(i, 1);
        }
    }

    return user.save();
};
