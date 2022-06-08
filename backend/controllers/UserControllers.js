const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password)
    {
        res.status(400)
        throw new Error('Please add all Fields')
    }

    const checkExistingUser = await User.findOne({email})
    if(checkExistingUser)
    {
        res.status(409)
        throw new Error('Email already Exists. Use a different Email ID')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        name,
        email, 
        password : hashedPassword
    })

    if(newUser)
    {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        })
    }
    else
    {
        res.status(400)
        throw new Error('Something went Wrong')
    }
    
})

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body // get data from request body

    const loggedUser = await User.findOne({email}) // find User from User collection by email

    //const verifiedPassword = await bcrypt.compare(loggedPassword, loggedUser.password) // verify logged password with Hash 

    if(loggedUser && await bcrypt.compare(password, loggedUser.password))
    {
        console.log(loggedUser)
        res.json({
            _id: loggedUser._id,
            name: loggedUser.name,
            email: loggedUser.email,
            token: generateToken(loggedUser._id)
        })
    }
    else
    {
        res.status(400)
        throw new Error('Invalid Credentials')
    }

})

const self = asyncHandler(async (req, res) => {

    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json(req.user)

})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    self
}