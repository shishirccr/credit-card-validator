import {luhnCheckSum} from "../utilities/helper";

const validateCreditCardNumber = async (req, res) => {
    try {
        res.send({validCreditCard: luhnCheckSum(req.body.cardNumber)});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.validateCreditCardNumber= validateCreditCardNumber;

