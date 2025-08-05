document.addEventListener('DOMContentLoaded', () => {
    // 캐러셀 요소 선택
    const caWrapper = document.querySelector('.ca-image-wrapper');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const paginationDots = document.querySelectorAll('.dot');
    const quickReservationButtons = document.querySelectorAll('.quick-reservation-button'); 
    
    let currentIndex = 0;
    let autoSlideInterval;
    const slides = 3; // 총 슬라이드 페이지 수 (2장씩 총 3페이지)

    // 슬라이드 페이지를 표시하는 함수
    const showSlide = (index) => {
        // 총 3페이지이므로, 100%를 3으로 나눈 값만큼 이동
        caWrapper.style.transform = `translateX(-${index * (100 / slides)}%)`;
        
        // 페이지네이션 점 활성화/비활성화
        paginationDots.forEach((dot, i) => {
            dot.classList.remove('active');
        });
        paginationDots[index].classList.add('active');
    };

    // 다음 슬라이드로 이동
    const goToNextSlide = () => {
        currentIndex = (currentIndex + 1) % slides;
        showSlide(currentIndex);
    };

    // 이전 슬라이드로 이동
    const goToPrevSlide = () => {
        currentIndex = (currentIndex - 1 + slides) % slides;
        showSlide(currentIndex);
    };

    // 자동 슬라이드 시작
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(goToNextSlide, 3000); // 3초마다 슬라이드 변경
    };

    // 자동 슬라이드 정지
    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    // 초기 슬라이드 표시 및 자동 슬라이드 시작
    showSlide(currentIndex);
    startAutoSlide();

    // 화살표 클릭 이벤트
    leftArrow.addEventListener('click', () => {
        stopAutoSlide();
        goToPrevSlide();
        startAutoSlide();
    });

    rightArrow.addEventListener('click', () => {
        stopAutoSlide();
        goToNextSlide();
        startAutoSlide();
    });

    // 페이지네이션 점 클릭 이벤트
    paginationDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            stopAutoSlide();
            const index = parseInt(e.target.dataset.index);
            currentIndex = index;
            showSlide(currentIndex);
            startAutoSlide();
        });
    });

    // 마우스 오버 시 자동 슬라이드 정지
    caWrapper.addEventListener('mouseenter', stopAutoSlide);
    caWrapper.addEventListener('mouseleave', startAutoSlide);

    // 퀵 링크 버튼 이벤트
    const quickLinkButtons = document.querySelectorAll('.quick-link-button');
    quickLinkButtons.forEach(button => {
        const targetUrl = button.dataset.href;
        button.addEventListener('click', () => {
            window.location.href = targetUrl;
        });
    });

    // 빠른 예약 버튼 이벤트
    quickReservationButtons.forEach(button => {
        const targetUrl = button.dataset.href;
        button.addEventListener('click', () => {
            window.location.href = targetUrl;
        });
    });

    // 공지사항 "더보기" 버튼 이벤트
    const viewMoreButton = document.querySelector('.view-more-button');
    if (viewMoreButton) {
        viewMoreButton.addEventListener('click', () => {
            window.location.href = '../Qna/notice.html';
        });
    }
});

// 공지사항 모달 함수 (기존 코드 유지)
function openNotice(event, category, title, date) {
    event.preventDefault(); // 기본 링크 이동 방지
    // 모달창을 띄우는 로직 (기존 코드에 따라)
    console.log(`[${category}] ${title} (${date})`);
}