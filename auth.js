const express = require("express")
const app = express();
const admin = require("firebase-admin");
const credentials = require("./key.json");
admin.initializeApp({
    credential :admin.credential.cert(credentials)
});
app.use(express.json());
app.unsubscribe(express.urlencoded({extended: true}))

app.post('/signin',async(req,res) =>{
    const users ={
        email: req.body.email,
        password: req.body.password
    }
    const userResponse = await admin.auth().createUser({
        email: users.email,
        password:users.password,
        emailVerified: false,
        disabled:false
    });
    res.json(userResponse);
})
const PORT =process.env.PORT || 8080;
app.listen (PORT , () =>{
console.log(`Server is running on PORT ${PORT}.`)
})

