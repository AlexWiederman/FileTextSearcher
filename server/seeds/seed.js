const db = require("../config/connection");
const { Product, User, Car } = require("../models");

const productData = require("./productData.json");



db.once("open", async () => {
 
  await Product.deleteMany({});

  const products = await Product.insertMany(productData);

  console.log("products seeded!");

  await User.deleteMany();

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
  });

  await User.create({
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  await Car.deleteMany();

  console.log(products);

  const cars = await Car.create([
    {
      make: "Subaru",
      carModel: "Subaru Forester",
      year: 2020,
      carId: "1",
      // Cannot get dynamic reference to work
      drive: "fwd",
      fuel_type: "gas"
    //   oil: {"name": "Conventional",
    //   "price": "55",
    //   "quantity": "100"
    // }
    },
  ]);

  console.log("cars seeded");

  process.exit(0);
});
