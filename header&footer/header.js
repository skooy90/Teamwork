window.addEventListener("load", init);

function init() {
    const container = document.getElementById('header-container');
    const header = bind();
    container.appendChild(header);

    // 검색 기능 요소를 가져와서 이벤트를 연결하는 함수를 호출합니다.
    setupSearchEvent();
}

function bind() {
    const header = document.createElement('header');
    header.classList.add('site-header');

    // 1. 비표준 태그인 <top>을 <div>로 변경하고 클래스를 부여했습니다.
    const topSection = document.createElement('div');
    topSection.classList.add('header-top');

    // 2. 검색창 부분을 수정하고, 'hearder-' 오타를 'header-'로 바로잡았습니다.
    topSection.innerHTML = `
        <div class="header-left">
            <img src="assect/logo.PNG" alt="로고">
            <h1>지역유치원</h1>
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
            <a href="/login.html">로그인</a>
            <a href="/contact">회원가입</a>
        </div>
    `;
    header.appendChild(topSection);

    const nav = document.createElement('nav');
    nav.innerHTML = `
    <div>
        <a href="/">홈</a>
        <a href="/about">소개</a>
        <a href="/contact">연락처</a>
    </div>
    `;
    header.appendChild(nav);

    return header;
}

// 3. 검색 이벤트 리스너를 설정하는 함수를 추가했습니다.
function setupSearchEvent() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            alert("'" + query + "'(으)로 검색합니다.");
            // 실제 검색 로직을 여기에 구현하세요.
        } else {
            alert("검색어를 입력하세요.");
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