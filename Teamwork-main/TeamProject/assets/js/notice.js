        document.addEventListener('DOMContentLoaded', function() {
            const qnaTableBody = document.getElementById('qnaTableBody');
            const paginationControls = document.getElementById('paginationControls');
            const itemsPerPage = 10; // 한 페이지에 표시될 항목 수

            // 더미 데이터 (notice_detail.html과 동일하게 content 추가)
            const allQnaData = [
                { id: '공지', title: '[공고 제2025-103호] 2026년도 과정형 평가 기준 변경 안내', attachment: true, department: '디지털정보과', date: '2024-11-15', views: 1115, content: '안녕하세요. 2026년도 과정형 평가 기준이 변경되어 안내드립니다. 자세한 내용은 첨부파일을 확인해주세요.' },
                { id: '공지', title: '[공고 제2025-102호] 시스템 점검 및 업데이트 안내', attachment: true, department: '시스템관리팀', date: '2024-11-10', views: 980, content: '안녕하세요. :Docswave 입니다.\n\n:Docswave 시스템 점검으로 서비스 이용이 잠시 중단 되오니 양해 부탁드립니다.\n\n- 시스템 점검일정 : 2020년 12월 5일(토) 오전 10시~\n(한시간 가량 소요 예정)\n\n※ 상기 점검 시간은 사정에 의해 변경될 수 있습니다.\n※ 예정된 시간에 완료될 수 있도록 최선을 다하겠습니다.\n\n감사합니다.\n;Docswave 올림' },
                { id: '공지', title: '[공고 제2025-101호] 개인정보처리방침 개정 안내', attachment: false, department: '법무팀', date: '2024-11-01', views: 1500, content: '개인정보처리방침이 개정되어 안내드립니다. 변경된 내용은 홈페이지를 통해 확인해주세요.' },
                { id: 65, title: '[공고 제2025-105호] 2025년 과정평가형 자격 시험 일정 공고', attachment: false, department: '자격관리부', date: '2024-10-28', views: 1234, content: '2025년 과정평가형 자격 시험 일정이 공고되었습니다. 자세한 내용은 첨부파일을 확인해주세요.' },
                { id: 64, title: '[공고 제2025-104호] 신규 케어메이트 교육 프로그램 모집', attachment: true, department: '교육훈련팀', date: '2024-10-25', views: 876, content: '신규 케어메이트 교육 프로그램에 참여할 분들을 모집합니다. 많은 관심 부탁드립니다.' },
                { id: 63, title: '[공고 제2025-103호] 케어메이트 활동 수당 지급 기준 변경 안내', attachment: false, department: '재무팀', date: '2024-10-20', views: 2100, content: '케어메이트 활동 수당 지급 기준이 변경되었습니다. 자세한 내용은 공지사항을 참고해주세요.' },
                { id: 62, title: '[공고 제2025-102호] 2025년 상반기 케어메이트 만족도 조사 결과', attachment: false, department: '서비스품질팀', date: '2024-10-18', views: 750, content: '2025년 상반기 케어메이트 만족도 조사 결과입니다. 여러분의 소중한 의견 감사합니다.' },
                { id: 61, title: '[공고 제2025-101호] 긴급 돌봄 서비스 이용 안내', attachment: true, department: '돌봄지원센터', date: '2024-10-10', views: 1800, content: '긴급 돌봄 서비스 이용에 대한 안내입니다. 위급 상황 시 활용해주세요.' },
                { id: 60, title: '[공고 제2025-100호] 케어메이트 자격 갱신 절차 안내', attachment: false, department: '자격관리부', date: '2024-10-05', views: 920, content: '케어메이트 자격 갱신 절차에 대해 안내드립니다. 기한 내에 갱신 바랍니다.' },
                { id: 59, title: '[공고 제2025-099호] 2025년 하반기 케어메이트 채용 설명회 개최', attachment: false, department: '인사팀', date: '2024-09-30', views: 600, content: '2025년 하반기 케어메이트 채용 설명회를 개최합니다. 많은 참여 바랍니다.' },
                { id: 58, title: '케어메이트 활동 보고서 제출 기한 안내', attachment: false, department: '디지털정보과', date: '2024-09-25', views: 550, content: '케어메이트 활동 보고서 제출 기한을 안내드립니다. 기한 내에 제출 바랍니다.' },
                { id: 57, title: '돌봄 서비스 이용 후기 이벤트 당첨자 발표', attachment: false, department: '서비스품질팀', date: '2024-09-20', views: 700, content: '돌봄 서비스 이용 후기 이벤트 당첨자를 발표합니다. 축하드립니다!' },
                { id: 56, title: '신규 돌봄 장비 도입 및 사용 교육 안내', attachment: true, department: '교육훈련팀', date: '2024-09-18', views: 480, content: '새로운 돌봄 장비가 도입되어 사용 교육을 진행합니다. 많은 참여 바랍니다.' },
                { id: 55, title: '지역사회 연계 프로그램 참여자 모집', attachment: false, department: '돌봄지원센터', date: '2024-09-15', views: 320, content: '지역사회 연계 프로그램에 참여할 분들을 모집합니다.' },
                { id: 54, title: '케어메이트 윤리 강령 준수 안내', attachment: false, department: '법무팀', date: '2024-09-10', views: 800, content: '케어메이트 윤리 강령 준수에 대한 안내입니다. 항상 윤리적인 활동 부탁드립니다.' },
                { id: 53, title: '2025년 케어메이트 역량 강화 워크숍 개최', attachment: false, department: '교육훈련팀', date: '2024-09-05', views: 400, content: '2025년 케어메이트 역량 강화를 위한 워크숍이 개최됩니다.' },
                { id: 52, title: '돌봄 서비스 만족도 향상을 위한 의견 수렴', attachment: false, department: '서비스품질팀', date: '2024-09-01', views: 250, content: '돌봄 서비스 만족도 향상을 위한 여러분의 소중한 의견을 수렴합니다.' },
                { id: 51, title: '케어메이트 휴가 및 대체 인력 신청 안내', attachment: false, department: '인사팀', date: '2024-08-28', views: 650, content: '케어메이트 휴가 및 대체 인력 신청에 대한 안내입니다.' },
                { id: 50, title: '건강 증진 프로그램 참여 독려', attachment: false, department: '돌봄지원센터', date: '2024-08-25', views: 380, content: '건강 증진 프로그램에 많은 참여 부탁드립니다.' },
                { id: 49, title: '2025년 케어메이트 정기 건강 검진 안내', attachment: true, department: '보건관리팀', date: '2024-08-20', views: 500, content: '2025년 케어메이트 정기 건강 검진에 대한 안내입니다.' },
                { id: 48, title: '돌봄 서비스 긴급 상황 대응 매뉴얼', attachment: false, department: '안전관리팀', date: '2024-08-15', views: 720, content: '돌봄 서비스 긴급 상황 발생 시 대응 매뉴얼입니다.' },
                { id: 47, title: '케어메이트 대상 심리 상담 지원 안내', attachment: false, department: '상담지원팀', date: '2024-08-10', views: 300, content: '케어메이트 분들을 위한 심리 상담 지원 안내입니다.' },
                { id: 46, title: '2025년 하반기 돌봄 서비스 수요 예측', attachment: false, department: '기획팀', date: '2024-08-05', views: 450, content: '2025년 하반기 돌봄 서비스 수요 예측 결과입니다.' },
                { id: 45, title: '케어메이트 우수 사례 공모전 개최', attachment: false, department: '홍보팀', date: '2024-08-01', views: 280, content: '케어메이트 우수 사례 공모전을 개최합니다. 많은 참여 바랍니다.' },
                { id: 44, title: '돌봄 서비스 관련 법규 변경 안내', attachment: false, department: '법무팀', date: '2024-07-28', views: 610, content: '돌봄 서비스 관련 법규가 변경되어 안내드립니다.' },
                { id: 43, title: '케어메이트 복지 혜택 확대 안내', attachment: false, department: '복지팀', date: '2024-07-25', views: 780, content: '케어메이트 복지 혜택이 확대됩니다. 자세한 내용은 공지사항을 확인해주세요.' },
                { id: 42, title: '2025년 상반기 재정 보고서 공개', attachment: false, department: '재무팀', date: '2024-07-20', views: 350, content: '2025년 상반기 재정 보고서가 공개되었습니다.' },
                { id: 41, title: '돌봄 서비스 개선을 위한 제안 접수', attachment: false, department: '서비스품질팀', date: '2024-07-15', views: 420, content: '돌봄 서비스 개선을 위한 여러분의 소중한 제안을 기다립니다.' },
                { id: 40, title: '케어메이트 안전 교육 의무화 안내', attachment: true, department: '안전관리팀', date: '2024-07-10', views: 900, content: '케어메이트 안전 교육이 의무화됩니다. 교육 이수 바랍니다.' },
                { id: 39, title: '지역 보건소 연계 건강 검진 안내', attachment: false, department: '보건관리팀', date: '2024-07-05', views: 530, content: '지역 보건소 연계 건강 검진에 대한 안내입니다.' },
                { id: 38, title: '케어메이트 활동 수당 정산 안내', attachment: false, department: '재무팀', date: '2024-06-30', views: 480, content: '케어메이트 활동 수당 정산에 대한 안내입니다.' },
                { id: 37, title: '돌봄 서비스 이용자 만족도 설문 조사', attachment: false, department: '서비스품질팀', date: '2024-06-25', views: 310, content: '돌봄 서비스 이용자 만족도 설문 조사를 실시합니다. 많은 참여 바랍니다.' },
                { id: 36, title: '신규 케어메이트 교육 과정 개설', attachment: true, department: '교육훈련팀', date: '2024-06-20', views: 670, content: '신규 케어메이트를 위한 교육 과정이 개설됩니다.' },
                { id: 35, title: '케어메이트 역량 강화 교육 프로그램', attachment: false, department: '교육훈련팀', date: '2024-06-15', views: 450, content: '케어메이트 역량 강화를 위한 교육 프로그램이 진행됩니다.' },
                { id: 34, title: '돌봄 서비스 이용자 권리 안내', attachment: false, department: '법무팀', date: '2024-06-10', views: 590, content: '돌봄 서비스 이용자 권리에 대한 안내입니다.' },
                { id: 33, title: '케어메이트 우수 활동 사례집 발간', attachment: false, department: '홍보팀', date: '2024-06-05', views: 220, content: '케어메이트 우수 활동 사례집이 발간되었습니다.' },
                { id: 32, title: '지역사회 돌봄 자원 연계 강화', attachment: false, department: '돌봄지원센터', date: '2024-06-01', views: 390, content: '지역사회 돌봄 자원 연계를 강화합니다.' },
                { id: 31, title: '2025년 예산 편성 및 집행 계획', attachment: false, department: '기획팀', date: '2024-05-28', views: 180, content: '2025년 예산 편성 및 집행 계획에 대한 안내입니다.' },
                { id: 30, title: '케어메이트 대상 직무 스트레스 관리 교육', attachment: false, department: '상담지원팀', date: '2024-05-25', views: 270, content: '케어메이트 분들을 위한 직무 스트레스 관리 교육이 진행됩니다.' },
                { id: 29, title: '돌봄 서비스 이용자 안전 수칙 안내', attachment: true, department: '안전관리팀', date: '2024-05-20', views: 760, content: '돌봄 서비스 이용자 안전 수칙에 대한 안내입니다. 숙지 바랍니다.' },
                { id: 28, title: '케어메이트 채용 공고 및 절차', attachment: false, department: '인사팀', date: '2024-05-15', views: 950, content: '케어메이트 채용 공고 및 절차에 대한 안내입니다.' },
                { id: 27, title: '2025년 상반기 사업 실적 보고', attachment: false, department: '기획팀', date: '2024-05-10', views: 410, content: '2025년 상반기 사업 실적 보고서입니다.' },
                { id: 26, title: '돌봄 서비스 이용자 개인정보 보호 강화', attachment: false, department: '법무팀', date: '2024-05-05', views: 630, content: '돌봄 서비스 이용자의 개인정보 보호를 강화합니다.' },
                { id: 25, title: '케어메이트 복지 증진 방안 모색', attachment: false, department: '복지팀', date: '2024-05-01', views: 340, content: '케어메이트 복지 증진 방안을 모색하고 있습니다.' },
                { id: 24, title: '지역사회 돌봄 네트워크 구축', attachment: false, department: '돌봄지원센터', date: '2024-04-28', views: 290, content: '지역사회 돌봄 네트워크를 구축합니다.' },
                { id: 23, title: '2025년 케어메이트 교육 과정 개편', attachment: true, department: '교육훈련팀', date: '2024-04-25', views: 580, content: '2025년 케어메이트 교육 과정이 개편됩니다.' },
                { id: 22, title: '돌봄 서비스 품질 관리 시스템 개선', attachment: false, department: '서비스품질팀', date: '2024-04-20', views: 370, content: '돌봄 서비스 품질 관리 시스템을 개선합니다.' },
                { id: 21, title: '케어메이트 활동 지원금 신청 안내', attachment: false, department: '재무팀', date: '2024-04-15', views: 700, content: '케어메이트 활동 지원금 신청에 대한 안내입니다.' },
                { id: 20, title: '돌봄 서비스 이용자 의견 반영', attachment: false, department: '서비스품질팀', date: '2024-04-10', views: 210, content: '돌봄 서비스 이용자 의견을 적극 반영하겠습니다.' },
                { id: 19, title: '케어메이트 직무 교육 의무화', attachment: false, department: '교육훈련팀', date: '2024-04-05', views: 490, content: '케어메이트 직무 교육이 의무화됩니다.' },
                { id: 18, title: '지역사회 연계 돌봄 서비스 확대', attachment: false, department: '돌봄지원센터', date: '2024-04-01', views: 330, content: '지역사회 연계 돌봄 서비스를 확대합니다.' },
                { id: 17, title: '2025년도 사업 계획 확정', attachment: false, department: '기획팀', date: '2024-03-28', views: 150, content: '2025년도 사업 계획이 확정되었습니다.' },
                { id: 16, title: '케어메이트 대상 법률 상담 지원', attachment: false, department: '법무팀', date: '2024-03-25', views: 260, content: '케어메이트 분들을 위한 법률 상담을 지원합니다.' },
                { id: 15, title: '돌봄 서비스 이용자 만족도 향상 방안', attachment: false, department: '서비스품질팀', date: '2024-03-20', views: 400, content: '돌봄 서비스 이용자 만족도 향상 방안을 모색합니다.' },
                { id: 14, title: '케어메이트 안전 교육 프로그램', attachment: true, department: '안전관리팀', date: '2024-03-15', views: 680, content: '케어메이트 안전 교육 프로그램이 진행됩니다.' },
                { id: 13, title: '지역 보건 협력 사업 추진', attachment: false, department: '보건관리팀', date: '2024-03-10', views: 310, content: '지역 보건 협력 사업을 추진합니다.' },
                { id: 12, title: '2025년 상반기 채용 설명회 개최', attachment: false, department: '인사팀', date: '2024-03-05', views: 550, content: '2025년 상반기 채용 설명회를 개최합니다.' },
                { id: 11, title: '돌봄 서비스 관련 민원 처리 안내', attachment: false, department: '고객지원팀', date: '2024-03-01', views: 470, content: '돌봄 서비스 관련 민원 처리에 대한 안내입니다.' },
                { id: 10, title: '케어메이트 활동 수칙 준수 강조', attachment: false, department: '법무팀', date: '2024-02-28', views: 620, content: '케어메이트 활동 수칙 준수를 강조합니다.' },
                { id: 9, title: '돌봄 서비스 이용자 의견 수렴 창구', attachment: false, department: '서비스품질팀', date: '2024-02-25', views: 240, content: '돌봄 서비스 이용자 의견 수렴 창구를 운영합니다.' },
                { id: 8, title: '신규 케어메이트 교육 프로그램 안내', attachment: true, department: '교육훈련팀', date: '2024-02-20', views: 710, content: '신규 케어메이트 교육 프로그램에 대한 안내입니다.' },
                { id: 7, title: '케어메이트 역량 강화 교육 신청', attachment: false, department: '교육훈련팀', date: '2024-02-15', views: 380, content: '케어메이트 역량 강화를 위한 교육 신청을 받습니다.' },
                { id: 6, title: '지역사회 돌봄 서비스 활성화 방안', attachment: false, department: '돌봄지원센터', date: '2024-02-10', views: 450, content: '지역사회 돌봄 서비스 활성화 방안을 모색합니다.' },
                { id: 5, title: '2025년도 사업 목표 설정', attachment: false, department: '기획팀', date: '2024-02-05', views: 190, content: '2025년도 사업 목표를 설정합니다.' },
                { id: 4, title: '케어메이트 대상 심리 지원 서비스', attachment: false, department: '상담지원팀', date: '2024-02-01', views: 300, content: '케어메이트 분들을 위한 심리 지원 서비스를 제공합니다.' },
                { id: 3, title: '돌봄 서비스 안전 관리 강화', attachment: true, department: '안전관리팀', date: '2024-01-28', views: 800, content: '돌봄 서비스 안전 관리를 강화합니다.' },
                { id: 2, title: '케어메이트 채용 절차 및 기준', attachment: false, department: '인사팀', date: '2024-01-25', views: 920, content: '케어메이트 채용 절차 및 기준에 대한 안내입니다.' },
                { id: 1, title: '2025년도 주요 사업 계획 발표', attachment: false, department: '기획팀', date: '2024-01-20', views: 600, content: '2025년도 주요 사업 계획을 발표합니다.' }
            ];

            let currentPage = 1; // 현재 페이지

            // 테이블 데이터 렌더링 함수
            function renderTable(page) {
                qnaTableBody.innerHTML = ''; // 기존 내용 비우기
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                const paginatedData = allQnaData.slice(start, end);

                paginatedData.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="col-id">${item.id === '공지' ? '<span class="notice-label">공지</span>' : item.id}</td>
                        <td class="col-title"><a href="notice_detail.html?id=${item.id}">${item.title}</a></td>
                        <td class="col-attachment"> ${item.attachment ? '📄' : ''}</td>
                        <td class="col-department">${item.department}</td>
                        <td class="col-date">${item.date}</td>
                        <td class="col-views">${item.views}</td>
                    `;
                    qnaTableBody.appendChild(row);
                });
            }

            // 페이지네이션 컨트롤 렌더링 함수
            function renderPaginationControls() {
                paginationControls.innerHTML = ''; // 기존 내용 비우기
                const totalPages = Math.ceil(allQnaData.length / itemsPerPage);

                // 이전 페이지 버튼
                const prevLink = document.createElement('a');
                prevLink.href = '#';
                prevLink.classList.add('page-link', 'prev');
                prevLink.textContent = '◀';
                prevLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                        currentPage--;
                        renderTable(currentPage);
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
                nextLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                        currentPage++;
                        renderTable(currentPage);
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
                // '◀' 버튼을 제외하고 현재 페이지에 해당하는 링크 활성화
                const pageLinks = document.querySelectorAll('.page-link:not(.prev):not(.next)');
                if (pageLinks[currentPage - 1]) {
                    pageLinks[currentPage - 1].classList.add('active');
                }
            }

            // 초기 렌더링
            renderTable(currentPage);
            renderPaginationControls();
        });