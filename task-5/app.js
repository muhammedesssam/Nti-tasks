require("dotenv").config();
const app = require("./app/src");

app.listen(process.env.PORT, () =>
  console.log(`App Running on port ${process.env.PORT}`)
);
