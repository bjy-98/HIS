// 이벤트 리스너 등록
window.addEventListener('sessionStorageChanged', (event) => {
    console.log('sessionStorage 값이 변경되었습니다:', event.detail.key, event.detail.value);
    patientInfos = JSON.parse(sessionStorage.getItem('selectedPatient'));

    sessionCallData(patientInfos);
});

patientInfos = JSON.parse(sessionStorage.getItem('selectedPatient'));
sessionCallData(patientInfos);

function sessionCallData(responseData) {
    const nameElement = document.getElementById('departmentInput');
    const chartNumberElement = document.getElementById('chart-numberInput');
    const reservationDateElement = document.getElementById('reservation-date');  // 예약 날짜 필드

    // 'reservation-date' input의 value를 오늘 날짜로 설정
    reservationDateElement.value = selectedDate ? selectedDate : new Date().toISOString().split('T')[0];

    // 받아온 데이터로 데이터 새로 등록
    // 환자 이름
    nameElement.value = responseData.name;
    // 차트 번호
    chartNumberElement.value = responseData.chartNum;
}

// 드롭다운 메뉴 초기화
reservationTimes.forEach((time, index) => {
    const test_time = document.getElementById('test_time');
    const option = document.createElement('option');
    option.value = time;
    option.textContent = time;

    // 첫 번째 옵션을 기본값으로 설정
    if (index === 0) {
        option.selected = true;
    }

    test_time.appendChild(option);
});


// 페이지가 로드될 때 자동으로 현재 날짜를 받아오는 코드
document.addEventListener('DOMContentLoaded', function () {
    const today = new Date().toISOString().split('T')[0]; // 현재 날짜를 YYYY-MM-DD 형식으로
    dateReservationList(today); // 오늘 날짜를 전달하여 예약 목록을 자동으로 불러오기
});

// 날짜를 클릭했을 때 호출되는 함수
function dateReservationList(selectedDate) {
    console.log(selectedDate);
    fetch('reservation/selectedDatePatientList', {
        method: 'POST', // POST 요청
        headers: {
            'Content-Type': 'application/json' // JSON 형식으로 데이터 전송
        },
        body: JSON.stringify({
            reservationDate: selectedDate
        }) // JSON 객체로 전송
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('네트워크 응답이 실패했습니다.');
            }
            return response.json(); // JSON 데이터로 변환
        })
        .then(data => {
            const tableBody = document.querySelector('#reservationTableList');
            tableBody.innerHTML = ''; // 기존 내용 제거

            // 데이터 정렬 (예약 시간 기준으로)
            data.sort((a, b) => new Date(a.reservationDate) - new Date(b.reservationDate));

            data.forEach(item => {
                const time = new Date(item.reservationDate).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                });
                const row = document.createElement('tr');
                row.id = 'reservationTableListParent';
                row.innerHTML =
                    `<td>${time}</td>
             <td>${item.name}</td>
             <td>${item.patientNote}</td>
            `;
                row.onclick = function () {
                    if(PageName === 'registerAdd'){
                        selectList(item.seq);
                    }
                };
                tableBody.appendChild(row); // tbody에 행 추가
            });
        })
        .catch(error => {
            console.error('에러 발생:', error);
        });
}


// 예약 목록에서 환자 정보를 눌렀을때 데이터 받아온 뒤 수정 가능한 화면 만들기
function selectList(indexNumber) {
    // 보낼 데이터 객체로 변환
    const data = {
        seq: indexNumber
    };

    // 서버로 객체 전송
    fetch('reservation/selectedByReservation', {
        method: 'POST', // POST 요청
        headers: {
            'Content-Type': 'application/json' // JSON 형식으로 데이터 전송
        },
        body: JSON.stringify(data) // JSON 객체로 전송
    })
        .then(response => response.json()) // 응답을 JSON으로 변환
        .then(responseData => {
            rReset();
            SelectData(responseData);
        })
        .catch(error => {
            console.error('에러 발생:', error); // 에러 처리
        });
}



