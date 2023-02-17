// HOW MIDDLEWARE WORKS

function message(req, res, next) {
  console.log("This message is coming from the middleware meww .");
}

module.exports = { message };
