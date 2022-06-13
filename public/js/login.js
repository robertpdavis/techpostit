const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the homepage
      document.location.replace('/');
    } else {
      if (response.status === 400){
        const data = await response.json();
        openModal("Login Error",data.message);
      }else{
        openModal("Server Error","");
      }
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      document.location.replace('/');
    } else {
      if (response.status === 400){
        const data = await response.json();
        openModal("Signup Failed",data.message);
      }else{
        openModal("Server Error","");
      }
    }
  }
};

if (document.querySelector('.login-form')) {
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
}
if (document.querySelector('.signup-form')) {
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
}
