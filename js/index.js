const unhide=(one) => {
    console.log('helloooo')
    document.getElementById("mobile_nav").classList.add("unhide")
    document.getElementById("mymenu_bar").style.display="none"
    document.getElementById(one).style.filter='blur(3px)'
    
}
const hide=(one)=>{
    document.getElementById("mobile_nav").classList.remove("unhide")
    document.getElementById("mymenu_bar").style.display="block"
    document.getElementById(one).style.filter='blur(0px)'
}

const email_val=(myemail,err)=>{
    const email=document.getElementById(myemail).value
    var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.trim() != ''){
        if(!email.match(validEmail)){
            document.getElementById(err).style.visibility='unset'
            document.getElementById(myemail).style.border='2px solid #6e2424'
            document.getElementById(myemail).style.borderRadius='10px'
            document.getElementById(myemail).dataset.myborder='fail'
            document.getElementById(myemail).dataset.err='error'
        }
        else{
            document.getElementById(myemail).style.borderRadius='0px'
            document.getElementById(myemail).style.border='none';
            document.getElementById(myemail).style.borderBottom=' 1px solid rgba(255, 255, 255, 0.406)';
            document.getElementById(err).style.visibility='hidden'
            document.getElementById(myemail).dataset.myborder='pass'
            document.getElementById(myemail).dataset.err='pass'
        }
    }
    else{
        document.getElementById(myemail).style.borderRadius='0px'
        document.getElementById(myemail).style.border='none';
        document.getElementById(myemail).style.borderBottom=' 1px solid rgba(255, 255, 255, 0.406)';
        document.getElementById(err).style.visibility='hidden'
        document.getElementById(myemail).dataset.myborder='pass'
        document.getElementById(myemail).dataset.err='pass'
    }
}

const msg_val=(err,msg)=>{
    const client_msg=document.getElementById(msg).value;
    if(client_msg.trim() != '' ){
        const mymsg=client_msg.split('')
        if(mymsg.length<3){
           document.getElementById(err).style.visibility='unset'
           document.getElementById(msg).style.border='2px solid #6e2424'
           document.getElementById(msg).style.borderRadius='10px' 
           document.getElementById(msg).dataset.myborder='fail'
           document.getElementById(msg).dataset.err='error'
        }else{
            document.getElementById(err).style.visibility='hidden' 
            document.getElementById(msg).style.borderRadius='0px'
            document.getElementById(msg).style.border='none';
            document.getElementById(msg).style.borderBottom=' 1px solid rgba(255, 255, 255, 0.406)';
            document.getElementById(msg).dataset.err='pass'
        }
    }
    else{
        document.getElementById(err).style.visibility='hidden' 
            document.getElementById(msg).style.borderRadius='0px'
            document.getElementById(msg).style.border='none';
            document.getElementById(msg).style.borderBottom=' 1px solid rgba(255, 255, 255, 0.406)';
            document.getElementById(msg).dataset.err='pass'
    }
}

