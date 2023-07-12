import express from "express";

const cors = require("cors");
const app = express();
const port = 4000;
app.use(cors());

app.use(express.json()) 

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

const creditCardRouter = require("./routes/credit_card")
app.use("/creditCard", creditCardRouter)