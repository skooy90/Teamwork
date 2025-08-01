window.addEventListener("load", initFooter);

function initFooter() {
    const container = document.getElementById('footer-container');
    const footer = createFooter();
    container.appendChild(footer);
}

function createFooter() {
    const footer = document.createElement('footer');
    footer.classList.add('site-footer');

    footer.innerHTML = `
    <div class="footer-content">
        <div class="footer-logo">
            <img src="../../header&footer/assect/logo.PNG" alt="로고">
        </div>
        <div class="footer-links">
        <a href="/privacy">개인정보처리방침</a>
        <a href="../Qna/guide.html">이용안내</a>
        <a href="/sitemap">사이트맵</a>
        </div>
        <p>&copy; 2025 지역유치원. All rights reserved.</p>
        </div>
    `;
    return footer;
}