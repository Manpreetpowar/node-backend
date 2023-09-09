const express = require("express");
const router = express.Router();
const User = require("../models/userModal");

// router.get('/', (req,res) => {
//         console.log("connect");
// });

router.post('/register', async(req, res) => {
    const { name, email, mobile, age, work, address, description } = req.body;

    try {
        const preuser = await User.findOne({email:email});
        console.log(preuser);
        if(preuser){
            res.status(404).send("User already exists");
        }else{
            const addusers = new User({
                name, email, mobile, age, work, address, description 
            });

            await addusers.save();
            res.status(201).json(addusers);
            // console.log(addusers)
        }
    } catch (error) {
        res.status(404).send({message: error.message});
    }
});


//GET USERS LIST

router.get('/getUsers', async(req, res)=>{
    try {
        const users = await User.find().sort({ _id: -1 });;
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})


//GET SINGLE USER DATA
router.get('/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

//UPDATE THE USER
router.put('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const updatedUserData = req.body;

          // Check if the new email already exists in the database (excluding the current user's email)
    const existingUserWithEmail = await User.findOne({
        email: updatedUserData.email,
        _id: { $ne: id }, // Exclude the current user by ID
      });
  
      if (existingUserWithEmail) {
        res.status(400).json('Email already exists for another user');
        return;
      }

        const user = await User.findByIdAndUpdate(id, updatedUserData); 
        if(!user){
            res.status(404);
            throw new Error(`Can not find any user with ID ${id}`);  
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


//DELETE SINGLE USER DATA
router.delete('/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message:`can not find any product with ID ${id}`}); 
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

module.exports = router;