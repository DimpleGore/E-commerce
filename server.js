require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/categoryRouter"));
app.use("/api", require("./routes/productRouter"));
app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/adminRouter"));
app.use("/payment", require("./routes/paymentRouter"))

//var mongodb_URL = "mongodb://127.0.0.1/Dimple";
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://Dimple:Dimplegore@975@dimple.llwb2.mongodb.net/myFirst?retryWrites=true&w=majority',
  
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
  }
);

const port= process.env.PORT || 6000;

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
}

app.listen(PORT, () => {
  console.log("Server is running on port", port);
});
