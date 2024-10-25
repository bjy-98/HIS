const idCheckStatus = document.getElementById('idCheckStatus');
const idCheckMsg = document.getElementById('idCheckMsg');
const userFormData = document.getElementById('UserFormData')
const txtPopId = document.getElementById('txtPopId')
const txtPopName = document.getElementById('txtPopName');
const txtPopPwd = document.getElementById('txtPopPwd');
const txtPopMail = document.getElementById('txtPopMail');
const txtPopHandPhone = document.getElementById('txtPopHandPhone');
const txtPopTel = document.getElementById('txtPopTel');
const cmbPopUserAuth = document.getElementById('cmbPopUserAuth');
const zipCode = document.getElementById("zipCode");
const streetAdr = document.getElementById("streetAdr");
const detailAdr = document.getElementById("detailAdr");
const note = document.getElementById("note");
const userTableRest = document.getElementById("userTableRest");
const userTableDelete = document.getElementById("userTableDelete");
const userTableUpdate = document.getElementById("userTableUpdate");
const userTableAdd = document.getElementById("userTableAdd");
const duplicateBtn = document.getElementById("duplicateBtn");
const btnSearch = document.getElementById("btnSearch");
const btnSearchReset = document.getElementById("btnSearchReset");
const userSearchForm = document.getElementById("userSearchForm");

window.onload = function () {
    loadPage(1);
};


function loadPage(pageNumber) {

    axios.get(`/admin_management/paginglist?page=${pageNumber}`) // 적절한 API 엔드포인트를 사용
        .then(response => {
            let members = response.data; // 서버에서 가져온 데이터
            // console.log(members)
            const tbody = document.querySelector('#membersTable tbody');
            // 기존 tbody의 모든 tr 요소 삭제
            tbody.innerHTML = '';
            // members가 배열이 아닐 경우 배열로 변환
            if (!Array.isArray(members)) {
                members = [members];
            }

            members[0].dtoList.forEach(user => {

                const row = document.createElement('tr');
                const roles = user.roles.map(role => role).join(', ');
                row.setAttribute("data-mid", user.mid);
                row.addEventListener('click', function () {
                    const memberId = this.getAttribute('data-mid');  // 클릭한 행의 data-mid 값을 가져옴
                    console.log("Selected member ID:", memberId);
                    // 회원 정보 조회 API 호출 (예시 API)
                    axios.get(`/admin_management/editform/${memberId}`)
                        .then(response => {

                            userFormData.reset();
                            const memberInfo = response.data;
                            // 회원 정보 처리 로직 (예: 모달 창에 정보 표시 등)
                            console.log(memberInfo);
                            txtPopId.value = memberInfo.mid
                            txtPopId.setAttribute("disabled", 'true')
                            duplicateBtn.setAttribute("disabled", 'true')
                            txtPopName.value = memberInfo.name
                            txtPopPwd.value = ''
                            txtPopMail.value = memberInfo.email
                            zipCode.value = memberInfo.zipCode
                            streetAdr.value = memberInfo.address
                            detailAdr.value = memberInfo.detailAddress
                            note.value = memberInfo.note
                            if (memberInfo.tel !== null) {
                                txtPopTel.value = formatPhoneNumber(memberInfo.tel);
                            }
                            if (memberInfo.phone !== null) {
                                txtPopHandPhone.value = formatPhoneNumber(memberInfo.phone);
                            }

                            // cmbPopUserAuth.value = memberInfo.role

                            // 역할 배열과 <select> 옵션 간의 매핑 테이블
                            const roleMap = {
                                "EMP": "0",    // 일반사용자
                                "ADMIN": "1",  // 관리자
                                "DOCTOR": "2", // 의사
                                "NURSE": "3"   // 간호사
                            };


                            // 모든 <option>의 선택을 초기화
                            const options = cmbPopUserAuth.options;
                            for (let i = 0; i < options.length; i++) {
                                options[i].selected = false;  // 모든 옵션 선택 해제
                            }

                            // memberInfo.roleSet 배열을 순회하여 해당하는 옵션을 선택
                            memberInfo.roleSet.forEach(role => {
                                const optionValue = roleMap[role.roleSet];  // role을 매핑 테이블에서 찾아봄
                                if (optionValue !== undefined) {
                                    for (let i = 0; i < options.length; i++) {
                                        if (options[i].value === optionValue) {
                                            options[i].selected = true;  // 해당 옵션을 선택 상태로 설정
                                        }
                                    }
                                }
                            });


                        })
                        .catch(error => {
                            console.error('Error fetching member info:', error);
                        });
                });
                console.log(roles)
                row.innerHTML = `
                        <td>${user.mid}</td>
                        <td>${user.name}</td>
                        <td>${user.phone}</td>
                        <td>${user.email}</td>
                        <td>${roles}</td> <!-- Set이나 배열을 문자열로 변환 -->
                    `;
                tbody.appendChild(row);
                renderPagination(members[0])
            });

        })
        .catch(error => {
            console.error('Error fetching members:', error);
        });

}

