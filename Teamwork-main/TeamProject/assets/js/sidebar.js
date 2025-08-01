document.addEventListener('DOMContentLoaded', function() {
    const dropdownHeaders = document.querySelectorAll('.sidebar-nav .dropdown h3');
    const allDropdowns = document.querySelectorAll('.sidebar-nav .dropdown');

    // 1. 드롭다운 클릭 이벤트 처리
    dropdownHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const dropdown = this.closest('.dropdown');
            dropdown.classList.toggle('active');

            // 다른 드롭다운은 닫힘기능
            allDropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                    otherDropdown.classList.remove('active');
                }
            });
        });
    });

    // 2. 페이지 로드 시 현재 페이지에 해당하는 드롭다운 열기 및 하이라이트
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.sidebar-nav ul li a');

    sidebarLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        const lastPartOfCurrentPath = currentPath.substring(currentPath.lastIndexOf('/') + 1);

        // 링크의 href와 현재 URL의 파일명을 비교하여 'current-page' 클래스 적용
        // 예를 들어, qualify.html 페이지에서는 qualify.html 링크가 활성화되고,
        // qulify2.html 페이지에서는 qulify2.html 링크가 활성화됩니다.
        if (linkPath === lastPartOfCurrentPath) {
            link.closest('li').classList.add('current-page');

            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                parentDropdown.classList.add('active'); // 현재 페이지를 포함하는 드롭다운 열기
            }
        } else {
            link.closest('li').classList.remove('current-page'); // 다른 페이지의 경우 제거
        }
    });
});