import twilio from 'twilio';

const TWILIO_ACCOUNT_SID = ""
const TWILIO_AUTH_TOKEN = ""
const TWILIO_SMS_NUMBER = ""
const TEST_NUMBER = "+593991085783"

const client = twilio(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN);

const sendMessage = async(message,from_number,to_number) =>{
    let result = await client.message.create({
        body: message,
        from: from_number,
        to: to_number
    })
    return result
}
