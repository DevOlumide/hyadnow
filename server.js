const express = require("express");
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

const mongodbConnectUrl = "mongodb+srv://DevOlumide:olumide16@cluster0.w0bv7.mongodb.net/users?retryWrites=true&w=majority";

mongoose.connect(process.env.MONGODB_URI || mongodbConnectUrl, {useNewUrlParser: true}, () => console.log("Mongodb is connected"));

app.use(express.json());
app.use(cors());
app.use("/app", routes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));
}
app.listen(PORT, () => console.log("Server running"));