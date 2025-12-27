const app = require("./app");
const dbConnection = require("./config/database");
require("dotenv").config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  dbConnection();
  console.log(`Server is running on port: ${PORT}`);
});
