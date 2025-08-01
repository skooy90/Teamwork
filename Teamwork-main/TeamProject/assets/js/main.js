// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // 캐러셀 기능
    const caWrapper = document.querySelector('.ca-image-wrapper');
    const caImages = document.querySelectorAll('.ca-image');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const paginationDots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let autoSlideInterval;

    // 이미지 표시 함수
    const showImage = (index) => {
        caImages.forEach((img, i) => {
            img.classList.remove('active');
            paginationDots[i].classList.remove('active');
        });
        caImages[index].classList.add('active');
        paginationDots[index].classList.add('active');
    };

    // 다음 이미지로 이동
    const goToNextImage = () => {
        currentIndex = (currentIndex + 1) % caImages.length;
        showImage(currentIndex);
    };

    // 이전 이미지로 이동
    const goToPrevImage = () => {
        currentIndex = (currentIndex - 1 + caImages.length) % caImages.length;
        showImage(currentIndex);
    };

    // 자동 슬라이드 시작
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(goToNextImage, 3000); // 3초마다 슬라이드 변경
    };

    // 자동 슬라이드 정지
    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    // 초기 이미지 표시
    showImage(currentIndex);
    startAutoSlide(); // 페이지 로드 시 자동 슬라이드 시작

    // 화살표 클릭 이벤트
    leftArrow.addEventListener('click', () => {
        stopAutoSlide();
        goToPrevImage();
        startAutoSlide(); // 수동 조작 후 자동 슬라이드 재시작
    });

    rightArrow.addEventListener('click', () => {
        stopAutoSlide();
        goToNextImage();
        startAutoSlide(); // 수동 조작 후 자동 슬라이드 재시작
    });

    // 페이지네이션 점 클릭 이벤트
    paginationDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            stopAutoSlide();
            const index = parseInt(e.target.dataset.index);
            currentIndex = index;
            showImage(currentIndex);
            startAutoSlide(); // 수동 조작 후 자동 슬라이드 재시작
        });
    });

    // 마우스 오버 시 자동 슬라이드 정지, 마우스 아웃 시 재시작 (선택 사항)
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

    // 공지사항 "더보기" 버튼 이벤트
    const viewMoreButton = document.querySelector('.view-more-button');
    if (viewMoreButton) {
        viewMoreButton.addEventListener('click', () => {
            예: window.location.href = '../Qna/notice.html';
        });
    }
});