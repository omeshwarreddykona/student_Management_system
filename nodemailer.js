import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"omeshwarreddyk@gmail.com",
        pass:"lunj qesk ndso ykbs"
    }
});


const sentmail = {
    from : "omeshwarreddyk@gmail.com",
    to:"swathi153453@gmail.com",
    subject:"Testing Mail",
    text:"My Name is Kona Omeshwar Reddy"
};


transporter.sendMail(sentmail,function(error,info){
    if(error){
        console.log("error:",error)
    }else{
        console.log("Email sent:",info.response)
    }
});

export default transporter;