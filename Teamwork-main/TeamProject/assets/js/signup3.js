document.addEventListener('DOMContentLoaded', function() {
    const startAuthBtn = document.getElementById('startAuthBtn');
    const telecomModal = document.getElementById('telecomModal');
    const closeTelecomModal = document.getElementById('closeTelecomModal');
    const telecomButtons = document.querySelectorAll('.telecom-button');

    const authCodeModal = document.getElementById('authCodeModal');
    const closeAuthCodeModal = document.getElementById('closeAuthCodeModal');
    const selectedTelecomText = document.getElementById('selectedTelecomText');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const sendAuthCodeBtn = document.getElementById('sendAuthCodeBtn');
    const authCodeInput = document.getElementById('authCode');
    const verifyAuthCodeBtn = document.getElementById('verifyAuthCodeBtn');
    const timerDisplay = document.getElementById('timer');

    let countdownInterval;
    let secondsLeft = 180; // 3분 = 180초

    // 모달 열기 함수
    function openModal(modal) {
        modal.style.display = 'flex'; // flex로 설정하여 중앙 정렬 효과
    }

    // 모달 닫기 함수
    function closeModal(modal) {
        modal.style.display = 'none';
    }

    // "휴대폰 인증" 버튼 클릭 시 통신사 선택 모달 열기
    startAuthBtn.addEventListener('click', function() {
        openModal(telecomModal);
    });

    // 통신사 선택 모달 닫기 버튼
    closeTelecomModal.addEventListener('click', function() {
        closeModal(telecomModal);
    });

    // 통신사 버튼 클릭 이벤트
    telecomButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedTelecom = this.dataset.telecom;
            selectedTelecomText.textContent = `선택된 통신사: ${selectedTelecom}`;
            
            closeModal(telecomModal); // 통신사 모달 닫기
            openModal(authCodeModal); // 인증번호 모달 열기

            // 인증번호 입력 모달이 열릴 때마다 초기화
            phoneNumberInput.value = '';
            authCodeInput.value = '';
            verifyAuthCodeBtn.disabled = true;
            sendAuthCodeBtn.disabled = false; // 인증번호 재전송 가능하게
            clearInterval(countdownInterval); // 기존 타이머 중지
            timerDisplay.textContent = '03:00'; // 타이머 초기화
            timerDisplay.style.color = '#dc3545'; // 색상 초기화 (만료 시 빨간색)
        });
    });

    // 인증번호 입력 모달 닫기 버튼
    closeAuthCodeModal.addEventListener('click', function() {
        closeModal(authCodeModal);
        clearInterval(countdownInterval); // 타이머 중지
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', function(event) {
        if (event.target == telecomModal) {
            closeModal(telecomModal);
        }
        if (event.target == authCodeModal) {
            closeModal(authCodeModal);
            clearInterval(countdownInterval); // 타이머 중지
        }
    });

    // 휴대폰 번호 입력 시 '인증번호 전송' 버튼 활성화/비활성화
    phoneNumberInput.addEventListener('input', function() {
        // 숫자만 허용하고 10-11자리 확인
        const isValidPhone = /^\d{10,11}$/.test(phoneNumberInput.value.trim());
        sendAuthCodeBtn.disabled = !isValidPhone;
    });

    // 인증번호 전송 버튼 클릭
    sendAuthCodeBtn.addEventListener('click', function() {
        if (phoneNumberInput.value.trim() === '') {
            alert('휴대폰 번호를 입력해주세요.');
            return;
        }

        // 실제로는 여기서 서버에 인증번호 전송 요청을 보냅니다.
        // 여기서는 임시로 6자리 숫자 인증번호를 생성합니다. (아무거나 입력해도 되므로 실제 값은 중요하지 않음)
        // generatedAuthCode = Math.floor(100000 + Math.random() * 900000).toString(); // 실제 인증번호 생성 로직은 제거
        
        alert('인증번호가 전송되었습니다. 3분 이내로 입력해주세요.');

        // 타이머 시작
        secondsLeft = 180;
        clearInterval(countdownInterval); // 이전에 실행 중인 타이머가 있다면 중지
        startTimer();

        // 인증번호 입력 가능하도록 필드 활성화
        authCodeInput.disabled = false;
        authCodeInput.focus();
        sendAuthCodeBtn.disabled = true; // 인증번호 전송 후 비활성화
    });

    // 인증번호 타이머 함수
    function startTimer() {
        countdownInterval = setInterval(function() {
            const minutes = Math.floor(secondsLeft / 60);
            const remainingSeconds = secondsLeft % 60;
            timerDisplay.textContent = 
                `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

            if (secondsLeft <= 60) { // 1분 남았을 때 색상 변경
                timerDisplay.style.color = '#dc3545'; // 빨간색
            } else {
                timerDisplay.style.color = '#555'; // 기본 색상 (진한 회색)
            }

            if (secondsLeft <= 0) {
                clearInterval(countdownInterval);
                timerDisplay.textContent = '00:00';
                timerDisplay.style.color = '#dc3545';
                alert('인증 유효 시간이 만료되었습니다. 인증번호를 다시 요청해주세요.');
                verifyAuthCodeBtn.disabled = true;
                sendAuthCodeBtn.disabled = false; // 다시 전송 가능하게
            }
            secondsLeft--;
        }, 1000);
    }

    // 인증번호 입력 시 '인증하기' 버튼 활성화/비활성화
    authCodeInput.addEventListener('input', function() {
        // 6자리만 입력되면 '인증하기' 버튼 활성화 (아무거나 입력해도 되도록)
        verifyAuthCodeBtn.disabled = authCodeInput.value.trim().length !== 6 || secondsLeft <= 0;
    });

    // 인증하기 버튼 클릭
    verifyAuthCodeBtn.addEventListener('click', function() {
        const enteredCode = authCodeInput.value.trim();

        // 6자리만 입력되면 무조건 성공으로 간주
        if (enteredCode.length === 6) {
            alert('인증이 완료되었습니다!');
            clearInterval(countdownInterval); // 타이머 중지
            closeModal(authCodeModal); // 인증 모달 닫기
            // signup4.html로 페이지 이동
            window.location.href = 'signup4.html'; 
        } else {
            alert('6자리 인증번호를 정확히 입력해주세요.');
            authCodeInput.value = ''; // 잘못된 인증번호 입력 시 초기화
            verifyAuthCodeBtn.disabled = true;
        }
    });

    // 휴대폰 번호 입력 필드에 숫자만 입력되도록 강제
    phoneNumberInput.addEventListener('keypress', function(event) {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault(); // 숫자가 아니면 입력 방지
        }
    });

    // 인증번호 입력 필드에 숫자만 입력되도록 강제
    authCodeInput.addEventListener('keypress', function(event) {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault(); // 숫자가 아니면 입력 방지
        }
    });
});