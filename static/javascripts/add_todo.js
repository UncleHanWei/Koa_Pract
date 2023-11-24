function addTODO() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const dueTime = document.getElementById("due_time").value;
  const content = document.getElementById("content").value;


  var raw = JSON.stringify({
    "due_time": dueTime,
    "content": content
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("/api/todo/item", requestOptions)
    .then(response => response.text())
    .then(result => alert("新增成功"))
    .catch(error => {
      alert("新增失敗")
      console.log('error', error)
    });
}
