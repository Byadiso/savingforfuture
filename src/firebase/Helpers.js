export const checkMyValue = (user, setError) => {
    let emailInput = user.email;
    let passwordInput = user.password;

    if (!emailInput && !passwordInput) {
      setError("email & password missing");
      setTimeout(() => {
        console.log("something was wrong");
      }, 3000);
      // console.log("first add something");
    } else if (!emailInput) {
      setError("email is missing");

      setTimeout(() => {
        console.log("something was wrong");
      }, 3000);
    } else if (!passwordInput) {
      setError("Password is missing");

      setTimeout(() => {
        console.log("something was wrong");
      }, 3000);
    }

    if (emailInput && passwordInput) {
        if(validateEmail(emailInput) === true){
            console.log("Good to login");
        }
        else{
            setError("Email is not valid");
        }
        
      
    }
  };


  const  validateEmail = (email)=>{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }