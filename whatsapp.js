import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;
import qrcode from "qrcode-terminal";
import nodeCron from "node-cron";

const client = new Client({
    authStrategy: new LocalAuth({ clientId: "whatsapp-client" })
});



client.on("qr",(qr) =>{
    console.log("qr recieved")
    qrcode.generate(qr,{small:true})
});

client.on("ready", () =>{
    console.log("ready","whatsapp connected")


nodeCron.schedule("* * * * 2",async() =>{
     try {
            await client.sendMessage("91@c.us", "Hi Navya Akka");
            console.log("Message sent");
        } catch (err) {
            console.error("Error sending message:", err);
        }
});
});

client.on("auth_failure",(msg) =>{
    console.log("auth failure",msg)
})

client.initialize();


export default client;