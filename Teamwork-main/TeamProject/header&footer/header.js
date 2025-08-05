/**
 * header.js
 * 이 스크립트는 웹사이트 헤더를 동적으로 생성합니다. 여기에는 메가 메뉴가 있는 탐색 메뉴,
 * 검색 기능이 포함되며, PC 및 모바일 환경에 대한 반응형 동작을 처리합니다.
 * 특히, 모바일에서는 햄버거 메뉴를 통해 내비게이션을 토글합니다.
 * 또한 기본 브라우저 alert()를 대체하는 사용자 정의 모달 UI도 포함되어 있습니다.
 */

// 헤더를 초기화하기 위해 로드 이벤트 리스너를 추가합니다.
window.addEventListener("load", initheader);

/**
 * HTML 구조를 바인딩하고 이벤트 리스너를 설정하여 헤더를 초기화합니다.
 */
function initheader() {
    const container = document.getElementById('header-container');
    const header = bindheader();
    container.appendChild(header);

    // 검색 기능에 대한 이벤트 리스너를 설정합니다.
    setupSearchEvent();

    // 현재 페이지에 해당하는 탐색 버튼에 'active' 클래스를 설정합니다.
    setActiveNavButton();

    // 햄버거 메뉴 토글 기능을 설정합니다.
    setupMobileMenuToggle();

    // 화면 크기에 따라 메가 메뉴 이벤트를 설정합니다.
    setupMegaMenuEvents();

    // 창 크기 조절 시 이벤트 리스너를 다시 설정합니다.
    window.addEventListener('resize', () => {
        // 레이아웃 문제를 방지하기 위해 크기 조절 시 활성 클래스를 재설정합니다.
        const navButtons = document.querySelectorAll('.nav-button');
        const submenuColumns = document.querySelectorAll('.submenu-column');
        const navElement = document.querySelector('nav');
        const headerElement = document.querySelector('header');
        
        // PC 모드로 전환될 때 모바일 메뉴 상태를 초기화합니다.
        headerElement.classList.remove('menu-open');
        navButtons.forEach(btn => btn.classList.remove('active'));
        submenuColumns.forEach(column => column.classList.remove('active'));
        navElement.classList.remove('active');
        
        setupMegaMenuEvents(); // 새 화면 크기에 따라 이벤트를 다시 바인딩합니다.
        setActiveNavButton(); // 현재 페이지 버튼을 다시 활성화합니다.
    });
}

/**
 * 헤더 요소와 전체 HTML 구조를 생성합니다.
 * @returns {HTMLElement} 생성된 헤더 요소.
 */
function bindheader() {
    const header = document.createElement('header');
    header.classList.add('site-header');

    const topSection = document.createElement('div');
    topSection.classList.add('header-top');

    // 로고, 검색창, 로그인/회원가입 링크, 모바일 메뉴 토글 버튼이 있는 헤더 상단 섹션입니다.
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
            <button id="mobile-menu-toggle" class="mobile-menu-toggle">
                <span class="hamburger-icon"></span>
            </button>
        </div>
    `;
    header.appendChild(topSection);

    // 메인 탐색 섹션 (PC에서는 메가 메뉴, 모바일에서는 햄버거 메뉴를 통해 표시)
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
                <a href="../Apply/F1-service.html">도우미 신청</a>
                <a href="../Apply/apply_guide.html">신청 가이드</a>
                <a href="../Apply/apply.html">케어메이트 정보</a>
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

/**
 * 브라우저의 alert() 대신 사용자 정의 모달 UI를 생성하고 표시합니다.
 * @param {string} message 모달에 표시할 메시지.
 */
function showModal(message) {
    // 중복을 방지하기 위해 기존 모달을 제거합니다.
    const existingModal = document.getElementById('custom-modal');
    if (existingModal) existingModal.remove();

    // 모달 컨테이너를 생성하고 스타일을 적용합니다.
    const modalContainer = document.createElement('div');
    modalContainer.id = 'custom-modal';
    modalContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    // 모달 콘텐츠 상자를 생성합니다.
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background-color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
        max-width: 350px;
        width: 90%;
        font-family: 'Inter', sans-serif;
    `;

    // 메시지 문단을 생성합니다.
    const modalMessage = document.createElement('p');
    modalMessage.textContent = message;
    modalMessage.style.cssText = `
        margin: 0 0 20px 0;
        font-size: 16px;
        color: #333;
    `;

    // 닫기 버튼을 생성합니다.
    const closeButton = document.createElement('button');
    closeButton.textContent = '확인';
    closeButton.style.cssText = `
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: #ffcb00;
        color: white;
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.2s ease;
    `;
    // 모달 닫기 및 호버 효과에 대한 이벤트 리스너를 추가합니다.
    closeButton.addEventListener('click', () => modalContainer.remove());
    closeButton.addEventListener('mouseover', () => closeButton.style.backgroundColor = '#e0a800');
    closeButton.addEventListener('mouseout', () => closeButton.style.backgroundColor = '#ffcb00');


    // 요소를 모달에 추가합니다.
    modalContent.appendChild(modalMessage);
    modalContent.appendChild(closeButton);
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);
}

/**
 * 검색 입력 및 버튼에 대한 이벤트 리스너를 설정합니다.
 */
function setupSearchEvent() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            showModal("'" + query + "'(으)로 검색합니다.");
        } else {
            showModal("검색어를 입력하세요.");
        }
    }

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
}

/**
 * 현재 URL에 해당하는 탐색 버튼에 'active' 클래스를 추가합니다.
 * 또한 모바일 보기용으로 관련 하위 메뉴 열을 활성화합니다.
 */
