import twilio from 'twilio';

const TWILIO_ACCOUNT_SID = "ACb5b3217f973c420b479af2a74be56b2e"
const TWILIO_AUTH_TOKEN = "b5e42e052dccb3e0314b310e68c4c95d"
const TWILIO_SMS_NUMBER = "+15418593342"
const TEST_NUMBER = "+593991085783"

const client = twilio(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN);

const sendMessage = async(message) =>{
    let result = await client.message.create({
        body: message,
        from: TWILIO_SMS_NUMBER,
        to: TEST_NUMBER
    })
    return result
}


export { sendMessage }