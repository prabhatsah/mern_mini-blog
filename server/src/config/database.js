const { default: mongoose } = require("mongoose");

const dbConnection = async () => {
  await mongoose
    // .connect("mongodb+srv://prabhatsah349:EeBH9!n3zqb52@cluster0.km2a6oc.mongodb.net/mern_mini-blog")
    .connect("mongodb+srv://prabhatsah349:i96YcbBCdN6mgp2d@backendpractice.2tw9rsd.mongodb.net/mern-mini-blog")
    .then(() => console.log("Database connected"))
    .catch(() => console.log("Failed to connect to database"));
};

module.exports = dbConnection;
