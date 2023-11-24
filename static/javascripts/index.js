function getUnfinishList() {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("/api/todo/unfinished", requestOptions)
    .then(response => response.text())
    .then(result => {
      result = JSON.parse(result)
      let html = ''
      result.forEach(element => {
        html += element?.create_time + '<br>'
        html += element?.due_time + '<br>'
        html += element?.content + '<br>'
        html += element?.status ? '已完成' : '未完成' + '<br>'
      });
      document.getElementById('unfinished').innerHTML = html
    })
    .catch(error => console.log('error', error));
}

function getFinishList() {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("/api/todo/finished", requestOptions)
    .then(response => response.text())
    .then(result => {
      result = JSON.parse(result)
      let html = ''
      result.forEach(element => {
        html += element?.create_time + '<br>'
        html += element?.due_time + '<br>'
        html += element?.content + '<br>'
        html += element?.status ? '已完成' : '未完成' + '<br>'
      });
      document.getElementById('finished').innerHTML = html
    })
    .catch(error => console.log('error', error));
}


function init() {
  getUnfinishList()
  getFinishList()
}

init()
