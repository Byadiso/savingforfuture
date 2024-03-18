export const checkMyValue = (user, setError, isRegister) => {
 
  let {email:emailInput, password:passwordInput, firstname, lastname}= user

  if (!emailInput && !passwordInput) {
    setError("Email & Password missing");
    waitThreeSec();  
  } else if (!emailInput) {
    setError("Email is missing");
    waitThreeSec();
  } else if (!passwordInput) {
    setError("Password is missing");
    waitThreeSec();
  } else if (isRegister) {
    if (!firstname) {
      setError("First Name is missing");
    }
    if (!lastname) {
      setError("Last Name is missing");
    }
    if (!lastname && !firstname) {
      setError("Last Name and First Name are missing");
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

export const waitToLoad =(setFunction)=>{
  setTimeout(() => {
    setFunction(false);
  }, 1500); 
}

export  const removePTag =(sentence)=>{ 
 return sentence.replace(/<p>/g, "").replace(/<\/p>/g, "").replace(/&nbsp/g,"");
}


export const ValidateBlog = (blog, setError) => { 
  let {title, body, image}= blog

  if (!title && !body && !image) {
    setError("title & password && image missing");
    waitThreeSec();  
  } else if (!title) {
    setError("title is missing");
    waitThreeSec();
  } else if (!body) {
    setError("body is missing");
    waitThreeSec();
  } else if (image) {
    setError("Image is missing");
  } 

};
