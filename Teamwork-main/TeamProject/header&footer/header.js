window.addEventListener("load", initheader);

function initheader() {
    const container = document.getElementById('header-container');
    const header = bindheader();
    container.appendChild(header);

    setupSearchEvent();
    
    // 처음 로드 시 이벤트 리스너 설정
    setupMegaMenuEvents();

    // 화면 크기 변경 시 이벤트 리스너를 재설정
    window.addEventListener('resize', setupMegaMenuEvents);
}

function bindheader() {
    const header = document.createElement('header');
    header.classList.add('site-header');

    const topSection = document.createElement('div');
    topSection.classList.add('header-top');

    topSection.innerHTML = `
        <div class="header-left">
           <a href="../Main/main.html"> <img src="../../header&footer/assect/logo.PNG" alt="로고" loading="lazy" onerror="this.style.display='none'"> </a>
        </div>
        <div class="header-right">
            <div class="search-container">
                <input type="text" id="search-input" placeholder=" 검색창 ">
                <button id="search-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </button>
            </div>
            <a class="logina" href="../login/login.html">로그인</a>
            <a class="logina" href="../login/signup.html">회원가입</a>
        </div>
    `;
    header.appendChild(topSection);

    const nav = document.createElement('nav');
    nav.innerHTML = `
    <div class="main-nav-container">
        <div class="nav-item">
            <a class="nav-button" href="../Apply/apply.html" data-category="apply"> 도우미 신청 </a>
        </div>
        <div class="nav-item">
            <a class="nav-button" href="../Register/register.html" data-category="register"> 도우미 등록 </a>
        </div>
        <div class="nav-item">
            <a class="nav-button" href="../Map/map.html" data-category="map">병원 찾기</a>
        </div>
        <div class="nav-item">
            <a class="nav-button" href="../Qualify/qualify.html" data-category="qualify">자격증 / 확인서 </a>
        </div>
        <div class="nav-item">
            <a class="nav-button" href="../Qna/Q&A.html" data-category="qna">고객 지원</a>
        </div>
    </div>
    <div class="mega-menu-container">
        <div class="mega-menu-content">
            <div class="submenu-column" data-category="apply">
                <h4>도우미 신청 안내</h4>
                <a href="../Apply/apply.html">도우미 신청</a>
                <a href="../Apply/apply_guide.html">신청 가이드</a>
                <a href="../Apply/information.html">신청 목록 확인</a>
            </div>
            <div class="submenu-column" data-category="register">
                <h4>도우미 등록</h4>
                <a href="../Register/register.html">도우미 등록</a>
                <a href="../Qualify/qualify_guide.html">도우미 등록 자격요건</a>
            </div>
            <div class="submenu-column" data-category="map">
                <h4>병원 찾기</h4>
                <a href="../Map/map.html">내 주변 병원 찾기</a>
            </div>
            <div class="submenu-column" data-category="qualify">
                <h4>자격증 / 확인서</h4>
                <a href="../Qualify/qualify_guide.html">자격증 발급</a>
                <a href="../Qualify/qualify.html">자격증 발급 신청</a>
                <a href="../Qualify/qulify2.html">자격증 발급 신청내역 조회</a>
                <a href="../Qualify/certificate_issue.html">확인서 발급 신청</a>
                <a href="../Qualify/certificate_history.html">확인서 발급 신청내역 조회</a>
            </div>
            <div class="submenu-column" data-category="qna">
                <h4>고객 지원</h4>
                <a href="../Qna/notice.html">공지 사항</a>
                <a href="../Qna/Q&A.html">자주 묻는 질문</a>
                <a href="../Qna/guide.html">사이트 이용 안내</a>
            </div>
        </div>
    </div>
    `;
    header.appendChild(nav);

    return header;
}

function setupSearchEvent() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            alert("'" + query + "'(으)로 검색합니다.");
        } else {
            alert("검색어를 입력하세요.");
        }
    }

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
}

// 이벤트 핸들러를 관리할 전역 변수
let isPcMode = false;
let isMobileMode = false;

