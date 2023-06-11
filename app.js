const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  fileUpload({
    limits: { fileSize: 1000000 },
  })
);
app.use("/asset", express.static("asset"));

app.use("/jwt", require("./config/jwt"));
app.use("/users", require("./routes/user/user"));
app.use("/staff", require("./routes/staffid/staffid"));
app.use("/banners", require("./routes/banner/banner"));
app.use("/cafe", require("./routes/cafe/cafe"));
app.use("/spa", require("./routes/spa/spa"));
app.use("/roles", require("./routes/role/role"));
app.use("/faqs", require("./routes/faqs/faq"));
app.use("/checkin", require("./routes/checkin/checkin"));
app.use("/note", require("./routes/notes/note"));
app.use("/promo", require("./routes/promo/promo"));
app.use("/newmember", require("./routes/newmember/newmember"));
app.use("/explog", require("./routes/explog/index"));

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