function setActiveNavButton() {
    const currentPath = window.location.pathname;
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        const buttonPath = new URL(button.href).pathname;
        if (currentPath.includes(buttonPath) && buttonPath !== '/') {
            button.classList.add('active');
            const category = button.dataset.category;
            const submenuColumn = document.querySelector(`.submenu-column[data-category="${category}"]`);
            if (submenuColumn) {
                submenuColumn.classList.add('active');
            }
        }
    });
}

// PC 환경에서 탐색 항목에 마우스가 올라갔을 때의 이벤트 핸들러입니다.
const handlePcMouseEnter = (e) => {
    // 햄버거 메뉴가 열려있을 때는 PC 호버 이벤트를 무시합니다.
    if (window.innerWidth < 768) return;

    clearTimeout(window.hideTimeout);
    const navElement = document.querySelector('nav');
    
    // 모든 상태를 재설정합니다.
    const navButtons = document.querySelectorAll('.nav-button');
    const submenuColumns = document.querySelectorAll('.submenu-column');
    navButtons.forEach(btn => btn.classList.remove('active'));
    submenuColumns.forEach(column => column.classList.remove('active'));

    // 호버된 항목에 대해 활성 상태를 설정합니다.
    const targetItem = e.target.closest('.nav-item');
    if (targetItem) {
        const button = targetItem.querySelector('.nav-button');
        if (button) {
            button.classList.add('active');
            const category = button.dataset.category;
            const activeColumn = document.querySelector(`.submenu-column[data-category="${category}"]`);
            if (activeColumn) {
                activeColumn.classList.add('active');
            }
        }
        navElement.classList.add('active');
    }
};

// PC 환경에서 탐색 영역에서 마우스가 나갔을 때의 이벤트 핸들러입니다.
const handlePcMouseLeave = () => {
    // 햄버거 메뉴가 열려있을 때는 PC 호버 이벤트를 무시합니다.
    if (window.innerWidth < 768) return;

    const navElement = document.querySelector('nav');
    window.hideTimeout = setTimeout(() => {
        navElement.classList.remove('active');
        document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.submenu-column').forEach(column => column.classList.remove('active'));
        setActiveNavButton(); // 현재 페이지의 버튼을 다시 활성화합니다.
    }, 200);
};

// 모바일 환경에서 햄버거 메뉴 토글 버튼 클릭 이벤트 핸들러
function setupMobileMenuToggle() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const siteHeader = document.querySelector('.site-header');

    mobileMenuToggle.addEventListener('click', () => {
        siteHeader.classList.toggle('menu-open');
    });
}

// 모바일 환경에서 메뉴 버튼 클릭 이벤트 핸들러
const handleMobileClick = (e) => {
    e.preventDefault(); // 페이지 이동 방지
    const button = e.currentTarget;
    const category = button.dataset.category;
    
    const submenuColumns = document.querySelectorAll('.submenu-column');
    const navButtons = document.querySelectorAll('.nav-button');
    
    // 현재 활성화된 버튼과 하위 메뉴를 확인
    const isActive = button.classList.contains('active');
    
    // 모든 버튼과 하위 메뉴의 active 클래스 제거
    navButtons.forEach(btn => btn.classList.remove('active'));
    submenuColumns.forEach(column => column.classList.remove('active'));
    
    // 현재 클릭된 버튼이 이미 활성화되어 있었으면 아무것도 하지 않고 함수 종료
    if (isActive) {
        return;
    }
    
    // 클릭된 버튼과 해당 하위 메뉴 활성화
    button.classList.add('active');
    const activeColumn = document.querySelector(`.submenu-column[data-category="${category}"]`);
    if (activeColumn) {
        activeColumn.classList.add('active');
    }
};


/**
 * 현재 화면 크기에 따라 메가 메뉴 이벤트 리스너를 설정합니다.
 * PC(>= 768px) 또는 모바일(< 768px)인지 감지합니다.
 */
function setupMegaMenuEvents() {
    const navItems = document.querySelectorAll('.nav-item');
    const navButtons = document.querySelectorAll('.nav-button');
    const navElement = document.querySelector('nav');
    const megaMenuContainer = document.querySelector('.mega-menu-container');

    // 먼저, 중복을 방지하기 위해 기존의 모든 이벤트 리스너를 제거합니다.
    navItems.forEach(item => {
        item.removeEventListener('mouseenter', handlePcMouseEnter);
    });
    navButtons.forEach(button => {
        button.removeEventListener('click', handleMobileClick); // 기존 모바일 클릭 이벤트 리스너 제거
    });

    megaMenuContainer.removeEventListener('mouseenter', () => clearTimeout(window.hideTimeout));
    navElement.removeEventListener('mouseleave', handlePcMouseLeave);
    megaMenuContainer.removeEventListener('mouseleave', handlePcMouseLeave);
    

    if (window.innerWidth >= 768) {
        // PC 환경: 호버 효과를 위해 mouseenter/mouseleave를 사용합니다.
        navItems.forEach(item => {
            item.addEventListener('mouseenter', handlePcMouseEnter);
        });
        navElement.addEventListener('mouseleave', handlePcMouseLeave);
        megaMenuContainer.addEventListener('mouseenter', () => clearTimeout(window.hideTimeout));
        megaMenuContainer.addEventListener('mouseleave', handlePcMouseLeave);
    } else {
        // 모바일 환경: 클릭 효과를 위해 click 이벤트를 사용합니다.
        navButtons.forEach(button => {
            button.addEventListener('click', handleMobileClick);
        });
    }
}