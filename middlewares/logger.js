const logger = (req,res,next) =>{

    if(req.method === "OPTIONS"){
        return next();
    }
    let start =Date.now();
    let ip = req.ip || req.connection.remoteAddress;
    let device = req.headers["user-agent"];

  res.on("finish", () => {
        const timeTaken = Date.now() - start; // response time

    console.log("ip",ip);
    console.log("Method",req.method);
    console.log("URL",req.url);
    console.log("device:",device),
    console.log("Time",new Date().toLocaleString());
    console.log("Response Time",timeTaken + "ms");
    console.log("-------------------------");
});
next();
}

export default logger;