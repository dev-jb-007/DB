const auth=async (req,res,next)=>{
    try{
        console.log('Docter');
        if(req.user.isDocter)
        {
            next();
        }
        else{
            throw new Error();
        }
    }
    catch(err)
    {
        res.status(401).send({error:'You are not a docter'})
    }
}
module.exports=auth;