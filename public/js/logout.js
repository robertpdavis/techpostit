const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  //Logout and redirect to homepage
  if (response.ok) {
    document.location.replace('/');
  } else {
    if (response.status === 400){
      openModal("Logout Failed");
    }else{
      openModal("Server Error","");
    }
  }
};

document.querySelector('#logout').addEventListener('click', logout);
