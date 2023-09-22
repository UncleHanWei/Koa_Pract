const login = () => {
  const user = document.getElementById("user").value
  const password = document.getElementById("password").value
  
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "user": user,
    "password": password
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("/login", requestOptions)
    .then(response => response.text())
    .then(result => location.href = '/' )
    .catch(error => console.log('error', error));
}
