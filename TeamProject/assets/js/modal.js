// js/main.js

function openNotice(event, type, title, date) {
    event.preventDefault(); // <a> 태그의 기본 동작 (페이지 상단으로 이동)을 막습니다.

    // 여기부터 모달 창을 띄우는 로직을 활성화합니다.
    const modal = document.createElement('div');
    modal.classList.add('notice-modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h3>[${type}] ${title}</h3>
            <p><strong>날짜:</strong> ${date}</p>
            <div class="notice-full-content">
                <p>여기에 해당 공지사항의 상세 내용이 들어갑니다.</p>
                <p>실제로는 서버에서 데이터를 가져와 표시하거나, 미리 숨겨진 HTML 요소를 보여줄 수 있습니다.</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // 모달 띄우기 (CSS로 opacity/visibility 제어)
    // transition을 위해 약간의 딜레이 후 active 클래스 추가
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    // 닫기 버튼 이벤트
    modal.querySelector('.close-button').addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300); // 애니메이션 후 DOM에서 제거
    });

    // 모달 외부 클릭 시 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300); // 애니메이션 후 DOM에서 제거
        }
    });
}