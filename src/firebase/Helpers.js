export const checkMyValue = (user, setError, isRegister) => {
 
  let {email:emailInput, password:passwordInput, firsttitle, lasttitle}= user

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
    if (!firsttitle) {
      setError("First title is missing");
    }
    if (!lasttitle) {
      setError("Last title is missing");
    }
    if (!lasttitle && !firsttitle) {
      setError("Last title and First title are missing");
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


export const ValidateTransaction = (transaction, setError) => { 
  let {title, amount}= transaction

  if (!title && !amount ) {
    setError("title & amount missing");
    waitThreeSec();  
  } else if (!title) {
    setError("title is missing");
    waitThreeSec();
  } else if (!amount) {
    setError("amount is missing");
    waitThreeSec();
  } 
};


export function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    year: 'numeric', // numeric, 2-digit
    month: 'long', // numeric, 2-digit, long, short, narrow
    day: 'numeric', // numeric, 2-digit
    hour: '2-digit', // numeric, 2-digit
    minute: '2-digit', // numeric, 2-digit
    second: '2-digit', // numeric, 2-digit
    // timeZoneName: 'short' // short, long
  });
}

