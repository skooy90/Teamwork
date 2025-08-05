  document.addEventListener('DOMContentLoaded', function() {
            const requiredCheckboxes = document.querySelectorAll('.required-agreement');
            const nextButton = document.getElementById('nextButton');

            // 모든 필수 약관이 동의되었는지 확인하는 함수
            function checkAllRequiredAgreed() {
                let allAgreed = true;
                requiredCheckboxes.forEach(checkbox => {
                    if (!checkbox.checked) {
                        allAgreed = false;
                    }
                });
                nextButton.disabled = !allAgreed; // 모든 필수 약관 동의 시에만 '다음' 버튼 활성화
            }

            // 각 필수 약관 체크박스에 이벤트 리스너 추가
            requiredCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', checkAllRequiredAgreed);
            });

            // '다음' 버튼 클릭 이벤트 (실제 회원가입 다음 단계로 이동)
            nextButton.addEventListener('click', function() {
                if (!this.disabled) {
                    // 여기에 다음 회원가입 단계로 이동하는 로직을 추가합니다.
                    // 예: window.location.href = 'signup_step2.html';
                    console.log('다음 단계로 이동합니다.');
                    window.location.href = 'signup2.html'; // signup2.html로 이동
                }
            });

            // '상세 보기' 버튼 클릭 이벤트 (모달 또는 새 페이지로 약관 내용 표시)
            document.querySelectorAll('.view-details-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const agreementText = this.previousElementSibling.querySelector('.agreement-text').textContent;
                    alert(`'${agreementText}' 약관 상세 내용을 표시합니다.`); // 임시 알림
                    // 실제 구현 시 모달을 열거나 새 페이지로 이동하여 약관 내용을 보여줍니다.
                });
            });

            // 초기 로드 시 '다음' 버튼 상태 설정
            checkAllRequiredAgreed();
        });

        