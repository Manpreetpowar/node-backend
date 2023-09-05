const express = require("express");
const router = express.Router();
const users = require("../models/userModal");

// router.get('/', (req,res) => {
//         console.log("connect");
// });

router.post('/register', async(req, res) => {
    const { name, email, mobile, age, work, address, description } = req.body;
    // if (!name || !email || !mobile || !age || !work || !address || !description) {
    //     res.status(400).send("All fields are required");
    // }

    try {
        const preuser = await users.findOne({email:email});
        console.log(preuser);
        if(preuser){
            res.status(404).send("User already exists");
        }else{
            const addusers = new users({
                name, email, mobile, age, work, address, description 
            });

            await addusers.save();
            res.status(201).json(addusers);
            console.log(addusers)
        }
    } catch (error) {
        res.status(404).send(error);
    }
})

module.exports = router;