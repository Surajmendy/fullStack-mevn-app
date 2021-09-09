const express = require("express");
const cors  = require("cors");
const db = require("./models");
const clientRouter = require("./routes");
const providerRouter = require("./routes/provider");
const app = express();
const swaggerUi = require("swagger-ui-express");

const swaggerJsdoc = require("swagger-jsdoc");

app.use(cors('*'))
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use('/api/client', clientRouter);
app.use('/api/provider', providerRouter)

const options = {
  swaggerDefinition: {
    info: {
      title: "Fullstack JavaScript Application (MEVNSTACK)",
      description: "API Endpoints for  Fullstack JavaScript Application",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*"],
};
const swaggerSpecification = swaggerJsdoc(options);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecification));

const PORT = process.env.PORT || 3001;


db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


app.get("/", (req, res) => {
  res.send({ message: "Works." });
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`);
});