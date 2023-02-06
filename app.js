const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);


app.route("/articles")
    .get(function (req, res) {
        Article.find({}, function (err, foundArticles) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(foundArticles);
            }
        });
    })
    .post(function (req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function (err) {
            if (err) {
                res.send(err);
            }
            else {
                res.send("saved to database");
            }
        });
    })
    .delete(function (req, res) {
        Article.deleteMany({}, function (err) {
            if (!err) {
                res.send("successfully deleted all articles!");
            }
            else {
                res.send(err);
            }
        });
    });


app.route("/articles/:articleTitle")
.get( 
    function(req, res){
        const queriedPost = req.params.articleTitle;
        Article.findOne({title: queriedPost}, function(err, foundArticle){
            if(!err){
                res.send(foundArticle);
            }
            else{
                res.send("No article matching that title was found"); 
            }   
        })
}
).post( function(req, res){

}
)
.delete( function(req, res){


}
);

app.listen(3000, function (req, res) {
    console.log("Server started on port 3000");
})
