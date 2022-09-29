//libraries
const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config();
const cors = require("cors")
const {graphqlHTTP} = require("express-graphql")
const bodyParser = require("body-parser")

//modules
const dbConfig = require("./config/database.config.js")
const schema = require("./schema/schema")
const nftRouter = require("./routes/nftRoute")
const userRouter = require("./routes/userRoute")

const app = express();
app.use(cors())

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())

mongoose.Promise = global.Promise;
//Db Connection
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database")
})
.catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit()
})

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV = "development",
    })
)

//Routes
app.use("/api/nft", nftRouter)
app.use("/api/user", userRouter)

// listen for requests
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
