// register_qualify.js
document.addEventListener('DOMContentLoaded', function() {
    // header.js와 footer.js에서 헤더와 푸터를 동적으로 로드합니다.
    // 이 코드는 header.js와 footer.js가 이미 이 역할을 하고 있으므로
    // HTML에 스크립트 태그만 올바르게 추가하면 됩니다.

    // 사이드바 현재 페이지 활성화 로직은 sidebar.js가 처리합니다.

    const nextButton = document.getElementById('next-button');

    nextButton.addEventListener('click', function() {
        // '다음' 버튼 클릭 시 다음 단계 페이지로 이동
        // 예: 자격증 업로드 페이지, 개인정보 입력 페이지 등으로 이동
        // 여기서는 예시로 'register.html'로 이동하도록 설정합니다.
        alert('도우미 등록 단계로 이동합니다.');
        window.location.href = './register.html';
    });
});