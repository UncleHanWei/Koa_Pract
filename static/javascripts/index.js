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
        html += `建立時間: ${new Date(element?.create_time)}<br>`
        html += `到期時間: ${new Date(element?.due_time)}<br>`
        html += `事項內容: ${element?.content}<br>`
        html += `完成狀態: ${element?.status ? '已完成' : '未完成'}<br><hr>`
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
        html += `建立時間: ${new Date(element?.create_time)}<br>`
        html += `到期時間: ${new Date(element?.due_time)}<br>`
        html += `事項內容: ${element?.content}<br>`
        html += `完成狀態: ${element?.status ? '已完成' : '未完成'}<br><hr>`
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
