export const checkMyValue = (user, setError, isRegister) => {
 
  let {email:emailInput, password:passwordInput, firstname, lastname}= user

  if (!emailInput && !passwordInput) {
    setError("email & password missing");
    waitThreeSec();  
  } else if (!emailInput) {
    setError("email is missing");
    waitThreeSec();
  } else if (!passwordInput) {
    setError("Password is missing");
    waitThreeSec();
  } else if (isRegister) {
    if (!firstname) {
      setError("firstname is missing");
    }
    if (!lastname) {
      setError("lastname is missing");
    }
    if (!lastname && !firstname) {
      setError("last name and first name are missing");
    }
  }

  if (emailInput && passwordInput) {
    if (validateEmail(emailInput) === true) {
     return true;
    } else {
      setError("Email is not valid");
    }
  }  
};

const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};


const waitThreeSec = ()=>{
  setTimeout(() => {
    console.log("something was wrong");
  }, 3000);  
}
