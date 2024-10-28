function ReservationDateList(selectedDate) {
    fetch('reservation/selectedPatientDateList', {
        method: 'POST', // POST 요청
        headers: {
            'Content-Type': 'application/json' // JSON 형식으로 데이터 전송
        },
        body: JSON.stringify({
            reservationDate: selectedDate
        }) // JSON 객체로 전송
    })
        .then(response => {
            // 응답 상태가 성공적인 경우 JSON으로 변환
            if (!response.ok) {
                throw new Error('네트워크 응답이 실패했습니다.');
            }
            return response.json(); // JSON 데이터로 변환
        })
        .then(data => {
            // 환자 데이터가 들어갈 ID값 보관
            const tableBody = document.querySelector('#reservationTableList');

            // 테이블의 기존 데이터를 지우고 새 데이터를 추가
            // 해당 작업은 다른 날짜를 클릭했을때 기존 내용을 지워야 하기 때문임
            tableBody.innerHTML = ''; // 기존 내용 제거

            // 데이터 배열을 순회하여 테이블에 추가
            data.forEach(item => {
                // 시간만 추출 (예: "2024-10-21T00:13" -> "00:13")
                const time = new Date(item.reservationDate).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                });

                const row = document.createElement('tr'); // 새로운 행 생성
                row.id = 'reservationTableListParent'; // ID 추가
                row.innerHTML = `
                <td>${time}</td>
                <td>${item.department}</td>
                <td>${item.patientNote}</td>
            `; // 각 열에 데이터 삽입

                tableBody.appendChild(row); // 행을 테이블에 추가
            });
        })
        .catch(error => {
            // 에러 처리
            console.error('에러 발생:', error);
        });
}



// 예약 테이블 나오는 부분
// 모든 의사 목록을 가져오는 함수
async function fetchDoctors() {
    try {
        const response = await fetch('reservation/doctorTimetable');
        return await response.json(); // 의사 목록 반환
    } catch (error) {
        console.error("의사 목록을 가져오는 데 오류가 발생했습니다:", error);
        return [];
    }
}

// 타임테이블 생성 함수
async function generateTimetable() {
    const doctors = await fetchDoctors(); // 의사 목록 가져오기
    const tableHead = document.querySelector("#timetable thead tr");
    const tableBody = document.querySelector("#timetable tbody");

    // 의사 헤더 셀 초기화
    tableHead.innerHTML = '<th>&nbsp;</th>'; // 기존 헤더 초기화
    tableBody.innerHTML = ""; // 기존 바디 초기화

    // 의사 헤더 셀 생성
    doctors.forEach(doctor => {
        const th = document.createElement("th");
        th.innerText = doctor; // 의사 이름 삽입
        tableHead.appendChild(th);
    });

    // 시간 슬롯 생성
    reservationTimes.forEach(slot => {
        const tr = document.createElement("tr");

        // 시간 셀 생성
        const timeCell = document.createElement("td");
        timeCell.innerText = slot;
        tr.appendChild(timeCell);

        // 각 의사에 대한 예약 정보 생성
        doctors.forEach(() => {
            const td = document.createElement("td");
            td.innerText = ""; // 현재 예약 정보는 비워둡니다
            tr.appendChild(td);
        });

        tableBody.appendChild(tr);
    });
}

// 페이지가 로드될 때 타임테이블 생성
generateTimetable();