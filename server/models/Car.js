const { Schema, model } = require("mongoose");

const carSchema = new Schema({
  make: {
    type: String,
    required: true,
  },
  carModel: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

const Car = model("Car", carSchema);

module.exports = Car;
