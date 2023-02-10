const {Router} = require("express")
const express = require('express');
const UserModel = require("../models/users.model");
const axios = require('axios');

const userRouter = Router();


// fetching the data from api and post the data in mongodatabase.

userRouter.post("/",async(req,res)=>{
    try{
        const data = await axios.get("https://randomuser.me/api/?results=50")
        const users = data.data.results
        const userdata = users.map(({ gender, name, email,location:{country},dob:{age},picture:{large} }) => ({ gender, name, email,country,age,large}));
        const coindata = await UserModel.insertMany(userdata)
        res.status(200).send(coindata)
    }catch(e){
        res.status(400).send({message:"failure"})
    }
})

// getting the users data from Database.

userRouter.get("/",async(req,res)=>{
    const {page,age,country,gender} = req.query
    const limit = 10;
    let filter = {};
    if (age) {
        filter["age"] = { $gte: age };
    }
    if (country) {
        filter["country"] = country;
    }
    if (gender) {
        filter["gender"] = gender;
    }
    try{
        const users = await UserModel.find(filter).count()
        const total = users
        const data = await UserModel.find(filter).limit(limit).skip((page - 1) * limit)
        res.status(200).send({total,data})
    }catch(e){
        res.status(400).send({message:"failure"})
    }
})

// deleting the users data from Database.

userRouter.delete("/",async(req,res)=>{
    try{
        const users = await UserModel.deleteMany()
        res.status(200).send(users)
    }catch(e){
        res.status(400).send({message:"failure"})
    }
})

module.exports = userRouter;