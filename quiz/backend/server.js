const app = require("./app")
const dotenv = require("dotenv")

//Connecting to database
require("./config/database")

//Accessing DOTENV 
dotenv.config({ path: "backend/config/config.env" })


app.listen(process.env.PORT, () => {
    console.log("Server is working, port")
})