window.addEventListener("load", init);

function init() {
    const container = document.getElementById('header-container');
    const header = bind();
    container.appendChild(header);

    // 검색 기능 요소를 가져와서 이벤트를 연결하는 함수를 호출합니다.
    setupSearchEvent();
    // 통합 서브메뉴 이벤트 리스너를 설정합니다.
    setupMegaMenuEvents();
}

function bind() {
    const header = document.createElement('header');
    header.classList.add('site-header');

    const topSection = document.createElement('div');
    topSection.classList.add('header-top');

    topSection.innerHTML = `
        <div class="header-left">
           <a href="./main.html"> <img src="./header&footer/assect/logo.PNG" alt="로고"> </a>
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
            <a class="logina" href="./login.html">로그인</a>
            <a class="logina" href="./signup.html">회원가입</a>
        </div>
    `;
    header.appendChild(topSection);

    const nav = document.createElement('nav');
    nav.innerHTML = `
    <div class="main-nav-container">
        <div class="nav-item">
            <a class="nav-button" href="./apply.html" data-category="apply"> 도우미 신청 </a>
        </div>
        <div class="nav-item">
            <a class="nav-button" href="./register.html" data-category="register"> 도우미 등록 </a>
        </div>
        <div class="nav-item">
            <a class="nav-button" href="./map.html" data-category="map">병원 찾기</a>
        </div>
        <div class="nav-item">
            <a class="nav-button" href="./qualify.html" data-category="qualify">자격증 / 확인서 </a>
        </div>
        <div class="nav-item">
            <a class="nav-button" href="./Q&A.html" data-category="qna">고객 지원</a>
        </div>
    </div>
    <div class="mega-menu-container">
        <div class="mega-menu-content">
            <!-- 도우미 신청 상세 메뉴 -->
            <div class="submenu-column" data-category="apply">
                <h4>도우미 신청 안내</h4>
                <a href="./apply-individual.html">개인 도우미 신청</a>
                <a href="./apply-corporate.html">기관 도우미 신청</a>
                <a href="./apply-guide.html">신청 가이드</a>
                <a href="./apply-requirements.html">신청 자격 요건</a>
            </div>
            <!-- 도우미 등록 상세 메뉴 -->
            <div class="submenu-column" data-category="register">
                <h4>도우미 등록</h4>
                <a href="./register-individual.html">개인 도우미 등록</a>
                <a href="./register-corporate.html">기관 도우미 등록</a>
                <a href="./register-guide.html">등록 가이드</a>
                <a href="./register-verification.html">등록 확인</a>
            </div>
            <!-- 병원 찾기 상세 메뉴 -->
            <div class="submenu-column" data-category="map">
                <h4>병원 찾기</h4>
                <a href="./map-search.html">병원 검색</a>
                <a href="./map-favorites.html">즐겨찾는 병원</a>
                <a href="./map-nearby.html">내 주변 병원</a>
                <a href="./map-reviews.html">병원 리뷰</a>
            </div>
            <!-- 자격증/확인서 상세 메뉴 -->
            <div class="submenu-column" data-category="qualify">
                <h4>자격증 / 확인서</h4>
                <a href="./qualify-cert.html">자격증 등록</a>
                <a href="./qualify-confirm.html">확인서 발급</a>
                <a href="./qualify-verification.html">자격증 진위확인</a>
                <a href="./qualify-history.html">발급 내역 조회</a>
            </div>
            <!-- 고객 지원 상세 메뉴 -->
            <div class="submenu-column" data-category="qna">
                <h4>고객 지원</h4>
                <a href="./Q&A-faq.html">자주 묻는 질문</a>
                <a href="./Q&A-contact.html">1:1 문의</a>
                <a href="./Q&A-guide.html">이용 가이드</a>
                <a href="./Q&A-notice.html">공지사항</a>
            </div>
        </div>
    </div>
    `;
    header.appendChild(nav);

    return header;
}

// 검색 이벤트 리스너를 설정하는 함수
function setupSearchEvent() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            console.log("'" + query + "'(으)로 검색합니다.");
            // 실제 검색 로직을 여기에 구현하세요.
        } else {
            console.log("검색어를 입력하세요.");
        }
    }

    // 버튼 클릭 시 검색
    searchButton.addEventListener('click', performSearch);

    // 엔터 키 입력 시 검색
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
}

// 통합 서브메뉴 (메가 메뉴) 이벤트 리스너를 설정하는 함수
function setupMegaMenuEvents() {
    const navElement = document.querySelector('nav');
    const megaMenuContainer = document.querySelector('.mega-menu-container');
    const navButtons = document.querySelectorAll('.nav-button');
    const submenuColumns = document.querySelectorAll('.submenu-column');

    let hideTimeout;

    // 메인 네비게이션 버튼에 마우스 진입 시
    navButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            clearTimeout(hideTimeout); // 숨김 타이머 취소

            // 모든 서브메뉴 컬럼 보이기 및 활성 상태 제거
            submenuColumns.forEach(column => {
                column.style.display = 'block';
                column.classList.remove('active');
            });

            // 모든 네비게이션 버튼의 활성 상태 제거
            navButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // 현재 호버된 버튼 활성화
            button.classList.add('active');

            // 현재 호버된 메뉴에 해당하는 상세 메뉴 컬럼에 활성 클래스 추가
            const category = button.dataset.category;
            const activeColumn = document.querySelector(`.submenu-column[data-category="${category}"]`);
            if (activeColumn) {
                activeColumn.classList.add('active');
            }

            // 메가 메뉴 컨테이너 보이기
            megaMenuContainer.style.display = 'block';
        });
    });

    // nav 요소에서 마우스 이탈 시 (메가 메뉴 숨김 지연)
    navElement.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
            // 메가 메뉴 숨기기
            megaMenuContainer.style.display = 'none';
            
            // 모든 네비게이션 버튼의 활성 상태 제거
            navButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // 모든 서브메뉴 컬럼의 활성 상태 제거
            submenuColumns.forEach(column => {
                column.classList.remove('active');
            });
        }, 200); // 200ms 지연 후 숨김
    });

    // nav 요소에 마우스 진입 시 (숨김 타이머 취소)
    navElement.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
    });
}
