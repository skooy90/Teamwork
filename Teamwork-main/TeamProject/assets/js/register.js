document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const nameInput = document.getElementById('name');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const qualificationSelect = document.getElementById('qualification');
    const dobInput = document.getElementById('dob');
    const calculatedAgeSpan = document.getElementById('calculatedAge');
    const addressInput = document.getElementById('address');
    const addressConfirmBtn = document.getElementById('addressConfirmBtn'); // 주소 확인 버튼
    let isAddressConfirmed = false; // 주소 확인 상태 변수

    const termsAgreeCheckbox = document.getElementById('termsAgree');
    const viewTermsLink = document.getElementById('viewTermsLink');
    
    const termsModal = document.getElementById('termsModal');
    const closeTermsBtn = termsModal.querySelector('.close-button');
    const agreeTermsBtn = document.getElementById('agreeTermsBtn');

    const completionModal = document.getElementById('completionModal');
    const closeCompletionBtn = completionModal.querySelector('.close-button');

    // 에러 메시지 요소들
    const nameError = document.getElementById('nameError');
    const genderError = document.getElementById('genderError');
    const qualificationError = document.getElementById('qualificationError');
    const dobError = document.getElementById('dobError');
    const addressError = document.getElementById('addressError');
    const termsError = document.getElementById('termsError');

    // 모든 에러 메시지 초기화 함수
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(span => {
            span.textContent = '';
        });
        document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
            input.classList.remove('error-border');
        });
        // 라디오 그룹의 에러 테두리도 초기화
        document.querySelectorAll('.radio-group.error-border').forEach(group => {
            group.classList.remove('error-border');
        });
        // 주소 확인 버튼 상태 초기화 (폼 리셋 시)
        if (!isAddressConfirmed) { // 이미 확인된 상태가 아니라면 초기화
            addressConfirmBtn.textContent = '확인';
            addressConfirmBtn.classList.remove('confirmed');
            addressInput.readOnly = false;
        }
    }

    // 특정 입력 필드에 에러 표시 함수
    function showError(element, message, errorSpan) {
        if (element.type === 'radio') {
            element.closest('.radio-group').classList.add('error-border');
        } else {
            element.classList.add('error-border');
        }
        errorSpan.textContent = message;
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // 만 나이 계산 함수
    function calculateInternationalAge(birthDateString) {
        if (!birthDateString) {
            return '';
        }
        const birthDate = new Date(birthDateString);
        const today = new Date();
        
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return `(만 ${age}세)`;
    }

    // 생년월일 입력 변경 시 나이 자동 계산 및 표시
    dobInput.addEventListener('input', function() {
        calculatedAgeSpan.textContent = calculateInternationalAge(this.value);
        this.classList.remove('error-border');
        dobError.textContent = '';
    });

    // 주소 확인 버튼 클릭 이벤트
    addressConfirmBtn.addEventListener('click', function() {
        if (!addressInput.value.trim()) {
            showError(addressInput, '주소를 입력해주세요.', addressError);
            isAddressConfirmed = false;
        } else {
            // 실제 주소 검색 API 연동은 현재 환경에서 불가능하므로, 입력값만 확인합니다.
            // juso.go.kr 같은 외부 API를 사용하려면 서버 측 프록시가 필요하며,
            // 이는 현재 Canvas 환경의 보안 정책을 벗어납니다.
            addressInput.classList.remove('error-border');
            addressError.textContent = '';
            addressConfirmBtn.textContent = '확인됨';
            addressConfirmBtn.classList.add('confirmed');
            addressInput.readOnly = true; // 주소 입력 필드 비활성화
            isAddressConfirmed = true; // 주소 확인 상태 업데이트
        }
    });

    // 주소 입력 필드 내용 변경 시 확인 상태 초기화
    addressInput.addEventListener('input', function() {
        if (isAddressConfirmed) { // 이미 확인된 상태에서 내용이 변경되면
            addressConfirmBtn.textContent = '확인';
            addressConfirmBtn.classList.remove('confirmed');
            addressInput.readOnly = false; // 다시 활성화
            isAddressConfirmed = false; // 확인 상태 초기화
        }
        this.classList.remove('error-border'); // 에러 테두리 제거
        addressError.textContent = ''; // 에러 메시지 제거
    });


    // 유효성 검사 함수
    function validateForm() {
        clearErrors();

        // 1. 이름 검사
        const nameRegex = /^[가-힣a-zA-Z\s]+$/;
        if (!nameInput.value.trim()) {
            showError(nameInput, '이름을 입력해주세요.', nameError);
            return false;
        }
        if (!nameRegex.test(nameInput.value.trim())) {
            showError(nameInput, '이름은 한글 또는 영어만 가능합니다.', nameError);
            return false;
        }

        // 2. 성별 검사
        const isGenderSelected = Array.from(genderInputs).some(radio => radio.checked);
        if (!isGenderSelected) {
            showError(genderInputs[0], '성별을 선택해주세요.', genderError);
            return false;
        }

        // 3. 자격증 검사
        if (qualificationSelect.value === '') {
            showError(qualificationSelect, '자격증을 선택해주세요.', qualificationError);
            return false;
        }

        // 4. 생년월일 검사
        if (!dobInput.value) {
            showError(dobInput, '생년월일을 입력해주세요.', dobError);
            return false;
        }
        const birthDate = new Date(dobInput.value);
        const today = new Date();
        if (birthDate > today) {
            showError(dobInput, '미래 날짜는 입력할 수 없습니다.', dobError);
            return false;
        }

        // 5. 거주지 검사 및 확인 여부
        if (!addressInput.value.trim()) {
            showError(addressInput, '거주지를 입력해주세요.', addressError);
            return false;
        }
        if (!isAddressConfirmed) { // 주소 확인 버튼이 눌리지 않았으면
            showError(addressInput, '주소 확인 버튼을 눌러주세요.', addressError);
            return false;
        }

        // 6. 약관 동의 검사
        if (!termsAgreeCheckbox.checked) {
            showError(termsAgreeCheckbox, '약관에 동의해야 합니다.', termsError);
            return false;
        }

        return true; // 모든 유효성 검사 통과
    }

    // 폼 제출 이벤트 리스너
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (validateForm()) {
            completionModal.style.display = 'flex';
            setTimeout(() => {
                completionModal.style.display = 'none';
                registerForm.reset();
                clearErrors();
                calculatedAgeSpan.textContent = '';
                isAddressConfirmed = false; // 폼 리셋 시 주소 확인 상태도 리셋
            }, 3000);
        }
    });

    // 약관 보기 링크 클릭 이벤트
    viewTermsLink.addEventListener('click', function(event) {
        event.preventDefault();
        termsModal.style.display = 'flex';
    });

    // 약관 모달 닫기 버튼 클릭 이벤트
    closeTermsBtn.addEventListener('click', function() {
        termsModal.style.display = 'none';
    });

    // 약관 동의 및 닫기 버튼 클릭 이벤트
    agreeTermsBtn.addEventListener('click', function() {
        termsAgreeCheckbox.checked = true;
        termsModal.style.display = 'none';
        clearErrors();
    });

    // 모달 외부 클릭 시 닫기 (약관 모달)
    window.addEventListener('click', function(event) {
        if (event.target == termsModal) {
            termsModal.style.display = 'none';
        }
    });
    // 모달 외부 클릭 시 닫기 (완료 모달)
    window.addEventListener('click', function(event) {
        if (event.target == completionModal) {
            completionModal.style.display = 'none';
            registerForm.reset();
            clearErrors();
            calculatedAgeSpan.textContent = '';
            isAddressConfirmed = false; // 폼 리셋 시 주소 확인 상태도 리셋
        }
    });
});