const app = require("./app/src");

require("dotenv").config();

app.listen(process.env.PORT, () =>
  console.log(`App Running on port ${process.env.PORT}`)
);
