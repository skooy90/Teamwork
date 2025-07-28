document.addEventListener('DOMContentLoaded', function() {
    const infoItems = document.querySelectorAll('.info-item');
    const modal = document.getElementById('detailModal');
    const modalContentBody = document.getElementById('modalContentBody'); // 기존 모달 내용 컨테이너
    const completionMessage = document.getElementById('completionMessage'); // 완료 메시지 컨테이너
    const modalTitle = document.getElementById('modalTitle');
    const modalDetails = document.getElementById('modalDetails');
    const modalImage = document.getElementById('modalImage');
    const closeButton = document.querySelector('.modal .close-button');
    const applyHelperBtn = document.getElementById('applyHelperBtn'); // 도우미 신청 버튼

    // 모달 초기화 함수
    function resetModal() {
        modalContentBody.style.display = 'block'; // 기존 내용 표시
        completionMessage.style.display = 'none'; // 완료 메시지 숨김
        modalTitle.textContent = '';
        modalDetails.textContent = '';
        modalImage.src = '';
        modalImage.style.display = 'none';
    }

    // 정보 아이템 클릭 이벤트 리스너
    infoItems.forEach(item => {
        item.addEventListener('click', function() {
            resetModal(); // 모달 열기 전에 초기화
            
            const infoData = JSON.parse(this.dataset.info);
            modalTitle.textContent = infoData.title;
            modalDetails.textContent = infoData.details; // <-- 이 부분을 infoData.details로 수정했습니다.
            
            if (infoData.image) {
                modalImage.src = infoData.image;
                modalImage.style.display = 'block';
            } else {
                modalImage.style.display = 'none';
            }

            modal.style.display = 'flex'; // 모달 표시
        });
    });

    // 닫기 버튼 클릭 이벤트 리스너
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none'; // 모달 숨기기
        resetModal(); // 모달 닫을 때 초기화
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            resetModal(); // 모달 닫을 때 초기화
        }
    });

    // 도우미 신청 버튼 클릭 이벤트 리스너
    applyHelperBtn.addEventListener('click', function() {
        modalContentBody.style.display = 'none'; // 기존 모달 내용 숨김
        completionMessage.style.display = 'flex'; // 완료 메시지 표시 (가운데 정렬 위해 flex)
        
        // 3초 후 모달 자동 닫기 (선택 사항)
        setTimeout(() => {
            modal.style.display = 'none';
            resetModal(); // 모달 닫을 때 초기화
        }, 3000); 
    });
});