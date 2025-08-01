document.addEventListener('DOMContentLoaded', () => {
    // 1. 이 'applyButton' ID가 HTML 파일의 버튼 ID와 정확히 일치하는지 확인!
    const applyButton = document.getElementById('applyButton'); 
    
    // 2. 이 'modal' ID가 HTML 파일의 모달 창 ID와 정확히 일치하는지 확인!
    const modal = document.getElementById('modal');
    
    // 3. 이 'close-modal' 클래스가 HTML 파일의 닫기 버튼 클래스와 정확히 일치하는지 확인!
    const closeModalSpan = document.querySelector('.close-modal');

    // 4. applyButton이 null이 아닌지 확인. 즉, 버튼을 찾았는지 확인.
    // 콘솔에 console.log(applyButton); 을 추가해서 확인해볼 수 있습니다.
    console.log(applyButton);

    if (applyButton) {
        applyButton.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    if (closeModalSpan) {
        closeModalSpan.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});