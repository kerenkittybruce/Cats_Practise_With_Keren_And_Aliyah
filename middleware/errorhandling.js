function errorHandling(err, req, res, next) {
  if (err) {
    const status = err.status || 500;
    res.status(status).json({
      status: status,
      err: "Oops! An error occured . Please try again later .",
    });
  }
  next(); // take the user to the next directory ---- built-in structure
}

module.exports = { errorHandling }; // export errorHandling functionality

///////////////////////////////////////////////////////////////////////////////////////////

// EXAMPLE OF MIDDLEWARE

// LOGIN WITH WRONG PASSWORD

// If you logged in with the wrong password, the site will send you to the login page again

// EXAMPLE FUNCTION SYNTAX

// function function_name (err, req, res, next){};
// next();
// module.exports = {function_name};
