document.addEventListener('DOMContentLoaded', function() { // 'load' 대신 'DOMContentLoaded' 사용
    const idInput = document.getElementById('id');
    const passwordInput = document.getElementById('password');
    const nameInput = document.getElementById('name');
    const dobInput = document.getElementById('dob');
    // const telecomSelect = document.getElementById('telecom'); // HTML에서 제거되었으므로 이 변수도 제거
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    const nationalityRadios = document.querySelectorAll('input[name="nationality"]');
    const submitButton = document.getElementById('submitButton');

    // 모든 필수 입력 필드가 채워지고 라디오 버튼이 선택되었는지 확인하는 함수
    function checkAllInputsFilled() {
        const isIdFilled = idInput.value.trim() !== '';
        const isPasswordFilled = passwordInput.value.trim() !== '';
        const isNameFilled = nameInput.value.trim() !== '';
        const isDobFilled = dobInput.value.trim().length === 8; // 생년월일 8자리 확인
        // const isTelecomSelected = true; // telecomSelect가 제거되었으므로 항상 true로 간주하거나, 필요 없으면 제거

        let isGenderSelected = false;
        genderRadios.forEach(radio => {
            if (radio.checked) {
                isGenderSelected = true;
            }
        });

        let isNationalitySelected = false;
        nationalityRadios.forEach(radio => {
            if (radio.checked) {
                isNationalitySelected = true;
            }
        });

        // 모든 조건이 충족되면 버튼 활성화
        // isTelecomSelected 조건 제거
        submitButton.disabled = !(isIdFilled && isPasswordFilled && isNameFilled && isDobFilled && isGenderSelected && isNationalitySelected);
    }

    // 각 입력 필드 및 선택 요소에 이벤트 리스너 추가
    idInput.addEventListener('input', checkAllInputsFilled);
    passwordInput.addEventListener('input', checkAllInputsFilled);
    nameInput.addEventListener('input', checkAllInputsFilled);
    dobInput.addEventListener('input', checkAllInputsFilled);
    // telecomSelect.addEventListener('change', checkAllInputsFilled); // HTML에서 제거되었으므로 이 리스너도 제거

    genderRadios.forEach(radio => {
        radio.addEventListener('change', checkAllInputsFilled);
    });

    nationalityRadios.forEach(radio => {
        radio.addEventListener('change', checkAllInputsFilled);
    });

    // '다음' 버튼 클릭 이벤트 (실제 회원가입 완료 또는 다음 단계)
    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // 폼 제출 방지 (필요 시 주석 처리)
        if (!this.disabled) {
            console.log('회원가입 정보가 제출되었습니다.');
            // alert('회원가입이 완료되었습니다! (실제 기능은 구현되지 않았습니다.)'); // 임시 알림 제거
            // 실제 구현 시 서버로 데이터를 전송하거나, 회원가입 완료 페이지로 이동
            window.location.href = 'signup3.html'; // signup3.html로 페이지 이동
        }
    });

    // 초기 로드 시 '다음' 버튼 상태 설정
    checkAllInputsFilled();
});