const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();

  if (response.ok) {
    document.location.replace('/');
  } else {
    if (response.status === 400){
      openModal("Logout Failed",data.message);
    }else{
      openModal("Server Error","");
    }
  }
};

document.querySelector('#logout').addEventListener('click', logout);
