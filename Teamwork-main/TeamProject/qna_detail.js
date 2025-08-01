document.addEventListener('DOMContentLoaded', function() {
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
            id: 101 - i,
            title: randomTitle,
            attachment: randomAttachment,
            writer: randomWriter,
            date: `2025-07-${randomDay.toString().padStart(2, '0')}`,
            views: randomViews,
            comments: randomComments,
            content: `이것은 ${101 - i}번 게시글의 더미 내용입니다. 실제 내용은 문의 제목에 따라 달라집니다.`,
        });
    }

    // URL에서 ID 파라미터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const qnaId = parseInt(urlParams.get('id'));
    
    // ID에 맞는 게시글 찾기
    const qnaItem = allQnaData.find(item => item.id === qnaId);

    // 게시글 데이터를 화면에 표시
    if (qnaItem) {
        document.getElementById('detail-title').textContent = `${qnaItem.title} - Q&A 상세 보기`;
        document.getElementById('qna-title').textContent = qnaItem.title;
        document.getElementById('qna-writer').textContent = `작성자: ${qnaItem.writer}`;
        document.getElementById('qna-date').textContent = `등록일: ${qnaItem.date}`;
        document.getElementById('qna-views').textContent = `조회수: ${qnaItem.views}`;
        document.getElementById('qna-content').textContent = qnaItem.content;
    } else {
        document.querySelector('.content').innerHTML = '<p style="text-align: center; padding: 50px;">해당 게시글을 찾을 수 없습니다.</p>';
    }

    // 댓글 기능 (클라이언트 측 시뮬레이션)
    const commentList = document.getElementById('comment-list');
    const commentInput = document.getElementById('comment-input');
    const submitCommentBtn = document.getElementById('submit-comment-btn');

    // 더미 댓글 데이터 (실제로는 게시글 ID에 맞는 댓글을 서버에서 가져옵니다)
    let comments = [
        { writer: '관리자', date: '2025-07-30', content: '안녕하세요. 고객님의 문의 사항은 담당 부서에 전달하여 확인 후 답변드리겠습니다. 잠시만 기다려주시면 감사하겠습니다.' },
        { writer: 'user1234', date: '2025-07-30', content: '저도 같은 문제가 발생하는데, 해결되면 알려주세요!' },
    ];

    function renderComments() {
        commentList.innerHTML = '';
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment-item');
            commentDiv.innerHTML = `
                <p class="comment-info"><strong>${comment.writer}</strong> | <span>${comment.date}</span></p>
                <p class="comment-content">${comment.content}</p>
            `;
            commentList.appendChild(commentDiv);
        });
    }

    submitCommentBtn.addEventListener('click', function() {
        const newCommentContent = commentInput.value.trim();
        if (newCommentContent) {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const newComment = {
                writer: '익명', // 실제로는 로그인한 유저 ID를 사용
                date: `${year}-${month}-${day}`,
                content: newCommentContent
            };
            comments.push(newComment);
            commentInput.value = '';
            renderComments();
        }
    });

    renderComments();
});