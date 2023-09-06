const express = require('express')
const Joi = require('joi')
const UserSchema = require('../models/Users')

const router = express()

router.post('/sendProposal',async (req,res) => {

    const userData = {
        name: req.body.name,
        phone: req.body.phone || '0000000000',
        email: req.body.email,
        message: req.body.message,
    }
    console.log(userData)

    const isValid = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().min(10).max(10),
        email: Joi.string().email().required(),
        message: Joi.string().required(),
    }).validate(userData)

    if (isValid.error) {
        return res.status(400).send({
            status: 400,
            message: 'Invalid Input',
            data: isValid.error.message
        })
    }

    const newUserMsg = new UserSchema({
        name: req.body.name,
        phone: req.body.phone || null,
        email: req.body.email,
        message: req.body.message
    })

    try {
        await newUserMsg.save()
        res.status(201).send({
            status: 201,
            message: 'Details send successfully!',
            data: newUserMsg
        })
    } catch (error) {
        res.status(400).send({
            status: 400,
            message: 'Error while sending data.',
            data: error
        })
    }
})

module.exports = router