function rReset(reset) {

    if (reset) {
        const IndexElement = document.getElementById('index-number');
        IndexElement.innerHTML = '';
    }

    const reservationDateElement = document.getElementById('reservation-date');
    reservationDateElement.value = '';

    const reservationTimeElement = document.getElementById('test_time');
    reservationTimeElement.selectedIndex = '9:00';

    // 환자이름
    const nameElement = document.getElementById('departmentInput');
    nameElement.value = '';

    // 예약 종류 - 환자 예약
    const snsNotificationElement = document.getElementById('sns-notification');
    snsNotificationElement.checked = false;

    // 차트번호
    const chartNumberElement = document.getElementById('chart-numberInput');
    chartNumberElement.value = '';

    const doctorElement = document.getElementById('doctor');
    doctorElement.selectedIndex = 0;

    const treatmentTypeElement = document.getElementById('treatment-type');
    treatmentTypeElement.selectedIndex = 0;

    // 노트
    const patientNoteElement = document.getElementById('patient-note');
    patientNoteElement.value = '';

    const taggedWordsDiv = document.getElementById('taggedWords');
    taggedWordsDiv.innerHTML = '';

    // 예약 미이행 - c/A
    const reservationStatusCaElement = document.getElementById('reservation-status-ca');
    reservationStatusCaElement.checked = false;

    // 예약 미이행 - B/A
    const reservationStatusBaElement = document.getElementById('reservation-status-ba');
    reservationStatusBaElement.checked = false;

    // 예약 미이행 없음
    const reservationStatusElement = document.getElementById('reservation-status-none');
    reservationStatusElement.checked = false;

    // 인덱스
    const indexNumberElement = document.getElementById('index-number');
    indexNumberElement.value = '';

}


function SelectData(responseData) {
    const reservationDateElement = document.getElementById('reservation-date');
    const reservationTimeElement = document.getElementById('test_time'); // 예약시간 요소 추가
    const nameElement = document.getElementById('departmentInput');
    const snsNotificationElement = document.getElementById('sns-notification');
    const chartNumberElement = document.getElementById('chart-numberInput');
    const doctorElement = document.getElementById('doctor');
    const treatmentTypeElement = document.getElementById('treatment-type');
    const patientNoteElement = document.getElementById('patient-note');
    const reservationStatusCaElement = document.getElementById('reservation-status-ca');
    const reservationStatusBaElement = document.getElementById('reservation-status-ba');
    const reservationStatusElement = document.getElementById('reservation-status-none');
    const indexNumberElement = document.getElementById('index-number');
    const taggedWordsDiv = document.getElementById('taggedWords');


    // 받아온 데이터로 데이터 새로 등록

    if (responseData.length > 0) {
        // 예약 날짜와 시간 분리하여 설정
        const combinedDateTime = responseData[0].reservationDate.split('T'); // 공백으로 분리
        reservationDateElement.value = combinedDateTime[0]; // 날짜
        reservationTimeElement.value = combinedDateTime[1]; // 시간

        // 환자 이름
        nameElement.value = responseData[0].name;

        // SMS 발송
        snsNotificationElement.checked = responseData[0].snsNotification === "true";

        // 차트 번호
        chartNumberElement.value = responseData[0].chartNumber;

        // 의사 값 설정
        doctorElement.value = responseData[0].doctor;

        // 치료 유형 값 설정
        treatmentTypeElement.value = responseData[0].treatmentType;

        // 노트
        patientNoteElement.value = responseData[0].patientNote;

        // 예약 미이행 체크 설정
        if (responseData[0].reservationStatusCheck === "ca") {
            reservationStatusCaElement.checked = true;
        } else if (responseData[0].reservationStatusCheck === "ba") {
            reservationStatusBaElement.checked = true;
        } else if (responseData[0].reservationStatusCheck === "없음") {
            reservationStatusElement.checked = true;
        }

        // 인덱스 번호
        indexNumberElement.innerHTML = responseData[0].seq;
        console.log(responseData);
    }
}


