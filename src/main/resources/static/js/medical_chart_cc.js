if (!window.MedicalChartCCModule) {
    window.MedicalChartCCModule = (() => {
        let toothList = [];
        let listIndex = 0;

        let tooth, symptom, memo, saveCc, resetCc, upTooth, downTooth, allTooth, upToothY, downToothY, allToothY;
        let upToothValues, downToothValues, YUpToothValues, YDownToothValues, allToothLists;

        // 초기화 함수
        function init() {
            tooth = document.querySelector(".tooth-container");
            symptom = document.querySelector(".cc-symptom");
            memo = document.querySelector(".ccMemo");
            saveCc = document.querySelector(".save-cc");
            resetCc = document.querySelector(".reset-cc");
            upTooth = document.querySelector(".up-control");
            downTooth = document.querySelector(".down-control");
            allTooth = document.querySelector(".all-control");
            upToothY = document.querySelector(".y-up-control");
            downToothY = document.querySelector(".y-down-control");
            allToothY = document.querySelector(".y-all-control");

            upToothValues = document.querySelectorAll(".up-tooth");
            downToothValues = document.querySelectorAll(".down-tooth");
            YUpToothValues = document.querySelectorAll(".y-up-tooth");
            YDownToothValues = document.querySelectorAll(".y-down-tooth");
            allToothLists = tooth.querySelectorAll('button');

            setupEventListeners();

            updateToothButtonStyles(window.toothList || []);

            // 날짜를 오늘 날짜로 설정
            const mdTime = document.getElementById("mdTime");
            const today = new Date().toISOString().split("T")[0];
            mdTime.value = today;

            // 주치의 목록에서 첫 번째 항목이 선택되도록 설정
            const ccCheckDoc = document.getElementById("ccCheckDoc");
            if (!ccCheckDoc.value) {
                ccCheckDoc.selectedIndex = 1;
            }
        }

        // 주요 요소 이벤트 리스너 등록
        function setupEventListeners() {
            tooth.addEventListener("click", handleToothClickCc);
            symptom.addEventListener("dblclick", handleSymptomClickCc);

            saveCc.addEventListener('click', saveMedicalCcChart);
            resetCc.addEventListener('click', resetFormFields);
        }

        function cleanUp() {
            tooth.removeEventListener("click", handleToothClickCc);
            symptom.removeEventListener("click", handleSymptomClickCc);

            toothList = [];
            listIndex = 0;
        }

        // 치아 선택
        function handleToothClickCc(e) {
            if (e.target.tagName === "BUTTON" && e.target.id === '') {
                const toothValue = e.target.value;

                // 배열 초기화 확인
                if (!Array.isArray(window.toothList)) {
                    window.toothList = [];
                }

                // 치아 값 추가/제거
                if (window.toothList.includes(toothValue)) {
                    window.toothList = window.toothList.filter(tooth => tooth !== toothValue);
                } else {
                    window.toothList.push(toothValue);
                }

                // 버튼 스타일 토글
                e.target.classList.toggle("opacity-50");

                // 스타일 업데이트
                updateToothButtonStyles(window.toothList);
            } else if (e.target.tagName === "BUTTON") {
                // 잘못된 ID를 처리하지 않도록 검증
                if (document.getElementById(e.target.id)) {
                    toothTerminalCc(e.target.id);
                } else {
                    console.warn("유효하지 않은 버튼 ID:", e.target.id);
                }
            }
        }

// 치아 영역 선택
        function toothTerminalCc(id) {
            // 배열 초기화 확인
            if (!Array.isArray(window.toothList)) {
                window.toothList = [];
            }

            const button = document.getElementById(id);
            if (!button) {
                console.error("올바르지 않은 ID:", id);
                return;
            }

            const isSelected = button.classList.contains("opacity-50");
            let selectedTeethValues = [];

            // 각 ID에 따른 치아 목록 설정
            switch (id) {
                case "upTooth":
                    selectedTeethValues = Array.from(upToothValues || []).map(tooth => tooth.value || '');
                    toggleOpacityCc(upTooth, upToothValues, "상악");
                    break;
                case "allTooth":
                    selectedTeethValues = [
                        ...Array.from(upToothValues || []).map(tooth => tooth.value || ''),
                        ...Array.from(downToothValues || []).map(tooth => tooth.value || '')
                    ];
                    toggleOpacityCc(allTooth, [...upToothValues, ...downToothValues], "전체 치아");
                    break;
                case "downTooth":
                    selectedTeethValues = Array.from(downToothValues || []).map(tooth => tooth.value || '');
                    toggleOpacityCc(downTooth, downToothValues, "하악");
                    break;
                case "upToothY":
                    selectedTeethValues = Array.from(YUpToothValues || []).map(tooth => tooth.value || '');
                    toggleOpacityCc(upToothY, YUpToothValues, "유치 상악");
                    break;
                case "allToothY":
                    selectedTeethValues = [
                        ...Array.from(YUpToothValues || []).map(tooth => tooth.value || ''),
                        ...Array.from(YDownToothValues || []).map(tooth => tooth.value || '')
                    ];
                    toggleOpacityCc(allToothY, [...YUpToothValues, ...YDownToothValues], "유치 전체 치아");
                    break;
                case "downToothY":
                    selectedTeethValues = Array.from(YDownToothValues || []).map(tooth => tooth.value || '');
                    toggleOpacityCc(downToothY, YDownToothValues, "유치 하악");
                    break;
                default:
                    console.error("올바르지 않은 ID:", id);
                    return;
            }

            // 선택 상태 업데이트
            if (isSelected) {
                window.toothList = window.toothList.filter(tooth => !selectedTeethValues.includes(tooth));
            } else {
                selectedTeethValues.forEach(tooth => {
                    if (!window.toothList.includes(tooth)) {
                        window.toothList.push(tooth);
                    }
                });
            }

            // 버튼 스타일 업데이트
            updateToothButtonStyles(window.toothList);
        }


        function toggleOpacityCc(button, elements, groupName) {
            const isCurrentlySelected = button.classList.contains("opacity-50");

            // 전체 치아, 상악, 하악에 대한 그룹 처리
            if (["전체 치아", "상악", "하악"].includes(groupName)) {
                if (groupName === "전체 치아") {
                    // 전체 치아 선택/해제
                    if (!isCurrentlySelected) {
                        button.classList.add("opacity-50");
                        // 전체 치아가 선택되면 상악과 하악 치아 모두 선택
                        [...upToothValues, ...downToothValues].forEach(element => {
                            element.classList.add("opacity-50");
                        });
                        // 상악/하악 버튼도 선택 상태로 변경
                        upTooth.classList.add("opacity-50");
                        downTooth.classList.add("opacity-50");
                    } else {
                        button.classList.remove("opacity-50");
                        // 전체 치아 해제 시 상악과 하악 치아 모두 해제
                        [...upToothValues, ...downToothValues].forEach(element => {
                            element.classList.remove("opacity-50");
                        });
                        // 상악/하악 버튼 해제
                        upTooth.classList.remove("opacity-50");
                        downTooth.classList.remove("opacity-50");
                    }
                }

                if (groupName === "상악") {
                    // 상악 선택/해제
                    if (!isCurrentlySelected) {
                        button.classList.add("opacity-50");
                        elements.forEach(element => element.classList.add("opacity-50"));
                        // 전체 치아 선택 버튼 해제
                        allTooth.classList.remove("opacity-50");
                    } else {
                        button.classList.remove("opacity-50");
                        elements.forEach(element => element.classList.remove("opacity-50"));
                    }
                    // 전체 치아 상태 반영
                    if (downTooth.classList.contains("opacity-50")) {
                        allTooth.classList.add("opacity-50");
                    }
                } else if (groupName === "하악") {
                    // 하악 선택/해제
                    if (!isCurrentlySelected) {
                        button.classList.add("opacity-50");
                        elements.forEach(element => element.classList.add("opacity-50"));
                        // 전체 치아 선택 버튼 해제
                        allTooth.classList.remove("opacity-50");
                    } else {
                        button.classList.remove("opacity-50");
                        elements.forEach(element => element.classList.remove("opacity-50"));
                    }
                    // 전체 치아 상태 반영
                    if (upTooth.classList.contains("opacity-50")) {
                        allTooth.classList.add("opacity-50");
                    }
                }

                // 상악과 하악 둘 중 하나라도 선택되지 않으면 전체 치아 선택 버튼 해제
                if (!upTooth.classList.contains("opacity-50") || !downTooth.classList.contains("opacity-50")) {
                    allTooth.classList.remove("opacity-50");
                }
            }

            // 유치 치아 그룹 처리
            if (["유치 전체 치아", "유치 상악", "유치 하악"].includes(groupName)) {
                if (groupName === "유치 전체 치아") {
                    // 전체 치아 선택/해제
                    if (!isCurrentlySelected) {
                        button.classList.add("opacity-50");
                        // 전체 치아가 선택되면 상악과 하악 치아 모두 선택
                        [...YUpToothValues, ...YDownToothValues].forEach(element => {
                            element.classList.add("opacity-50");
                        });
                        // 상악/하악 버튼도 선택 상태로 변경
                        upToothY.classList.add("opacity-50");
                        downToothY.classList.add("opacity-50");
                    } else {
                        button.classList.remove("opacity-50");
                        // 전체 치아 해제 시 상악과 하악 치아 모두 해제
                        [...YUpToothValues, ...YDownToothValues].forEach(element => {
                            element.classList.remove("opacity-50");
                        });
                        // 상악/하악 버튼 해제
                        upToothY.classList.remove("opacity-50");
                        downToothY.classList.remove("opacity-50");
                    }
                }

                if (groupName === "유치 상악") {
                    // 상악 선택/해제
                    if (!isCurrentlySelected) {
                        button.classList.add("opacity-50");
                        elements.forEach(element => element.classList.add("opacity-50"));
                        // 전체 치아 선택 버튼 해제
                        allToothY.classList.remove("opacity-50");
                    } else {
                        button.classList.remove("opacity-50");
                        elements.forEach(element => element.classList.remove("opacity-50"));
                    }
                    // 전체 치아 상태 반영
                    if (downToothY.classList.contains("opacity-50")) {
                        allToothY.classList.add("opacity-50");
                    }
                } else if (groupName === "유치 하악") {
                    // 하악 선택/해제
                    if (!isCurrentlySelected) {
                        button.classList.add("opacity-50");
                        elements.forEach(element => element.classList.add("opacity-50"));
                        // 전체 치아 선택 버튼 해제
                        allToothY.classList.remove("opacity-50");
                    } else {
                        button.classList.remove("opacity-50");
                        elements.forEach(element => element.classList.remove("opacity-50"));
                    }
                    // 전체 치아 상태 반영
                    if (upToothY.classList.contains("opacity-50")) {
                        allToothY.classList.add("opacity-50");
                    }
                }

                // 상악과 하악 둘 중 하나라도 선택되지 않으면 전체 치아 선택 버튼 해제
                if (!upToothY.classList.contains("opacity-50") || !downToothY.classList.contains("opacity-50")) {
                    allToothY.classList.remove("opacity-50");
                }
            }

            // 현재 버튼 상태 토글 (선택 해제)
            if (isCurrentlySelected) {
                button.classList.remove("opacity-50");
                elements.forEach(element => element.classList.remove("opacity-50"));
            }
        }

        function handleSymptomClickCc(e) {
            if (e.target.tagName === "TD") {
                const symptomText = e.target.textContent.trim();

                if (!memo.value.includes(symptomText)) {
                    memo.value += `${symptomText}\n`;
                }
            }
        }

        // 모든 치아와 증상 선택을 초기 상태로 돌림
        function toothValueResetCc() {
            allToothLists.forEach(button => button.classList.remove("opacity-50"));
            toothList = [];
            memo.value = ''; // 메모 초기화
        }

        function resetFormFields() {
            cnumGlogal = null;
            const ccCheckDoc = document.getElementById('piCheckDoc');

            if (ccCheckDoc) {
                ccCheckDoc.selectedIndex = 0;
                if (!ccCheckDoc.value) {
                    ccCheckDoc.selectedIndex = 1;
                }
            }

            const today = new Date().toISOString().split("T")[0];
            const mdTime = document.getElementById("mdTime");
            if (mdTime) {
                mdTime.value = today;
            }
            const memo = document.querySelector(".ccMemo");
            if (memo) {
                memo.value = '';
            }
            window.toothList = [];
            toothValueResetCc();
        }


        function saveMedicalCcChart() {
            let patientInfos = JSON.parse(sessionStorage.getItem('selectedPatient')) || {};

            const mdTime = document.getElementById('mdTime').value;
            const ccCheckDoc = document.getElementById('ccCheckDoc').value;
            const memoContent = memo.value;
            const paName = patientInfos.name || '';
            const chartNum = patientInfos.chartNum || '';
            const cnum = cnumGlogal;

            let updatedToothList = [...window.toothList];

            // 모든 필드가 입력되었는지 확인
            if (!mdTime) {
                alert("진료 날짜를 선택해주세요.");
                return;
            }
            if (!ccCheckDoc) {
                alert("진료의를 선택해주세요.");
                return;
            }
            if (updatedToothList.length === 0) {
                alert("치식을 선택해주세요.");
                return;
            }
            if (!memoContent) {
                alert("CC 내역을 입력해주세요.");
                return;
            }

            toothList.forEach(tooth => {
                if (!updatedToothList.includes(tooth)) {
                    updatedToothList.push(tooth);
                }
            });

            const medicalChartData = {
                cnum: cnum,
                mdTime: mdTime,
                checkDoc: ccCheckDoc,
                teethNum: updatedToothList.join(', '),
                medicalContent: memoContent,
                medicalDivision: "CC",
                chartNum: chartNum,
                paName: paName
            };

            fetch('/medical_chart/saveCcChart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(medicalChartData),
            })
                .then(response => {
                    if (response.ok) {
                        alert(cnum ? '수정되었습니다.' : '저장되었습니다.');
                        resetFormFields();
                        searchList();
                    } else {
                        alert('저장 실패.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('저장 중 오류가 발생했습니다.');
                });
        }

        return { init, cleanUp, resetFormFields };
    })();
}
