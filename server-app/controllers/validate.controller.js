function validateAddress(req, res, next) {
    let isValid = false;

    try {
        const address = req.body.address;

        // Il faudrait avoir une validation plus réelle ici
        if (
            address.fullName.length > 3 &&
            address.email.length > 3 &&
            address.line1.length > 3 &&
            address.line2.length > 3
        )
            isValid = true;

        res.status(200).json({
            status: 200,
            isValid,
            message: "success",
        });
    } catch (error) {
        // next(error);
        res.status(400).json({
            status: 400,
            isValid,
            message: "adresse invalide",
            error: error.message,
        });
    }
}

function validateCard(req, res, next) {
    let isValid = false;

    try {
        const creditCard = req.body.creditCard;

        // Il faudrait avoir une validation plus complète ici
        if (
            creditCard.cardName.length > 3 &&
            creditCard.cardNumber.length > 3 &&
            creditCard.cardExpiration.length > 3 &&
            creditCard.cardVerificationNumber.length > 2
        ) {
            isValid = true;
        }
        res.status(200).json({
            status: 200,
            isValid,
            message: "success",
        });
    } catch (error) {
        // next(error);
        res.status(400).json({
            status: 400,
            isValid,
            message: "carte invalide",
        });
    }
}

module.exports = { validateAddress, validateCard };