function saveUpdate() {
    // 권한 체크
    const hasPermission = globalUserData.authorities.some(auth =>
        auth.authority === 'ROLE_DOCTOR' || auth.authority === 'ROLE_NURSE'
    );

    if (!hasPermission) {
        alert("권한이 없습니다. 의사 또는 간호사만 환자를 등록할 수 있습니다.");
        return; // 등록 과정 중단
    }

    // 예약일자 및 예약시간
    const reservationDate = document.getElementById('reservation-date').value;
    const reservationTime = document.getElementById('test_time').value;
    const timeParts = reservationTime.split(':');
    const hour = timeParts[0].padStart(2, '0');
    const minute = timeParts[1] || '00';

    const formattedDateTime = `${reservationDate}T${hour}:${minute}`;

    // 환자 이름
    const name = document.getElementById('departmentInput').value;

    // SMS 발송 허용 여부
    const snsNotification = document.getElementById('sns-notification').checked ? "true" : "false";

    // 차트 번호
    const chartNumber = document.getElementById('chart-numberInput').value;

    // 의사
    const doctor = document.getElementById('doctor').value;

    // 치료 유형
    const treatmentType = document.getElementById('treatment-type').value;

    if (!name || !chartNumber || !doctor || !treatmentType) {
        alert("부서, 차트 번호, 의사, 치료 유형을 모두 입력해 주세요.");
        return; // 빈값이 있으면 중지
    }

    // 환자 노트
    const patientNote = document.getElementById('patient-note').value;

    // 예약 미이행
    let reservationStatusCheck = "";
    if (document.getElementById('reservation-status-ca').checked) {
        reservationStatusCheck = "ca";
    } else if (document.getElementById('reservation-status-ba').checked) {
        reservationStatusCheck = "ba";
    } else if (document.getElementById('reservation-status-none').checked) {
        reservationStatusCheck = "없음";
    } else {
        alert("예약 미이행 상태를 선택해 주세요.");
        return; // 빈값이 있으면 중지
    }

    const indexNumber = document.getElementById('index-number').innerHTML.trim();

    // 보낼 데이터 객체로 변환
    const reservation_data = {
        reservationDate: formattedDateTime,
        name: name,
        snsNotification: snsNotification,
        chartNumber: chartNumber,
        doctor: doctor,
        treatmentType: treatmentType,
        patientNote: patientNote,
        reservationStatusCheck: reservationStatusCheck
    };

    fetch('reservation/selectedReservation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservation_data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('중복 확인 요청 실패');
            }
            return response.json();
        })
        .then(reservations => {
            if (reservations.length === 0 || indexNumber) {
                // 예약이 없거나 seq가 같은 경우: 새로 등록 또는 수정
                if (indexNumber) {
                    reservation_data.seq = indexNumber;
                    fetch('reservation/updateReservationInformation', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(reservation_data)
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('수정 실패');
                            }
                            const dateOnly = new Date(formattedDateTime).toLocaleDateString('en-CA');
                            dateReservationList(dateOnly);

                            alert("성공적으로 수정되었습니다.");
                            rReset(true);
                        })
                        .catch(error => {
                            console.error('실패:', error);
                        });
                } else {
                    // 예약이 없고 seq가 없는 경우에만 새 예약 등록
                    fetch('reservation/insertReservationInformation', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(reservation_data)
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(reservations => {
                            const indexNumberElement = document.getElementById('index-number');
                            reservations.forEach(res => {
                                const dateOnly = new Date(formattedDateTime).toLocaleDateString('en-CA');
                                dateReservationList(dateOnly);
                                indexNumberElement.innerHTML = res.seq;
                            });
                            alert("성공적으로 등록되었습니다.");
                            rReset(true);
                        })
                        .catch(error => {
                            console.error('실패:', error);
                        });
                }
            } else {
                alert("중복된 예약이 존재합니다.");
            }
        })
        .catch(error => {
            console.error('오류 발생:', error);
        });
}




function deleteReservation() {
    // 권한 체크를 직접 수행합니다.
    const hasPermission = globalUserData.authorities.some(auth =>
        auth.authority === 'ROLE_DOCTOR' || auth.authority === 'ROLE_NURSE'
    );

    // 권한이 없으면 경고 메시지를 표시하고 등록 과정을 중단합니다.
    if (!hasPermission) {
        alert("권한이 없습니다. 의사 또는 간호사만 환자를 등록할 수 있습니다.");
        return; // 등록 과정 중단
    }

    const indexNumber = document.getElementById('index-number').innerHTML.trim();
    const reservationDate = document.getElementById('reservation-date').value;

    if (!indexNumber) {

        return;
    }

    const confirmation = confirm("정말로 삭제하시겠습니까?");
    if (!confirmation) return;

    // 보낼 데이터 객체로 변환
    const data = {
        seq: indexNumber
    };

    // 서버에 삭제 요청 보내기
    fetch(`reservation/deleteReservation?seq=${data.seq}`, { // seq를 URL에 포함
        method: 'DELETE', // DELETE 요청
        headers: {
            'Content-Type': 'application/json' // JSON 형식으로 데이터 전송
        }
    })
        .then(data => {
            alert("예약이 성공적으로 삭제되었습니다.");
            // 삭제 후 UI 갱신 등 추가 로직
            rReset();
            const dateOnly = new Date(reservationDate).toLocaleDateString('en-CA');
            dateReservationList(dateOnly);


        })
        .catch(error => {
            console.error('에러 발생:', error);
            alert("삭제 중 오류가 발생했습니다.");
        });

}

