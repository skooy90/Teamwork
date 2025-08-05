document.addEventListener('DOMContentLoaded', function() {
    const qnaTableBody = document.getElementById('qnaTableBody');
    const paginationControls = document.getElementById('paginationControls');
    const itemsPerPage = 10;
    
    // 1번부터 100번까지 새로운 더미 데이터 생성
    const allQnaData = [];
    const titles = [
        '로그인 시 오류가 발생하는데 어떻게 해결하나요?',
        '활동 보고서 양식을 다운로드 받을 수 있을까요?',
        '회원가입 절차가 너무 복잡해요',
        '제공하는 돌봄 서비스 종류가 궁금합니다.',
        '첨부파일이 열리지 않습니다',
        '비밀번호를 분실했습니다',
        '사이트 이용 중 오류 발생 문의',
        '돌봄 서비스 신청은 어떻게 하나요?',
        '활동 수당 지급일이 궁금합니다',
        '사이트에 건의하고 싶은 점이 있습니다',
        '서비스 이용료 결제 관련 문의',
        '케어메이트 자격 조건에 대해 알려주세요',
        '문의글이 보이지 않습니다',
        '긴급 돌봄 서비스 이용 안내',
        '모바일 환경에서 글쓰기 버튼이 안보여요',
        '개인정보 수정은 어디서 하나요?',
        '환불 규정에 대해 알고 싶습니다',
        '사진 첨부가 되지 않아요',
        '이용후기 작성 시 포인트 지급되나요?',
        '담당자에게 직접 연락하고 싶습니다',
        '어르신 돌봄 서비스 비용이 궁금합니다',
        '새로운 기능 제안',
        '사이트 접속이 느려요',
        '채팅 기능 오류 문의',
        '아이디 찾기',
        '계정 삭제 요청',
        '정기 점검 시간 안내',
        '결제 오류 환불 문의',
        '파트너 신청 방법',
        '커뮤니티 게시판 이용 규칙',
        '공지사항 알림 설정',
        '푸시 알림이 오지 않아요',
        '이메일 주소 변경 문의',
        '서비스 지역 확대 요청',
        '이벤트 참여 방법',
        '오류 제보',
        '홈페이지 디자인 건의',
        '자주하는 질문 추가 요청',
        '회원 탈퇴 방법',
        '개인 정보 보호 정책',
        '모바일 앱 출시 계획',
        '돌봄 활동 시간 기록 방법',
        '결제 수단 추가 요청',
        '평가 시스템에 대한 질문',
        '서비스 예약 방법',
        '문의 내역 확인 방법',
        '담당자 연결 요청',
        '사이트 보안에 대한 질문',
        '서비스 이용 후기 작성 방법',
        '돌봄 매칭 시스템에 대한 문의',
    ];
    
    const writers = ['user123', 'care_kim', 'newbie_park', 'client_lee', 'user456', 'lost_pwd', 'tester', 'mother_jo', 'helper_kim', 'suggestion_you', 'payer_lee', 'future_care', 'user_error', 'emergency_user', 'mobile_dev', 'my_info', 'refund_me', 'photographer', 'review_lover', 'contact_user'];

    for (let i = 1; i <= 100; i++) {
        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        const randomWriter = writers[Math.floor(Math.random() * writers.length)];
        const randomDay = Math.floor(Math.random() * 30) + 1;
        const randomViews = Math.floor(Math.random() * 200) + 20;
        const randomComments = Math.floor(Math.random() * 5);
        const randomAttachment = Math.random() > 0.8;
        
        allQnaData.push({
            id: 101 - i, // 최신글이 상단에 오도록 id 내림차순 정렬
            title: randomTitle,
            attachment: randomAttachment,
            writer: randomWriter,
            date: `2025-07-${randomDay.toString().padStart(2, '0')}`,
            views: randomViews,
            comments: randomComments,
            content: `이것은 ${101 - i}번 게시글의 더미 내용입니다. 실제 내용은 문의 제목에 따라 달라집니다.`,
        });
    }

    let currentPage = 1;

    // 테이블 데이터 렌더링 함수
    function renderTable(page) {
        qnaTableBody.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = allQnaData.slice(start, end);

        paginatedData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="col-id">${item.id}</td>
                <td class="col-title"><a href="qna_detail.html?id=${item.id}">${item.title}</a></td>
                <td class="col-attachment"> ${item.attachment ? '📄' : ''}</td>
                <td class="col-writer">${item.writer}</td>
                <td class="col-date">${item.date}</td>
                <td class="col-comments">${item.comments}</td>
                <td class="col-views">${item.views}</td>
            `;
            qnaTableBody.appendChild(row);
        });
    }

    // 페이지네이션 컨트롤 렌더링 함수 (기존 로직 유지)
    function renderPaginationControls() {
        paginationControls.innerHTML = '';
        const totalPages = Math.ceil(allQnaData.length / itemsPerPage);
        const maxPageLinks = 5; // 한 번에 표시할 페이지 링크 수
        const currentBlock = Math.ceil(currentPage / maxPageLinks);
        const startPage = (currentBlock - 1) * maxPageLinks + 1;
        const endPage = Math.min(startPage + maxPageLinks - 1, totalPages);

        // 이전 페이지 버튼
        const prevLink = document.createElement('a');
        prevLink.href = '#';
        prevLink.classList.add('page-link', 'prev');
        prevLink.textContent = '◀';
        if (currentPage > 1) {
            prevLink.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage--;
                renderTable(currentPage);
                renderPaginationControls();
            });
        } else {
            prevLink.classList.add('disabled');
        }
        paginationControls.appendChild(prevLink);

        // 페이지 번호 링크
        for (let i = startPage; i <= endPage; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.classList.add('page-link');
            pageLink.textContent = i;
            if (i === currentPage) {
                pageLink.classList.add('active');
            }
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                renderTable(currentPage);
                updateActivePaginationLink();
            });
            paginationControls.appendChild(pageLink);
        }

        // 다음 페이지 버튼
        const nextLink = document.createElement('a');
        nextLink.href = '#';
        nextLink.classList.add('page-link', 'next');
        nextLink.textContent = '▶';
        if (currentPage < totalPages) {
            nextLink.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage++;
                renderTable(currentPage);
                renderPaginationControls();
            });
        } else {
            nextLink.classList.add('disabled');
        }
        paginationControls.appendChild(nextLink);
    }
    
    // 활성화된 페이지 링크 업데이트 함수
    function updateActivePaginationLink() {
        document.querySelectorAll('.page-link').forEach(link => {
            link.classList.remove('active');
        });
        const pageLinks = document.querySelectorAll('.page-link:not(.prev):not(.next)');
        if (pageLinks[currentPage - 1]) {
            pageLinks[currentPage - 1].classList.add('active');
        }
    }

    renderTable(currentPage);
    renderPaginationControls();
});