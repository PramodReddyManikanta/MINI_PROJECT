const isLogin = async(req, res, next)=>{
    
    try {

        if(req.session.user){}
        else{
            
            console.log('login first');
            res.send('/login.html');
        }
        next();
    } catch (error){
        console.log(error.message);
    }

}

const isLogout = async(req, res, next)=>{''
    
    try {

        if(req.session.user){
            res.redirect('/');
        }
        next();
    } catch (error){
        console.log(erroe.message);
    }

}

module.exports = {
    isLogin,
    isLogout
}

