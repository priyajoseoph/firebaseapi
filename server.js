const express = require("express")
const app = express();
const admin = require("firebase-admin");
const credentials = require("./key.json");
admin.initializeApp({
    credential :admin.credential.cert(credentials)
});
app.use(express.json());
app.unsubscribe(express.urlencoded({extended: true}))


//add a record/user
app.post('/create', async (req, res) => {
    try{
        const id = req.body.email;
        const userJson = {
            email : req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName
        };
        const response = await db.collection("users").add(userJson);
        res.send(response);
    }
    catch(error){
        res.send(error);
    }
    })


    //getall/user
app.get('/read/all', async (req, res) => {
    try{
        const usersRef = db.collection("users");
        const response = await usersRef.get();
        let responseArr = [];
        response.forEach(doc =>{
            responseArr.push(doc.data());

        });
        res.send(responseArr);
    }
    catch(error){
        res.send(error);
    }
    });
//get a user
app.get('/read/:id', async(req,res) =>{
    try{
        const userRef = db.collection("users").doc(req.params.id);
        const response = await userRef.get();
        
        res.send(response.data());
    }
    catch(error){
        res.send(error);
    }
   
});
//update user
app.post('/update', async(req,res) =>{
    try{ 
        const id = req.body.id;
        const newFirstName = "hello";
        const userRef = await db.collection("users").doc(id)
        .update({
           firstName : newFirstName 
        });
        
        res.send(userRef);
    }
    catch(error){
        res.send(error);
    }
      
});
//delete user
app.delete('/delete/:id',async (req,res) =>{
    try{
        const response = await db.collection("users").doc(req.params.id).delete();
        console.log(response);
        res.send(response);
    }
    catch(error){
        res.send(error);
    }
    
} )


const db = admin.firestore();
const PORT =process.env.PORT || 8080;
app.listen (PORT , () =>{
console.log(`Server is running on PORT ${PORT}.`)
})


