$(document).ready(function() {
  // Getting references to our form and inputs
  var firstName = $("input#first-name-input");
  var lastName = $("input#last-name-input");
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      firstName : firstName.val().trim(),
      lastName : lastName.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password, userData.email, userData.password);
    firstName.val("");
    lastName.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password, firstName, lastName) {
    $.post("/api/login", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
