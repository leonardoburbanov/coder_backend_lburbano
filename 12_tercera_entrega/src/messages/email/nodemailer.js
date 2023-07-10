import nodemailer from "nodemailer";
import { config } from "../../config/config.js";

const adminEmail = config.gmail.adminAccount;
const adminPass = config.gmail.adminPass;
const ecommerceName = config.business.ECOMMERCE_NAME;

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    auth:{
        user: adminEmail,
        pass: adminPass
    },
    secure: false,
    tls:{
        rejectUnauthorized: false
    }
})

const emailTemplate = 
`<div>
<h1>Wellcome!!</h1>
<img src="https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/2x1_SuperMarioHub.jpg" style="width:250px"/>
<p>You can start using our services</p>
<a href="http://localhost:8080/">Explorar</a>
</div>`;

const registerConfirmation = async(to_email)=>{
    let result = await transporter.sendMail({
        from: ecommerceName,
        to: to_email,
        subject: "Successfull registration!",
        html: emailTemplate
    })
    return result
}
export { registerConfirmation }