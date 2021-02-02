const mail = require('@sendgrid/mail')
const sgMail = require('@sendgrid/mail')
const { emit } = require('../models/task')
// const sendgridAPIKey = "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"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to: 'ram.prajapat@iitgn.ac.in',
//     from: 'ram.prajapat@iitgn.ac.in',
//     subject: 'Trial of sendgrid',
//     text: 'I hope you become a great software developer'
// })

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ram.prajapat@iitgn.ac.in',
        subject: 'Welcome on task manager app',
        text: `Dear ${name}, Welcome to the task manager`

    })
}

const sendDeleteEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ram.prajapat@iitgn.ac.in',
        subject: 'Thank you for using our application',
        text: `It is painful to see you go ${name}.please provide some helpful feedback`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendDeleteEmail
}