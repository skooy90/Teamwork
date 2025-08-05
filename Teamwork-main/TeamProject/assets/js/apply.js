document.addEventListener('DOMContentLoaded', function() {
    const infoItems = document.querySelectorAll('.info-item');
    const modal = document.getElementById('detailModal');
    const modalContentBody = document.getElementById('modalContentBody');
    const completionMessage = document.getElementById('completionMessage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDetails = document.getElementById('modalDetails');
    const modalImage = document.getElementById('modalImage');
    const closeButton = document.querySelector('.modal .close-button');
    const applyHelperBtn = document.getElementById('applyHelperBtn');
    const information = document.getElementById('information');

    const sidebarLinks = document.querySelectorAll('.caremate-sidebar-link');
    const tabButtons = document.querySelectorAll('.tab-button'); // 탭 버튼 요소 가져오기
    const caremateSections = document.querySelectorAll('.caremate-section');
    const currentCaremateLevelSpan = document.getElementById('currentCaremateLevel');

    // 모달 초기화 함수
    function resetModal() {
        modalContentBody.style.display = 'block';
        completionMessage.style.display = 'none';
        modalTitle.textContent = '';
        modalDetails.textContent = '';
        modalImage.src = '';
        modalImage.style.display = 'none';
    }

    // 정보 아이템 클릭 이벤트 리스너 (모달 열기)
    infoItems.forEach(item => {
        item.addEventListener('click', function() {
            resetModal();
            
            const infoData = JSON.parse(this.dataset.info);
            modalTitle.textContent = infoData.title;
            modalDetails.textContent = infoData.details;
            
            if (infoData.image) {
                modalImage.src = infoData.image;
                modalImage.style.display = 'block';
            } else {
                modalImage.style.display = 'none';
            }

            modal.style.display = 'flex';
        });
    });

    // 닫기 버튼 클릭 이벤트 리스너
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        resetModal();
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            resetModal();
        }
    });

    // 도우미 신청 버튼 클릭 이벤트 리스너
    applyHelperBtn.addEventListener('click', function() {
        modalContentBody.style.display = 'none';
        completionMessage.style.display = 'flex';
        
        setTimeout(() => {
            modal.style.display = 'none';
            resetModal();
        }, 3000); 
    });
    information.addEventListener('click', function() {
        window.location.href = 'information.html';
    });


    // ==============================================
    // 사이드바 및 탭 섹션 전환 로직
    // ==============================================

    // 섹션 활성화 및 UI 업데이트 함수
    function activateSection(sectionId) {
        // 모든 섹션 숨기기
        caremateSections.forEach(section => {
            section.style.display = 'none';
        });

        // 선택된 섹션 표시
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }

        // 사이드바 링크 활성화 상태 업데이트
        sidebarLinks.forEach(link => {
            link.classList.remove('current-page');
            if (link.dataset.targetSection === sectionId) {
                link.classList.add('current-page');
            }
        });

        // 탭 버튼 활성화 상태 업데이트
        tabButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.tab === sectionId) {
                button.classList.add('active');
            }
        });

        // Breadcrumb 업데이트
        const selectedLinkText = document.querySelector(`.caremate-sidebar-link[data-target-section="${sectionId}"] a`);
        if (selectedLinkText) {
            currentCaremateLevelSpan.textContent = selectedLinkText.textContent;
        }
    }

    // 사이드바 링크 클릭 이벤트 리스너
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 기본 링크 이동 방지
            const targetSectionId = this.dataset.targetSection;
            activateSection(targetSectionId);
        });
    });

    // 탭 버튼 클릭 이벤트 리스너
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSectionId = this.dataset.tab;
            activateSection(targetSectionId);
        });
    });

    // 초기 로드 시 활성화될 섹션 결정
    const initialSectionId = window.location.hash ? 
                             window.location.hash.substring(1) + '-section' : // #level1 -> level1-section
                             'caremate-level1-section';
    
    // 유효한 섹션 ID인지 확인 후 활성화 (URL 해시가 있다면 해당 섹션으로)
    if (document.getElementById(initialSectionId)) {
        activateSection(initialSectionId);
    } else {
        activateSection('caremate-level1-section'); // 기본값으로 Fallback
    }
});
