       document.addEventListener('DOMContentLoaded', function() {
            const qnaListElement = document.getElementById('qnaList');
            const paginationControls = document.getElementById('paginationControls');
            const itemsPerPage = 5; // 한 페이지에 표시될 FAQ 항목 수

            // 더미 FAQ 데이터 (Q&A와 다른 내용)
            const allFaqData = [
                { id: 1, question: '회원가입은 어떻게 하나요?', answer: '회원가입은 홈페이지 우측 상단의 "회원가입" 버튼을 클릭하여 진행할 수 있습니다. 본인 인증 후 간단한 정보 입력으로 가입이 완료됩니다.' },
                { id: 2, question: '로그인이 되지 않아요.', answer: '아이디 또는 비밀번호가 올바른지 확인해주세요. 비밀번호를 잊으셨다면 "비밀번호 찾기"를 이용해주세요.' },
                { id: 3, question: '서비스 이용료는 얼마인가요?', answer: '각 서비스별 이용료는 해당 서비스 페이지에서 상세히 안내되어 있습니다. 결제 전 반드시 확인해주세요.' },
                { id: 4, question: '결제는 어떤 방식으로 가능한가요?', answer: '신용카드, 계좌이체, 간편결제 등 다양한 결제 수단을 지원합니다.' },
                { id: 5, question: '환불 규정은 어떻게 되나요?', answer: '환불은 서비스 이용 약관에 따라 처리됩니다. 자세한 내용은 고객센터로 문의해주세요.' },
                { id: 6, question: '개인정보를 수정하고 싶어요.', answer: '마이페이지 > 개인정보 관리 메뉴에서 직접 수정할 수 있습니다.' },
                { id: 7, question: '아이디를 변경할 수 있나요?', answer: '아이디는 원칙적으로 변경이 불가능합니다. 신중하게 선택해주세요.' },
                { id: 8, question: '탈퇴는 어떻게 하나요?', answer: '마이페이지 > 회원 탈퇴 메뉴에서 절차에 따라 탈퇴할 수 있습니다. 탈퇴 시 모든 정보는 삭제됩니다.' },
                { id: 9, question: '서비스 이용 중 오류가 발생했어요.', answer: '오류 발생 시 상세한 내용(스크린샷 등)을 고객센터로 보내주시면 빠르게 확인 후 조치하겠습니다.' },
                { id: 10, question: '모바일에서도 이용 가능한가요?', answer: '네, 반응형 웹사이트로 제작되어 모바일에서도 편리하게 이용할 수 있습니다.' },
                { id: 11, question: '상담 시간은 어떻게 되나요?', answer: '고객센터 운영 시간은 평일 오전 9시부터 오후 6시까지입니다. 주말 및 공휴일은 휴무입니다.' },
                { id: 12, question: '첨부파일이 열리지 않아요.', answer: '첨부파일 형식에 맞는 뷰어 프로그램이 설치되어 있는지 확인해주세요. PDF 파일은 아크로뱃 리더, DOCX 파일은 MS Word 등이 필요합니다.' },
                { id: 13, question: '서비스 이용 시 주의할 점이 있나요?', answer: '이용 약관 및 각 서비스별 안내 사항을 반드시 숙지하고 이용해주세요.' },
                { id: 14, question: '이벤트 참여는 어떻게 하나요?', answer: '진행 중인 이벤트는 공지사항 또는 이벤트 페이지에서 확인하고 참여할 수 있습니다.' },
                { id: 15, question: '서비스 제휴 문의는 어디로 해야 하나요?', answer: '제휴 문의는 [제휴 문의 이메일 주소]로 연락 주시면 담당자가 확인 후 회신 드립니다.' },
                { id: 16, question: '비밀번호 변경 후 로그인이 안돼요.', answer: '새로운 비밀번호로 정확히 입력했는지 확인해주세요. 간혹 캐시 문제일 수 있으니 브라우저를 재시작하거나 캐시를 지워보세요.' },
                { id: 17, question: '결제 오류가 발생했어요.', answer: '결제 수단 정보를 다시 확인하거나, 다른 결제 수단으로 시도해보세요. 계속 오류가 발생하면 고객센터로 연락 바랍니다.' },
                { id: 18, question: '휴대폰 번호 변경은 어떻게 하나요?', answer: '마이페이지 > 개인정보 관리에서 휴대폰 번호를 변경할 수 있습니다. 본인 인증이 필요할 수 있습니다.' },
                { id: 19, question: '서비스 이용 내역을 확인하고 싶어요.', answer: '마이페이지 > 서비스 이용 내역에서 과거 이용 기록을 확인할 수 있습니다.' },
                { id: 20, question: '사이트가 너무 느려요.', answer: '인터넷 연결 상태를 확인하거나, 브라우저 캐시를 삭제해보세요. 지속적으로 느리다면 고객센터로 문의 바랍니다.' }
            ];

            let currentPage = 1; // 현재 페이지

            // FAQ 항목 렌더링 함수
            function renderFaqItems(page) {
                qnaListElement.innerHTML = ''; // 기존 내용 비우기
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                const paginatedData = allFaqData.slice(start, end); // FAQ 데이터 사용

                paginatedData.forEach(item => {
                    const faqItem = document.createElement('div');
                    faqItem.classList.add('qna-item'); // qna-item 클래스 재사용
                    faqItem.innerHTML = `
                        <div class="question">
                            <span class="q-label">Q.</span>
                            <span class="question-text">${item.question}</span>
                            <span class="toggle-icon"></span>
                        </div>
                        <div class="answer">
                            <span class="a-label">A.</span>
                            <span class="answer-text">${item.answer}</span>
                        </div>
                    `;
                    qnaListElement.appendChild(faqItem);

                    // 아코디언 토글 기능 추가
                    const questionDiv = faqItem.querySelector('.question');
                    const answerDiv = faqItem.querySelector('.answer');
                    const toggleIcon = faqItem.querySelector('.toggle-icon');

                    // 초기 상태: 답변 숨기기
                    answerDiv.style.display = 'none';
                    faqItem.classList.remove('active'); // active 클래스 제거 (아이콘 회전용)

                    questionDiv.addEventListener('click', () => {
                        // 다른 열려있는 답변 닫기
                        document.querySelectorAll('.qna-item.active .answer').forEach(openAnswer => {
                            if (openAnswer !== answerDiv) { // 현재 클릭한 답변이 아니면
                                openAnswer.style.display = 'none';
                                openAnswer.closest('.qna-item').classList.remove('active');
                            }
                        });

                        // 현재 답변 토글
                        if (answerDiv.style.display === 'none') {
                            answerDiv.style.display = 'block';
                            faqItem.classList.add('active');
                        } else {
                            answerDiv.style.display = 'none';
                            faqItem.classList.remove('active');
                        }
                    });
                });
            }

            // 페이지네이션 컨트롤 렌더링 함수
            function renderPaginationControls() {
                paginationControls.innerHTML = ''; // 기존 내용 비우기
                const totalPages = Math.ceil(allFaqData.length / itemsPerPage); // FAQ 데이터 기준

                // 이전 페이지 버튼
                const prevLink = document.createElement('a');
                prevLink.href = '#';
                prevLink.classList.add('page-link', 'prev');
                prevLink.textContent = '‹'; // 이전 아이콘
                prevLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                        currentPage--;
                        renderFaqItems(currentPage); // FAQ 렌더링 함수 호출
                        updateActivePaginationLink();
                    }
                });
                paginationControls.appendChild(prevLink);

                // 페이지 번호 링크
                for (let i = 1; i <= totalPages; i++) {
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
                        renderFaqItems(currentPage); // FAQ 렌더링 함수 호출
                        updateActivePaginationLink();
                    });
                    paginationControls.appendChild(pageLink);
                }

                // 다음 페이지 버튼
                const nextLink = document.createElement('a');
                nextLink.href = '#';
                nextLink.classList.add('page-link', 'next');
                nextLink.textContent = '›'; // 다음 아이콘
                nextLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                        currentPage++;
                        renderFaqItems(currentPage); // FAQ 렌더링 함수 호출
                        updateActivePaginationLink();
                    }
                });
                paginationControls.appendChild(nextLink);
            }

            // 활성화된 페이지 링크 업데이트 함수
            function updateActivePaginationLink() {
                document.querySelectorAll('.page-link').forEach(link => {
                    link.classList.remove('active');
                });
                // '‹' (이전), '›' (다음) 버튼을 제외하고 현재 페이지에 해당하는 링크 활성화
                const pageLinks = document.querySelectorAll('.page-link:not(.prev):not(.next)');
                if (pageLinks[currentPage - 1]) {
                    pageLinks[currentPage - 1].classList.add('active');
                }
            }

            // 초기 렌더링
            renderFaqItems(currentPage);
            renderPaginationControls();
        });