function formatPhoneNumber(phoneNumber) {
    // 전화번호가 11자리일 경우, 3-4-4 형식으로 변환
    if (phoneNumber.length === 11) {
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    // 전화번호가 10자리일 경우, 3-3-4 형식으로 변환
    if (phoneNumber.length === 10) {
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    // 기본적으로 원래의 전화번호를 반환
    return phoneNumber;
}


// 페이지네이션을 동적으로 생성하는 함수
function renderPagination(responseDTO) {
    const paginationList = document.getElementById('pagination-list');
    paginationList.innerHTML = '';  // 기존 페이지네이션 초기화

    // "이전" 버튼 추가
    if (responseDTO.prev) {
        const prevItem = document.createElement('li');
        prevItem.classList.add('page-item');
        prevItem.innerHTML = `<a class="page-link" data-num="${members[0].start - 1}" onclick="loadPage(${responseDTO.start - 1})">이전</a>`;
        paginationList.appendChild(prevItem);
    }

    // 중간 페이지 번호들 추가
    for (let i = responseDTO.start; i <= responseDTO.end; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        if (responseDTO.page === i) {
            pageItem.classList.add('active');
        }
        pageItem.innerHTML = `<a class="page-link" data-num="${i}" onclick="loadPage(${i})">${i}</a>`;
        paginationList.appendChild(pageItem);
    }

    // "다음" 버튼 추가
    if (responseDTO.next) {
        const nextItem = document.createElement('li');
        nextItem.classList.add('page-item');
        nextItem.innerHTML = `<a class="page-link" data-num="${responseDTO.end + 1}" onclick="loadPage(${responseDTO.end + 1})">다음</a>`;
        paginationList.appendChild(nextItem);
    }
}


// 저장 버튼 클릭 이벤트
userTableAdd.addEventListener('click', function (event) {
    event.preventDefault(); // 기본 동작 방지

    // 저장할 사용자 데이터 객체 생성
// 저장할 사용자 데이터 객체 생성
    const userDataAdd = {
        // 사용자 입력값 가져오기
        mid: txtPopId.value,
        name: txtPopName.value,
        password: txtPopPwd.value,
        roles: getSelectedRoles(),
        tel: txtPopTel.value,
        phone: txtPopHandPhone.value,
        email: txtPopMail.value,
        address: streetAdr.value,
        detailAddress: detailAdr.value,
        zipCode: zipCode.value,
        note: note.value
    };

    console.log(userDataAdd)
    // 필수 입력값 체크
    if (!userDataAdd.mid || !userDataAdd.password || !userDataAdd.name || !userDataAdd.email) {
        alert('필수 입력값을 확인하세요.');
        return;
    }
    // 서버에 사용자 데이터 전송
    fetch('/admin_management/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDataAdd),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                alert('사용자가 성공적으로 저장되었습니다.');
                window.location.reload();
            } else {
                alert('저장에 실패했습니다. 다시 시도해주세요.');
                console.error('Error:', data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('저장 중 오류가 발생했습니다.');
        });
});

// 다중 선택된 값들을 배열로 가져오는 함수
function getSelectedRoles() {
    const selectedOptions = document.getElementById('cmbPopUserAuth').selectedOptions;
    const roles = [];

    for (let option of selectedOptions) {
        roles.push({roleSet: option.value});  // 선택된 각 값을 배열에 추가
    }

    return roles;
}

userTableUpdate.addEventListener("click", e => {
    e.preventDefault()

    const txtPipIdDisabled = txtPopId.getAttribute("disabled")
    const txtDupBtnDisabled = duplicateBtn.getAttribute("disabled")
    if (!txtPipIdDisabled || !txtDupBtnDisabled) return;
    const userDataUpdate = {
        // 사용자 입력값 가져오기
        mid: txtPopId.value,
        name: txtPopName.value,
        roles: getSelectedRoles(),
        tel: txtPopTel.value,
        phone: txtPopHandPhone.value,
        email: txtPopMail.value,
        address: streetAdr.value,
        detailAddress: detailAdr.value,
        zipCode: zipCode.value,
        note: note.value
    };

    if (txtPopPwd.value) {
        userDataUpdate.password = txtPopPwd.value
    }
    console.log("userDataUpdate:", userDataUpdate)
    // 필수 입력값 체크
    if (!userDataUpdate.mid || !userDataUpdate.name || !userDataUpdate.email) {
        alert('필수 입력값을 확인하세요.');
        return;
    }
    // 서버에 사용자 데이터 전송
    fetch('/admin_management/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDataUpdate),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                alert('사용자가 성공적으로 수정되었습니다.');
                window.location.reload();
            } else {
                alert('수정에 실패했습니다. 다시 시도해주세요.');
                console.error('Error:', data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('수정 중 오류가 발생했습니다.');
        });
})

userTableDelete.addEventListener("click", e => {
    e.preventDefault()

    const userDataDelete = {
        // 사용자 입력값 가져오기
        mid: txtPopId.value,
        name: txtPopName.value,
        roles: getSelectedRoles(),
        tel: txtPopTel.value,
        phone: txtPopHandPhone.value,
        email: txtPopMail.value,
    };
    console.log("userDataDelete:", userDataDelete)
    // 필수 입력값 체크
    if (!userDataDelete.mid) {
        alert('필수 입력값을 확인하세요.');
        return;
    }
    // 서버에 사용자 데이터 전송
    fetch('/admin_management/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDataDelete),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                alert('사용자가 성공적으로 삭제되었습니다.');
                window.location.reload();
            } else {
                alert('삭제에 실패했습니다. 다시 시도해주세요.');
                console.error('Error:', data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('삭제 중 오류가 발생했습니다.');
        });
})

//
// document.getElementById("btnDelete").addEventListener("click", function () {
//     const userId = this.getAttribute("data-id");
//
//     if (confirm("정말 삭제하시겠습니까?")) {
//         fetch(`/delete/${userId}`, {
//             method: 'POST', // DELETE로 하려면 method: 'DELETE' 사용
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRF-TOKEN': document.querySelector('input[name="_csrf"]').value // CSRF 보호
//             }
//         })
//             .then(response => {
//                 if (response.ok) {
//                     alert("삭제되었습니다.");
//                     window.location.href = "/users"; // 삭제 후 리다이렉트
//                 } else {
//                     alert("삭제에 실패했습니다.");
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     }
// });

btnSearch.addEventListener("click", function () {
    // 입력된 검색 조건을 가져옴
    const userId = document.getElementById("txtSearchId").value;
    const userName = document.getElementById("txtSearchName").value;
    const email = document.getElementById("txtSearchEmail").value;
    const userRole = document.getElementById("cmbSearchAuth").selected;

    let searchType = '';
    let keyword = '';

    if (userId) {
        searchType += 'm'
        keyword = userId
    }
    if (userName) {
        searchType += 'n'
        keyword = userName
    }
    if (email) {
        searchType += 'e'
        keyword = email
    }
    if (userRole) {
        searchType += 'r'
        keyword = userRole.selected
    }


    console.log(searchType)

    // 검색 조건을 객체로 만들기
    const searchParams = {

        page: 1,
        size: 10,
        type: searchType,
        keyword: keyword
    };

    console.log(searchParams)


    axios.get(`/admin_management/paginglist?page=1`, {
        params: searchParams,
    }) // 적절한 API 엔드포인트를 사용
        .then(response => {
            let members = response.data; // 서버에서 가져온 데이터
            console.log(members)
            const tbody = document.querySelector('#membersTable tbody');
            // 기존 tbody의 모든 tr 요소 삭제
            tbody.innerHTML = '';
            // members가 배열이 아닐 경우 배열로 변환
            if (!Array.isArray(members)) {
                members = [members];
            }

            members[0].dtoList.forEach(user => {

                const row = document.createElement('tr');
                const roles = user.roles.map(role => role).join(', ');
                row.setAttribute("data-mid", user.mid);
                row.addEventListener('click', function () {
                    const memberId = this.getAttribute('data-mid');  // 클릭한 행의 data-mid 값을 가져옴
                    console.log("Selected member ID:", memberId);
                    // 회원 정보 조회 API 호출 (예시 API)
                    axios.get(`/admin_management/editform/${memberId}`)
                        .then(response => {

                            userFormData.reset();
                            const memberInfo = response.data;
                            // 회원 정보 처리 로직 (예: 모달 창에 정보 표시 등)
                            console.log(memberInfo);
                            txtPopId.value = memberInfo.mid
                            txtPopId.setAttribute("disabled", 'true')
                            duplicateBtn.setAttribute("disabled", 'true')
                            txtPopName.value = memberInfo.name
                            txtPopPwd.value = ''
                            txtPopMail.value = memberInfo.email
                            zipCode.value = memberInfo.zipCode
                            streetAdr.value = memberInfo.address
                            detailAdr.value = memberInfo.detailAddress
                            note.value = memberInfo.note
                            if (memberInfo.tel !== null) {
                                txtPopTel.value = formatPhoneNumber(memberInfo.tel);
                            }
                            if (memberInfo.phone !== null) {
                                txtPopHandPhone.value = formatPhoneNumber(memberInfo.phone);
                            }

                            // cmbPopUserAuth.value = memberInfo.role

                            // 역할 배열과 <select> 옵션 간의 매핑 테이블
                            const roleMap = {
                                "EMP": "0",    // 일반사용자
                                "ADMIN": "1",  // 관리자
                                "DOCTOR": "2", // 의사
                                "NURSE": "3"   // 간호사
                            };


                            // 모든 <option>의 선택을 초기화
                            const options = cmbPopUserAuth.options;
                            for (let i = 0; i < options.length; i++) {
                                options[i].selected = false;  // 모든 옵션 선택 해제
                            }

                            // memberInfo.roleSet 배열을 순회하여 해당하는 옵션을 선택
                            memberInfo.roleSet.forEach(role => {
                                const optionValue = roleMap[role.roleSet];  // role을 매핑 테이블에서 찾아봄
                                if (optionValue !== undefined) {
                                    for (let i = 0; i < options.length; i++) {
                                        if (options[i].value === optionValue) {
                                            options[i].selected = true;  // 해당 옵션을 선택 상태로 설정
                                        }
                                    }
                                }
                            });


                        })
                        .catch(error => {
                            console.error('Error fetching member info:', error);
                        });
                });
                console.log(roles)
                row.innerHTML = `
                        <td>${user.mid}</td>
                        <td>${user.name}</td>
                        <td>${user.phone}</td>
                        <td>${user.email}</td>
                        <td>${roles}</td> <!-- Set이나 배열을 문자열로 변환 -->
                    `;
                tbody.appendChild(row);
                renderPagination(members[0])
            });

        })
        .catch(error => {
            console.error('Error fetching members:', error);
        });


});

function tableRandering(data) {
    const tbody = document.querySelector('#membersTable tbody');
    // 기존 tbody의 모든 tr 요소 삭제
    tbody.innerHTML = '';
    // members가 배열이 아닐 경우 배열로 변환
    if (!Array.isArray(data)) {
        data = [data];
    }

    data.forEach(user => {
        const row = document.createElement('tr');
        const roles = user.roleSet.map(role => role).join(', ');
        row.setAttribute("data-mid", user.mid);
        row.addEventListener('click', function () {
            const memberId = this.getAttribute('data-mid');  // 클릭한 행의 data-mid 값을 가져옴
            console.log("Selected member ID:", memberId);
            // 회원 정보 조회 API 호출 (예시 API)
            axios.get(`/admin_management/editform/${memberId}`)
                .then(response => {

                    userFormData.reset();
                    const memberInfo = response.data;
                    // 회원 정보 처리 로직 (예: 모달 창에 정보 표시 등)
                    console.log(memberInfo);
                    txtPopId.value = memberInfo.mid
                    txtPopId.setAttribute("disabled", 'true')
                    duplicateBtn.setAttribute("disabled", 'true')
                    txtPopName.value = memberInfo.name
                    txtPopPwd.value = ''
                    txtPopMail.value = memberInfo.email
                    zipCode.value = memberInfo.zipCode
                    streetAdr.value = memberInfo.address
                    detailAdr.value = memberInfo.detailAddress
                    note.value = memberInfo.note
                    if (memberInfo.tel !== null) {
                        txtPopTel.value = formatPhoneNumber(memberInfo.tel);
                    }
                    if (memberInfo.phone !== null) {
                        txtPopHandPhone.value = formatPhoneNumber(memberInfo.phone);
                    }

                    // cmbPopUserAuth.value = memberInfo.role

                    // 역할 배열과 <select> 옵션 간의 매핑 테이블
                    const roleMap = {
                        "EMP": "0",    // 일반사용자
                        "ADMIN": "1",  // 관리자
                        "DOCTOR": "2", // 의사
                        "NURSE": "3"   // 간호사
                    };


                    // 모든 <option>의 선택을 초기화
                    const options = cmbPopUserAuth.options;
                    for (let i = 0; i < options.length; i++) {
                        options[i].selected = false;  // 모든 옵션 선택 해제
                    }

                    // memberInfo.roleSet 배열을 순회하여 해당하는 옵션을 선택
                    memberInfo.roleSet.forEach(role => {
                        const optionValue = roleMap[role.roleSet];  // role을 매핑 테이블에서 찾아봄
                        if (optionValue !== undefined) {
                            for (let i = 0; i < options.length; i++) {
                                if (options[i].value === optionValue) {
                                    options[i].selected = true;  // 해당 옵션을 선택 상태로 설정
                                }
                            }
                        }
                    });


                })
                .catch(error => {
                    console.error('Error fetching member info:', error);
                });
        });
        console.log(roles)
        row.innerHTML = `
                        <td>${user.mid}</td>
                        <td>${user.name}</td>
                        <td>${user.phone}</td>
                        <td>${user.email}</td>
                        <td>${roles}</td> <!-- Set이나 배열을 문자열로 변환 -->
                    `;
        tbody.appendChild(row);
        renderPagination(data)
    });
}

function updateUserTable(users) {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = ""; // 기존 데이터 삭제

    // 새로운 사용자 리스트 추가
    users.forEach(user => {
        const row = document.createElement("tr");

        row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.password}</td>
            `;
        tbody.appendChild(row);
    });
}

function saveNote() {
    const note = document.getElementById('note').value;
    if (note) {
        const savedNotesDiv = document.getElementById('savedNotes');
        const noteElement = document.createElement('div');
        noteElement.textContent = note;
        savedNotesDiv.appendChild(noteElement);
        document.getElementById('note').value = ''; // 입력창 비우기
    } else {
        alert('메모를 입력해주세요.');
    }
}

function addUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;

    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    const newRow = userTable.insertRow();
    newRow.innerHTML = `<td>${userTable.rows.length}</td><td>${name}</td><td>${email}</td><td>${role}</td><td><button onclick="editUser(${userTable.rows.length - 1})">수정</button> <button onclick="deleteUser(this)">삭제</button></td>`;

    document.getElementById('addUserForm').reset(); // 폼 초기화
}

function editUser(rowIndex) {
    // 수정 기능을 구현하는 코드
}

function deleteUser(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function searchUser() {
    const input = document.getElementById('search').value.toLowerCase();
    const table = document.getElementById('userTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let match = false;

        for (let j = 0; j < cells.length - 1; j++) {
            if (cells[j].textContent.toLowerCase().indexOf(input) > -1) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? "" : "none";
    }
}


function userUpdateSetForm() {
    document.getElementById("btnSearch").addEventListener("click", function () {
        // 검색 조건을 가져옴
        const userId = document.getElementById("txtId").value;
        const userName = document.getElementById("txtName").value;
        const userEmail = document.getElementById("txtPopMail")
        const userRetirement = document.getElementById("txtRetirement")
        const userPhone = document.getElementById("txtPhone")
        const userSocial = document.getElementById("txtSocial")

        const userRole = document.getElementById("cmbAuth").value;
        const startDate = document.getElementById("transactionStartDate").value;

        // 검색 조건을 객체로 만들기
        const searchParams = {
            id: userId,
            name: userName,
            role: userRole,
            startDate: startDate
        };

        // AJAX 요청을 통해 서버로 검색 조건을 전송
        fetch("/searchUsers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(searchParams)
        })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    // 검색된 사용자가 있으면 첫 번째 사용자 정보를 수정 폼에 표시
                    const user = data[0];  // 예를 들어 첫 번째 사용자 선택

                    // 사용자 정보를 수정 창에 채우기
                    document.getElementById("txtPopId").value = user.id;
                    document.getElementById("txtPopPwd").value = "";  // 비밀번호는 보안상 빈칸으로 둠
                    document.getElementById("cmbPopUserAuth").value = user.role;
                    document.getElementById("txtPopName").value = user.username;
                    document.getElementById("txtPopTel").value = user.phone || "";  // 전화번호
                    document.getElementById("txtPopMail").value = user.email;
                    document.getElementById("txtPop").value = user.address || "";  // 주소
                    document.getElementById("note").value = user.note || "";  // 특이사항
                } else {
                    alert("검색된 사용자가 없습니다.");
                }
            })
            .catch(error => console.error('Error:', error));
    });

}

function sample4_execDaumPostcode() {

    new daum.Postcode({
        oncomplete: function (data) {
            // 우편번호
            console.log(data.zonecode)
            zipCode.value = data.zonecode;
            // 도로명 및 지번주소
            streetAdr.value = data.roadAddress;
        }
    }).open();
}

function addrCheck() {
    if (zipCode.value == '' && streetAdr.value == '') {
        alert("우편번호를 클릭하여 주소를 검색해주세요.");
        zipCode.focus();
    }
}


function checkDuplicateId() {
    const memberId = txtPopId.value;

    // 입력된 아이디가 없으면 메시지 숨김
    if (!memberId) {
        idCheckMsg.textContent = '';
        return;
    }

    // 서버로 중복 체크 요청
    axios.get(`/admin_management/checkId`, {
        params: {mid: memberId}
    })
        .then(response => {
            if (response.data) {
                // 중복 아이디가 존재할 경우
                idCheckMsg.textContent = '이미 존재하는 아이디입니다.';
                idCheckMsg.style.color = 'red';
                idCheckStatus.checked = false;

            } else {
                // 중복되지 않는 아이디일 경우
                idCheckMsg.textContent = '사용 가능한 아이디입니다.';
                idCheckMsg.style.color = 'green';
                idCheckStatus.checked = true;
            }
        })
        .catch(error => {
            console.error('Error checking ID:', error);
            idCheckMsg.textContent = '중복 체크 중 오류가 발생했습니다.';
            idCheckMsg.style.color = 'red';
            idCheckStatus.checked = false;
        });
}

userTableRest.addEventListener("click", (e) => {
    txtPopId.removeAttribute('disabled')
    duplicateBtn.removeAttribute('disabled')
    userFormData.reset();
    idCheckMsg.innerText = ''
    idCheckStatus.checked = false;

})

txtPopId.addEventListener("focusin", (e) => {
    idCheckMsg.innerText = ''
    idCheckStatus.checked = false;
})

btnSearchReset.addEventListener("click", e=>{

    userSearchForm.reset()

})