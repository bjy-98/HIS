// 'selectedTransactionId' 변수를 전역에서 한 번만 선언
if (typeof selectedTransactionId === 'undefined') {
    var selectedTransactionId = null;  // 선택된 transactionId 저장
}

// 페이지가 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    setTodayDate();  // 오늘 날짜 설정
    loadTransactionList();  // 초기 데이터 로딩
});

// 테이블에서 행을 더블클릭했을 때 입력 필드에 값 채우기
function populateTransactionForm(transaction) {
    clearTransactionForm();  // 새로운 선택 시 폼을 초기화

    document.getElementById('transactionId').value = transaction.transactionId || '';  // transactionId 설정
    document.getElementById('transactionDate').value = transaction.transactionDate || '';
    document.getElementById('twoCompanyName').value = transaction.companyName || '';
    document.getElementById('twoMaterialName').value = transaction.materialName || '';
    document.getElementById('twoMaterialCode').value = transaction.materialCode || '';
    document.getElementById('stockIn').value = transaction.stockIn || 0;
    document.getElementById('stockOut').value = transaction.stockOut || 0;

    // 필드 수정 불가능하게 설정
    document.getElementById('transactionDate').readOnly = true;
    document.getElementById('twoCompanyName').readOnly = true;
    document.getElementById('twoMaterialName').readOnly = true;
    document.getElementById('twoMaterialCode').readOnly = true;

    // 선택된 transactionId 저장
    selectedTransactionId = transaction.transactionId;
}

// 저장, 취소, 삭제 후 입력 필드 비우기
function clearTransactionForm() {
    document.getElementById('transactionId').value = '';
    document.getElementById('twoCompanyName').value = '';
    document.getElementById('twoMaterialName').value = '';
    document.getElementById('twoMaterialCode').value = '';
    document.getElementById('stockIn').value = '';
    document.getElementById('stockOut').value = '';

    // 필드를 다시 수정 가능하게 변경 (입출일자는 제외)
    setReadOnlyFields(true);  // 입출일자는 항상 읽기 전용으로 유지
}

// 필드를 읽기 전용으로 설정하는 함수 (입출일자는 항상 읽기 전용)
function setReadOnlyFields(readOnly) {
    document.getElementById('transactionDate').readOnly = true;  // 입출일자는 항상 읽기 전용
    document.getElementById('twoCompanyName').readOnly = readOnly;
    document.getElementById('twoMaterialName').readOnly = readOnly;
    document.getElementById('twoMaterialCode').readOnly = readOnly;
}

// 오늘 날짜를 설정하는 함수
function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];  // 오늘 날짜를 'YYYY-MM-DD' 형식으로 가져옴
    document.getElementById('transactionDate').value = today;
}

// 페이지가 로드될 때, 그리고 저장/취소/삭제 후에 오늘 날짜로 설정
document.addEventListener('DOMContentLoaded', function() {
    setTodayDate();  // 페이지 로드 시 오늘 날짜 설정
    loadTransactionList();  // 초기 데이터 로딩
    setReadOnlyFields(true);  // 필드 읽기 전용 설정
});

