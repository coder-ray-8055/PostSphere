const express = require("express")
const app = express()
const path = require("path")
const {v4 : uuidv4} = require("uuid")
const methodOverride = require('method-override')

const port = 8080

app.use(express.urlencoded({extended : true}))
app.use(methodOverride('_method'))

app.set("view engine" , "ejs")
app.set("views" , path.join(__dirname , "views"))

app.use(express.static(path.join(__dirname , "public")))

let posts = [
    {
        id : uuidv4(),
        username : "ApnaCollege",
        content : "I love coding"
    },
    {
        id: uuidv4(),
        username : "Ray",
        content: "Hard work is important to achieve success"
    },
    {
        id: uuidv4(),
        username : "Harry",
        content:"Subscribe to my YT- CodeWithHarry"
    }
]

app.get("/" , (req , res) => {
    res.redirect("/posts")
})

app.get("/posts" , (req , res) =>{
    res.render("index.ejs" , {posts})
})

app.get("/posts/new" , (req , res) => {
    res.render("new.ejs")
})

app.post("/posts" , (req , res) =>{
    let {username , content} = req.body
    let id = uuidv4()
    posts.push({id , username , content})
    res.redirect("/posts") 
})

app.get("/posts/:id" , (req , res) => {
    let {id} = req.params
    let post = posts.find((p) => id === p.id)
    console.log(post)
    res.render("show.ejs" , {post})
})

app.patch("/posts/:id" , (req , res) => {
    let {id} = req.params
    let newContent = req.body.content
    let post = posts.find((p) => id === p.id)
    post.content = newContent
    res.redirect("/posts")
})

app.delete("/posts/:id" , (req , res) => {
    let {id} = req.params
    posts = posts.filter((p) => id !== p.id)
    res.redirect("/posts")
})

app.get("/posts/:id/edit" , (req , res) => {
    let {id} = req.params
    let post = posts.find((p) => id === p.id)
    res.render("edit.ejs" , {post})
})



app.listen(port , ()=>{
    console.log(`App is listening on port ${port}`)
})