// PC 환경용 이벤트 핸들러 함수들
const handlePcMouseEnter = (e) => {
    clearTimeout(window.hideTimeout);
    const megaMenuContainer = document.querySelector('.mega-menu-container');
    const navButtons = document.querySelectorAll('.nav-button');
    const submenuColumns = document.querySelectorAll('.submenu-column');

    navButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    submenuColumns.forEach(column => column.classList.remove('active'));
    const category = e.target.dataset.category;
    const activeColumn = document.querySelector(`.submenu-column[data-category="${category}"]`);
    if (activeColumn) {
        activeColumn.classList.add('active');
    }
    megaMenuContainer.style.display = 'block';
};

const handlePcMouseLeave = () => {
    const megaMenuContainer = document.querySelector('.mega-menu-container');
    const navButtons = document.querySelectorAll('.nav-button');
    const submenuColumns = document.querySelectorAll('.submenu-column');
    window.hideTimeout = setTimeout(() => {
        megaMenuContainer.style.display = 'none';
        navButtons.forEach(btn => btn.classList.remove('active'));
        submenuColumns.forEach(column => column.classList.remove('active'));
    }, 200);
};

// 모바일 환경용 이벤트 핸들러 함수
const handleMobileClick = (e) => {
    e.preventDefault(); // 페이지 이동 방지
    
    const navButtons = document.querySelectorAll('.nav-button');
    const megaMenuContainer = document.querySelector('.mega-menu-container');
    const submenuColumns = document.querySelectorAll('.submenu-column');

    const button = e.currentTarget;
    const category = button.dataset.category;
    const targetColumn = document.querySelector(`.submenu-column[data-category="${category}"]`);
    
    // 버튼의 활성 상태 토글
    const isActive = button.classList.contains('active');

    // 모든 버튼과 서브메뉴 비활성화
    navButtons.forEach(btn => btn.classList.remove('active'));
    submenuColumns.forEach(col => col.classList.remove('active'));
    megaMenuContainer.classList.remove('active');

    if (!isActive) {
        button.classList.add('active');
        megaMenuContainer.classList.add('active');
        if (targetColumn) {
            targetColumn.classList.add('active');
        }
    }
};

// 이벤트 핸들러를 화면 크기에 따라 설정하는 함수
function setupMegaMenuEvents() {
    const navButtons = document.querySelectorAll('.nav-button');
    const navElement = document.querySelector('nav');
    const megaMenuContainer = document.querySelector('.mega-menu-container');
    const submenuColumns = document.querySelectorAll('.submenu-column');

    // 기존 이벤트 리스너 모두 제거
    navButtons.forEach(btn => {
        btn.removeEventListener('mouseenter', handlePcMouseEnter);
        btn.removeEventListener('click', handleMobileClick);
    });
    navElement.removeEventListener('mouseleave', handlePcMouseLeave);
    
    // 화면 크기에 따라 새로운 이벤트 리스너 설정
    if (window.innerWidth >= 768) {
        // PC 환경
        navButtons.forEach(btn => {
            btn.addEventListener('mouseenter', handlePcMouseEnter);
        });
        navButtons.forEach(btn => btn.addEventListener('click', (e) => {
            // PC에서는 클릭 시 페이지 이동이 기본 동작
        }));
        megaMenuContainer.addEventListener('mouseenter', () => clearTimeout(window.hideTimeout));
        megaMenuContainer.addEventListener('mouseleave', handlePcMouseLeave);
        navElement.addEventListener('mouseleave', handlePcMouseLeave);
        // 모바일에서 활성화된 메뉴가 있다면 초기화
        navButtons.forEach(btn => btn.classList.remove('active'));
        submenuColumns.forEach(col => col.classList.remove('active'));
    } else {
        // 모바일 환경
        navButtons.forEach(btn => {
            btn.addEventListener('click', handleMobileClick);
        });
        // PC에서 활성화된 메뉴가 있다면 초기화
        navButtons.forEach(btn => btn.classList.remove('active'));
        submenuColumns.forEach(col => col.classList.remove('active'));
    }
}