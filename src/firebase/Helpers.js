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

export const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};


export const waitThreeSec = ()=>{
  setTimeout(() => {
    console.log("something was wrong");
  }, 3000);  
}

export  const removePTag =(sentence)=>{
 // Use a regular expression to remove <p> tags
 return sentence.replace(/<p>/g, "").replace(/<\/p>/g, "").replace(/&nbsp/g,"");
}