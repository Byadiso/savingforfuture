export const checkMyValue = (user, setError, isRegister) => {
  let emailInput = user.email;
  let passwordInput = user.password;
  let firstname = user.firstname;
  let lastname = user.lastname;

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
      console.log("Good to login");
    } else {
      setError("Email is not valid");
    }
  }

  
};

const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};
