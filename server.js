 require("./config/config")
 const dotenv= require("dotenv").config()
const express= require("express")
const fileupload=require("express-fileupload")
const app= express()
app.use(fileupload({
    useTempFiles: true
}))

app.use(express.json())
app.use('./pictures',express.static("pictures"))
const myrouter=require("./router/router")
app.use("/api",myrouter)

PORT=process.env.PORT||6060
app.listen(PORT,()=>{
    console.log("am on brder  on port "+PORT)
})