require('dotenv').config();
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SANDGRID_APIKEY); 
const sendActivityEmail=(email,activity,progress)=>
{
  console.log(email,activity,progress);
sgMail
  .send({
    to: email, // Change to your recipient
    from: 'homestore8907@gmail.com', // Change to your verified sender
    subject: 'Pending Activity',
    text: `Come On!!!! You are only ${100-progress}% away from Completing ${activity}`,
  })
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}
module.exports=sendActivityEmail;