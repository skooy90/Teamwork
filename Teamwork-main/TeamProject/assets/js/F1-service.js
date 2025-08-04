document.addEventListener('DOMContentLoaded', () => {
    // HTML에서 필요한 요소들을 가져옵니다.
    const applyButton = document.getElementById('applyButton'); // '도우미 신청하기' 버튼
    const modal = document.getElementById('modal');             // 모달 창 자체
    const closeModalSpan = document.querySelector('.close-modal'); // 모달 창의 닫기(X) 버튼
    
    // 모달 창 내의 버튼들을 가져옵니다.
    const goToMainBtn = document.getElementById('goToMainBtn');       // '메인으로 이동' 버튼
    const goToStatusBtn = document.getElementById('goToStatusBtn');   // '신청 현황 보러가기' 버튼

    // '도우미 신청하기' 버튼이 있을 경우, 클릭 이벤트를 추가합니다.
    if (applyButton) {
        applyButton.addEventListener('click', () => {
            // 버튼 클릭 시 모달 창에 'show' 클래스를 추가하여 보이게 합니다.
            modal.classList.add('show');
        });
    }

    // 모달 창의 'X' 버튼이 있을 경우, 클릭 이벤트를 추가합니다.
    if (closeModalSpan) {
        closeModalSpan.addEventListener('click', () => {
            // 'X' 버튼 클릭 시 'show' 클래스를 제거하여 모달 창을 숨깁니다.
            modal.classList.remove('show');
        });
    }
    
    // 모달 창 바깥 영역을 클릭했을 때 모달을 닫는 이벤트를 추가합니다.
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });

    // '메인으로 이동' 버튼이 있을 경우, 클릭 이벤트를 추가합니다.
    if (goToMainBtn) {
        goToMainBtn.addEventListener('click', () => {
            // 올바른 상대 경로로 수정
            window.location.href = '../Apply/live.html';
        });
    }

    // '신청 현황 보러가기' 버튼이 있을 경우, 클릭 이벤트를 추가합니다.
    if (goToStatusBtn) {
        goToStatusBtn.addEventListener('click', () => {
            window.location.href = '신청현황페이지_경로.html';
        });
    }
});