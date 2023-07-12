const express = require("express");
const creditCardController = require("../controller/credit_card");

const router = express.Router();

router.post('/validate', creditCardController.validateCreditCardNumber);

module.exports=router;