function addRow() {
    const termList = document.getElementById('termList');
    const newRow = document.createElement('tr');

    // 진료명 입력 필드
    const termCell = document.createElement('td');
    termCell.innerHTML = '<input type="text" placeholder="진료명을 입력하세요" />'; // 빈 입력 필드
    newRow.appendChild(termCell);

    // 저장 버튼
    const saveCell = document.createElement('td');
    saveCell.innerHTML = '<button onclick="saveTerm(this)" class="btn btn-success">추가</button>'; // 저장 버튼 추가
    newRow.appendChild(saveCell);

    // 삭제 버튼
    const deleteCell = document.createElement('td');
    deleteCell.innerHTML = '<button onclick="deleteTerm(this)" class="btn btn-danger">삭제</button>'; // 삭제 버튼 추가
    newRow.appendChild(deleteCell);

    termList.appendChild(newRow);
}


function saveTerm(button) {
    const row = button.parentNode.parentNode;
    const termInput = row.querySelector('input').value.trim();

    if (termInput === '') {
        alert("진료명을 입력하세요.");
        return;
    }

    // API 호출
    fetch('/reservation/terms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: termInput})
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("진료명을 추가하는 데 오류가 발생했습니다.");
            }
            return response.json();
        })
        .then(newTerm => {
            fetchTerms();
        })
        .catch(error => {
            alert(error.message);
        });
}

function fetchTerms() {
    fetch('/reservation/terms/all')
        .then(response => {
            if (!response.ok) {
                throw new Error("용어를 가져오는 데 오류가 발생했습니다.");
            }
            return response.json();
        })
        .then(terms => {
            console.log("Fetched terms:", terms);
            const termList = document.getElementById('termList');
            termList.innerHTML = ''; // 기존 행 초기화 (중복 방지)

            terms.forEach(term => {
                const newRow = document.createElement('tr');

                const termCell = document.createElement('td');
                termCell.textContent = term.name;
                newRow.appendChild(termCell);

                const editCell = document.createElement('td');
                editCell.innerHTML = `<button onclick="addTermByNote('${term.name}')" class="btn btn-success">작성</button>`
                newRow.appendChild(editCell);

                const deleteCell = document.createElement('td');
                deleteCell.innerHTML = `<button onclick="deleteTerm('${term.id}')"  class="btn btn-danger">삭제</button>`
                newRow.appendChild(deleteCell);

                termList.appendChild(newRow);
            });
        })
        .catch(error => {
            alert(error.message);
        });
}

fetchTerms()

function addTermByNote(name) {
    const patientNoteElement = document.getElementById('patient-note');
    const patientNoteElementValue = document.getElementById('patient-note').value;

    if (!patientNoteElementValue) {
        patientNoteElement.value += name;
    } else {
        patientNoteElement.value += ", " + name;
    }

    if (name) {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = name;

        const taggedWordsDiv = document.getElementById('taggedWords');
        taggedWordsDiv.appendChild(span);
    }
}

function deleteTerm(param) {
    if (param instanceof HTMLElement) {
        // 'this'가 전달된 경우, 즉 버튼 클릭
        const row = param.closest('tr'); // 버튼이 있는 행 찾기
        const termInput = row.querySelector('input'); // 입력 필드 찾기
        if (termInput) {
            row.remove(); // 해당 행 삭제
        }
    } else if (typeof param === 'string') {
        // ID가 문자열로 전달된 경우
        const id = param;
        console.log('Deleting term with ID:', id);
        fetch(`reservation/deleteTerm?seq=${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // 성공적으로 삭제되었을 때 실행할 동작
                    alert('성공적으로 삭제 되었습니다.');
                    // 테이블에서 데이터 새로 고침
                    fetchTerms();
                } else {
                    throw new Error('삭제 실패');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error deleting term.');
            });
    } else {
        console.error("유효하지 않은 매개변수입니다.");
    }
}