// 트랜잭션 목록 로딩
function loadTransactionList() {
    fetch('/inventory_management/findTransaction')  // 전체 목록 조회
        .then(response => response.json())
        .then(data => {
            // 데이터를 최신 날짜 순으로 정렬 (transactionDate 기준 내림차순)
            data.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));

            const tbody = document.getElementById('transactionList');
            tbody.innerHTML = '';  // 기존 테이블 내용 초기화

            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7">현재 등록된 출납 정보가 없습니다.</td></tr>';
            } else {
                data.forEach(transaction => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${transaction.transactionDate || 'N/A'}</td>
                        <td>${transaction.companyName || 'N/A'}</td>
                        <td>${transaction.materialName || 'N/A'}</td>
                        <td>${transaction.materialCode || 'N/A'}</td>
                        <td>${transaction.stockIn != null ? transaction.stockIn.toLocaleString() : 'N/A'}</td>
                        <td>${transaction.stockOut != null ? transaction.stockOut.toLocaleString() : 'N/A'}</td>
                        <td>${transaction.managerNumber || 'N/A'}</td>
                    `;

                    // 더블클릭 이벤트 추가: 행을 더블클릭하면 데이터를 폼에 채워줌
                    row.addEventListener('dblclick', function () {
                        populateTransactionForm(transaction);  // 폼에 데이터를 채워줌
                    });

                    tbody.appendChild(row);
                });
            }
        })
        .catch(error => {
            console.error("재료 출납 목록을 불러오는 중 오류 발생:", error);
        });
}

// 즉시 전체 트랜잭션을 불러오는 함수 호출
loadTransactionList();

// 저장 버튼 클릭 이벤트 핸들러
document.getElementById('addTransactionBtn').addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const transactionIdElement = document.getElementById('transactionId');
    const transactionId = transactionIdElement ? transactionIdElement.value : null;

    let url, method;
    if (transactionId) {
        url = `/inventory_management/updateTransaction`;
        method = "PUT";
    } else {
        url = `/inventory_management/addTransaction`;
        method = "POST";
    }

    const transactionData = {
        transactionId: transactionId,
        transactionDate: document.getElementById('transactionDate').value,
        materialCode: document.getElementById('twoMaterialCode').value,
        companyName: document.getElementById('twoCompanyName').value,
        materialName: document.getElementById('twoMaterialName').value,
        stockIn: parseInt(document.getElementById('stockIn').value, 10),
        stockOut: parseInt(document.getElementById('stockOut').value, 10)
    };

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transactionData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            loadTransactionList();  // 목록 다시 로딩
            clearTransactionForm();  // 저장 후 필드 비우기
            setReadOnlyFields(true);  // 저장 후 필드 읽기 전용
        })
        .catch(error => {
            console.error("Error:", error);
            alert(`서버와의 통신 중 오류가 발생했습니다. 상세 내용: ${error.message}`);
        });
});

// 취소 버튼 클릭 이벤트 핸들러
document.getElementById('resetTransaction').addEventListener('click', function() {
    clearTransactionForm();  // 필드 초기화
    setTodayDate();  // 오늘 날짜로 다시 설정
    setReadOnlyFields(true);  // 취소 후 필드 읽기 전용
});

// 삭제 버튼 클릭 이벤트 핸들러
document.getElementById('deleteTransactionBtn').addEventListener('click', function () {
    if (!selectedTransactionId) {
        alert('출납 기록을 선택하세요.');
        return;
    }

    // 삭제 요청 보내기
    fetch(`/inventory_management/deleteTransaction/${selectedTransactionId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                alert('출납 기록이 삭제되었습니다.');
                resetSearch();  // 삭제 후 목록 초기화
                clearTransactionForm();  // 삭제 후 필드 비우기
                setTodayDate();  // 오늘 날짜로 다시 설정
                selectedTransactionId = null;  // 삭제 후 transactionId 초기화
            } else {
                alert('출납 기록 삭제에 실패했습니다.');
            }
        })
        .catch(error => {
            console.error('출납 기록 삭제 중 오류 발생:', error);
        });
});

// 두 검색어 초기화 함수 및 검색 함수는 전역 스코프에 선언
function twoSearch() {
    const materialName = document.getElementById('twoMaterialNameSearch').value.trim();
    const materialCode = document.getElementById('twoMaterialCodeSearch').value.trim();
    const transactionStartDate = document.getElementById('transactionStartDate').value;
    const transactionEndDate = document.getElementById('transactionEndDate').value;

    let url = `/inventory_management/findTransaction?`;
    const queryParams = [];

    if (transactionStartDate) queryParams.push(`transactionStartDate=${encodeURIComponent(transactionStartDate)}`);
    if (transactionEndDate) queryParams.push(`transactionEndDate=${encodeURIComponent(transactionEndDate)}`);
    if (materialName) queryParams.push(`materialName=${encodeURIComponent(materialName)}`);
    if (materialCode) queryParams.push(`materialCode=${encodeURIComponent(materialCode)}`);

    if (queryParams.length > 0) {
        url += queryParams.join('&');
    }

    // 서버에 fetch 요청
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`서버 응답 오류: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tbody = document.getElementById('transactionList');
            tbody.innerHTML = ''; // 기존 테이블 내용 초기화

            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7">현재 등록된 출납 내역이 없습니다.</td></tr>';
            } else {
                data.forEach(transaction => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${transaction.transactionDate || 'N/A'}</td>
                        <td>${transaction.companyName || 'N/A'}</td>
                        <td>${transaction.materialName || 'N/A'}</td>
                        <td>${transaction.materialCode || 'N/A'}</td>
                        <td>${transaction.stockIn != null ? transaction.stockIn.toLocaleString() : 'N/A'}</td>
                        <td>${transaction.stockOut != null ? transaction.stockOut.toLocaleString() : 'N/A'}</td>
                        <td>${transaction.managerNumber || 'N/A'}</td>
                    `;
                    tbody.appendChild(row);
                });
            }
        })
        .catch(error => {
            console.error("검색 중 오류 발생:", error);
            alert(`검색 중 오류가 발생했습니다. 자세한 내용: ${error.message}`);
        });
}

