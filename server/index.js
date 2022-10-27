const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const Stripe = require("stripe")(process.env.SECRET_KEY);

app.use(express.json());
app.use(cors());

app.post("/api/payment", async (req, res) => {
  let status;
  let error;
  const { token, amount } = req.body;

  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: "usd",
    });
    status = "Success!";
  } catch (err) {
    console.log(err);
    status = "Failure!";
  }
  res.json({ status });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
