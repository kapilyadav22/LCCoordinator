const express = require('express');
const app = express();

app.use(express.static("./"));

app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname,"index.html"));
})


//to access env variables, we access using process.env
const PORT = process.env.PORT || 3000;

//our app will be active on 3000 port
app.listen(PORT, () => {
    console.log("server is listening on port 3000");
});