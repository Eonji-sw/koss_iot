// 사용자 이름 눌렀을 때 댓글 로딩
document.querySelectorAll('#user-list tr').forEach((el) => {
    el.addEventListener('click', function () {
      const id = el.querySelector('td').textContent;
      getComment(id);
    });
  });
  // 사용자 로딩
  async function getUser() {
    try {
      const res = await axios.get('/contacts');
      const users = res.data;
      console.log(users);
      const tbody = document.querySelector('#user-list tbody');
      tbody.innerHTML = '';
      users.map(function (user) {
        const row = document.createElement('tr');
        row.addEventListener('click', () => {
          getComment(user._id);
        });
        // 로우 셀 추가
        let td = document.createElement('td');
        td.textContent = user.name;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.email;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.phone;
        row.appendChild(td);
        tbody.appendChild(row);
        const edit = document.createElement('button');
        edit.textContent = 'Edit';
        edit.addEventListener('click', async () => { // 수정 클릭 시
          const newComment = prompt('바꿀 내용을 입력하세요');
          if (!newComment) {
            return alert('내용을 반드시 입력하셔야 합니다');
          }
        });
        const remove = document.createElement('button');
        remove.textContent = 'Delete';
        remove.addEventListener('click', async () => { // 삭제 클릭 시
          try {
            await axios.delete(`/contacts/${username}`);
            getComment(id);
          } catch (err) {
            console.error(err);
          }
        });
        // 버튼 추가
        td = document.createElement('td');
        td.appendChild(edit);
        row.appendChild(td);
        td = document.createElement('td');
        td.appendChild(remove);
        row.appendChild(td);
        tbody.appendChild(row);
      });
    } catch (err) {
      console.error(err);
    }
  }
  // 사용자 등록 시
  document.getElementById('user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    if (!name) {
      return alert('이름을 입력하세요');
    }
    if (!phone) {
      return alert('번호를 입력하세요');
    }
    try {
      await axios.post('/contacts', { name, email, phone });
      getUser();
    } catch (err) {
      console.error(err);
    }
    e.target.username.value = '';
    e.target.email.value = '';
    e.target.phone.value = '';
  });
