// 목록에서 업체 더블클릭시 폼에 회사 정보 채우기
function populateCompanyForm(company) {
    document.getElementById('fourCompanyCode').value = company.companyCode;
    document.getElementById('fourCompanyName').value = company.companyName;
    document.getElementById('businessNumber').value = company.businessNumber;
    document.getElementById('companyNumber').value = company.companyNumber;
    document.getElementById('managerName').value = company.managerName;
    document.getElementById('managerNumber').value = company.managerNumber;
    document.getElementById('companyMemo').value = company.companyMemo;
}

//업체 목록 로딩 함수
function loadCompanyList() {
    fetch('/inventory_management/searchCompany?companyName=')  // 검색어를 빈 문자열로 전달해서 전체 목록 조회
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('newCompanyList');
            tbody.innerHTML = '';

            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7">현재 등록된 업체가 없습니다.</td></tr>';
            } else {
                data.forEach(company => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                            <td>${company.companyCode}</td>
                            <td>${company.companyName}</td>
                            <td>${company.businessNumber}</td>
                            <td>${company.companyNumber}</td>
                            <td>${company.managerName}</td>
                            <td>${company.managerNumber}</td>
                            <td>${company.companyMemo}</td>
                        `;
                    row.addEventListener('dblclick', () => {
                        populateCompanyForm(company)
                        // 기존 선택된 행에서 하이라이트 제거
                        if (selectedRow) {
                            selectedRow.classList.remove('selected-highlight');
                        }

                        // 현재 선택된 행에 하이라이트 추가
                        row.classList.add('selected-highlight');
                        selectedRow = row;  // 선택된 행 업데이트
                    });

                    tbody.appendChild(row);
                });
            }
        })
        .catch(error => {
            console.error("회사 목록을 불러오는 중 오류 발생:", error);
        });
}

loadCompanyList();


// 업체 등록 또는 수정 버튼 클릭 시 데이터 전송
document.getElementById('addCompanyBtn').addEventListener('click', (event) => {
    event.preventDefault();  // 기본 submit 동작 방지
    event.stopPropagation();

    // 권한 체크를 직접 수행합니다.
    const hasPermission = globalUserData.authorities.some(auth =>
        auth.authority === 'ROLE_DOCTOR' || auth.authority === 'ROLE_NURSE'
    );

    // 권한이 없으면 경고 메시지를 표시하고 등록 과정을 중단합니다.
    if (!hasPermission) {
        alert("권한이 없습니다. 의사 또는 간호사만 환자를 등록할 수 있습니다.");
        return; // 등록 과정 중단
    }

    const companyCode = document.getElementById('fourCompanyCode').value;
    const companyData = {
        companyCode: companyCode,
        companyName: document.getElementById('fourCompanyName').value,
        businessNumber: document.getElementById('businessNumber').value,
        companyNumber: document.getElementById('companyNumber').value,
        managerName: document.getElementById('managerName').value,
        managerNumber: document.getElementById('managerNumber').value,
        companyMemo: document.getElementById('companyMemo').value
    };

    // 먼저 업체 코드가 존재하는지 확인
    fetch(`/inventory_management/checkCompanyCode?companyCode=${encodeURIComponent(companyCode)}`)
        .then(response => response.json())
        .then(exists => {
            let url, method;

            // 업체 코드가 존재하면 업데이트 API 호출, 존재하지 않으면 추가 API 호출
            if (exists) {
                url = '/inventory_management/updateCompany';
                method = 'PUT';  // 수정일 경우 PUT 메서드 사용
            } else {
                url = '/inventory_management/addCompany';
                method = 'POST';  // 등록일 경우 POST 메서드 사용
            }

            // 최종적으로 업체 등록 또는 수정 요청
            return fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(companyData)
            });
        })
        .then(response => {
            // 응답 본문을 JSON으로 파싱
            return response.json().then(data => ({
                status: response.status,
                ok: response.ok,
                body: data
            }));
        })
        .then(({ status, ok, body }) => {
            if (ok) {
                alert(body.message || "업체가 성공적으로 수정되었습니다.");
                document.getElementById('companyForm').reset();
                loadCompanyList();
            } else {
                alert(body.message || `오류가 발생했습니다. 상태 코드: ${status}`);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert(`서버와의 통신 중 오류가 발생했습니다. 상세 내용: ${error.message}`);
        });
});





// 업체 검색 함수
function fourSearch() {
    const companyName = document.getElementById('fourCompanyNameSearch').value;

    fetch(`/inventory_management/searchCompany?companyName=${encodeURIComponent(companyName)}`)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('newCompanyList');
            tbody.innerHTML = ''; // 기존 행 제거

            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7">현재 등록된 업체가 없습니다.</td></tr>';
            } else {
                data.forEach(company => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                            <td>${company.companyCode}</td>
                            <td>${company.companyName}</td>
                            <td>${company.businessNumber}</td>
                            <td>${company.companyNumber}</td>
                            <td>${company.managerName}</td>
                            <td>${company.managerNumber}</td>
                            <td>${company.companyMemo}</td>
                        `;
                    tbody.appendChild(row);
                });
            }
        });
}

// 초기화 버튼 클릭 시 호출되는 함수
function resetCompanySearch() {
    // 검색 필드를 초기화
    document.getElementById('fourCompanyNameSearch').value = '';

    // 전체 데이터를 불러오는 요청 (검색어 없이)
    loadCompanyList('');
}

// 초기화 버튼 클릭 이벤트 핸들러 추가
document.getElementById('forSearchReset').addEventListener('click', function() {
    resetCompanySearch();  // 검색 필드 초기화 및 전체 목록 로드
});

// 업체 삭제 버튼 클릭 시 데이터 전송
document.getElementById('deleteCompanyBtn').addEventListener('click', function() {
    // 권한 체크를 직접 수행합니다.
    const hasPermission = globalUserData.authorities.some(auth =>
        auth.authority === 'ROLE_DOCTOR' || auth.authority === 'ROLE_NURSE'
    );

    // 권한이 없으면 경고 메시지를 표시하고 등록 과정을 중단합니다.
    if (!hasPermission) {
        alert("권한이 없습니다. 의사 또는 간호사만 환자를 등록할 수 있습니다.");
        return; // 등록 과정 중단
    }

    const companyCode = document.getElementById('fourCompanyCode').value;

    if (!companyCode) {
        alert("삭제할 업체 코드를 입력하세요.");
        return;
    }

    if (confirm("정말로 이 업체를 삭제하시겠습니까?")) {
        fetch(`/inventory_management/deleteCompany?companyCode=${encodeURIComponent(companyCode)}`, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                alert(data);  // 서버로부터 삭제 성공 메시지 받음
                // 폼 초기화 및 목록 새로고침
                document.getElementById('companyForm').reset();
                loadCompanyList();
            })
            .catch(error => {
                console.error("삭제 요청 중 오류 발생:", error);
                alert("업체 삭제에 실패했습니다. 다시 시도해주세요.");
            });
    }
});





