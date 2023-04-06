const {
    createUser,
    findUserByEmail,
    findUserByID,
    addAddress,
    deleteAddress,
    addCard,
    deleteCard,
} = require("../queries/users.queries");
const { privateKey, publicKey } = require("../environment/keys");
const jwt = require("jsonwebtoken");
const JWT_EXPIRY = 60 * 60 * 24 * 30;

exports.verifyEmail = async (req, res, next) => {
    try {
        const user = await findUserByEmail(req.params.email);
        res.send(user ? { email: user.email } : null);
    } catch (err) {
        next(err);
    }
};

exports.signup = async (req, res, next) => {
    try {
        const user = await createUser(req.body);
        const token = jwt.sign({ userId: user._id.toString() }, privateKey, {
            expiresIn: JWT_EXPIRY,
            algorithm: "RS256"
          });
            res.cookie('token', token, { maxAge: JWT_EXPIRY * 1000, httpOnly: true });
        res.json(user);
    } catch (err) {
        res.json({ error: err.message });
    }
};

exports.fetchCurrentUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (token) {
            jwt.verify(token, privateKey, async (error, decoded) => {
                if (!error) {
                    const user = await findUserByID(decoded.userId);
                    if (user) {
                        res.json(user);
                        return;
                    }
                } else {
                    res.clearCookie("token");
                    res.json(null);
                }
            });
        } else {
            res.json(null);
        }
    } catch (err) {
        console.log(err);
        res.json({ error: err.message });
    }
};

exports.addAddress = async (req, res, next) => {
    try {
        const response = await addAddress(req.body.email, req.body.address);

        res.json(response);
    } catch (err) {
        console.log(err);
        res.json({ error: err.message });
    }
};

exports.deleteAddress = async (req, res, next) => {
    try {
        const response = await deleteAddress(req.body.email, req.body.address);

        res.json(response);
    } catch (err) {
        console.log(err);
        res.json({ error: err.message });
    }
};

exports.addCard = async (req, res, next) => {
    try {
        const response = await addCard(req.body.email, req.body.creditCard);

        res.json(response);
    } catch (err) {
        console.log(err);
        res.json({ error: err.message });
    }
};

exports.deleteCard = async (req, res, next) => {
    try {
        const response = await deleteCard(req.body.email, req.body.creditCard);

        res.json(response);
    } catch (err) {
        console.log(err);
        res.json({ error: err.message });
    }
};