function resetSearch() {
    // 검색어 초기화
    document.getElementById('twoMaterialNameSearch').value = '';
    document.getElementById('twoMaterialCodeSearch').value = '';

    // 입출고일자 초기화
    document.getElementById('transactionStartDate').value = '';
    document.getElementById('transactionEndDate').value = '';

    // 전체 데이터를 불러오는 요청
    fetch('/inventory_management/reset')  // 전체 데이터를 가져오는 API 엔드포인트
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('transactionList');
            tbody.innerHTML = '';  // 기존 행 제거

            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7">현재 등록된 재료가 없습니다.</td></tr>';
            } else {
                data.forEach(transaction => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${transaction.transactionDate || 'N/A'}</td>
                        <td>${transaction.companyName || 'N/A'}</td>
                        <td>${transaction.materialName || 'N/A'}</td>
                        <td>${transaction.materialCode || 'N/A'}</td>
                        <td>${transaction.stockIn != null ? transaction.stockIn.toLocaleString() : 'N/A'}</td>
                        <td>${transaction.stockOut != null ? transaction.stockOut.toLocaleString() : 'N/A'}</td>
                        <td>${transaction.managerNumber || 'N/A'}</td>
                    `;
                    tbody.appendChild(row);
                });
            }
        })
        .catch(error => {
            console.error("재료 출납 목록을 불러오는 중 오류 발생:", error);
        });
}

// 모달 관련 코드 추가

// 업체 목록을 더블클릭했을 때 선택된 업체 정보를 input 필드에 채우기
function selectMaterial(companyName, materialName, materialCode) {
    // 폼 필드에 선택된 값을 넣습니다.
    document.getElementById('twoCompanyName').value = companyName;
    document.getElementById('twoMaterialName').value = materialName;
    document.getElementById('twoMaterialCode').value = materialCode;

    // 모달을 닫습니다.
    const modal = bootstrap.Modal.getInstance(document.getElementById('materialCompanyModal'));
    modal.hide();
}

// 서버에서 재료 목록을 불러오는 함수
async function fetchMaterialCompanies() {
    try {
        const response = await fetch('/inventory_management/searchMaterials'); // 서버에서 업체 목록을 가져오는 API 호출
        const materialCompanies = await response.json();

        const materialCompanyList = document.getElementById('materialCompanyList');
        materialCompanyList.innerHTML = ''; // 기존 목록 초기화

        if (Array.isArray(materialCompanies)) {
            // 목록을 테이블에 추가
            materialCompanies.forEach(material_transactions => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${material_transactions.companyName}</td>
                    <td>${material_transactions.materialName}</td>
                    <td>${material_transactions.materialCode}</td>
                `;

                // 더블클릭 시 선택한 데이터를 폼에 반영
                row.addEventListener('dblclick', function() {
                    selectMaterial(
                        material_transactions.companyName,
                        material_transactions.materialName,
                        material_transactions.materialCode
                    );
                });

                materialCompanyList.appendChild(row);
            });
        } else {
            console.error("서버에서 배열이 아닌 데이터가 반환되었습니다.");
        }
    } catch (error) {
        console.error("재료 목록을 불러오는 중 오류 발생:", error);
    }
}

// 모달이 열릴 때마다 재료 목록을 불러오기
document.getElementById('materialCompanyModal').addEventListener('show.bs.modal', fetchMaterialCompanies);

// 재료조회 버튼 클릭 시 모달을 띄우기
document.getElementById('materialCompanySelect').addEventListener('click', function() {
    const materialCompanyModal = new bootstrap.Modal(document.getElementById('materialCompanyModal'));
    materialCompanyModal.show(); // 모달을 띄우기
});


// 초기화 버튼 클릭 이벤트 등록
document.getElementById('twoSearchReset').addEventListener('click', resetSearch);
