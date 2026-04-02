import nodeCron from "node-cron";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"omeshwarreddyk@gmail.com",
        pass:"lunj qesk ndso ykbs"
    }
});
const task = () => {
    const sentmail = {
    from : "omeshwarreddyk@gmail.com",
    to:"devilcrown677@gmail.com",
    subject:"Testing Mail",
    text:"Advance happy returns of the day"
};


transporter.sendMail(sentmail,function(error,info){
    if(error){
        console.log("error:",error)
    }else{
        console.log("Email sent:",info.response)
    }
});
}


nodeCron.schedule("1 00 15 * * *",task)

export default task;