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
            <p>&copy; 2025 지역유치원. All rights reserved.</p>
            <div class="footer-links">
                <a href="/privacy">개인정보처리방침</a>
                <a href="/terms">이용약관</a>
                <a href="/sitemap">사이트맵</a>
            </div>
        </div>
    `;
    return footer;
}