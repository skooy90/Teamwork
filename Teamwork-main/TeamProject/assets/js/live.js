// 실시간 모니터링 페이지 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 실시간 화면 확대 기능
    const expandButton = document.querySelector('.expand-button');
    if (expandButton) {
        expandButton.addEventListener('click', function() {
            const videoContainer = document.querySelector('.video-container');
            if (videoContainer.classList.contains('expanded')) {
                videoContainer.classList.remove('expanded');
                this.innerHTML = '<i class="expand-icon">🔍</i>화면 확대해서 보기';
            } else {
                videoContainer.classList.add('expanded');
                this.innerHTML = '<i class="expand-icon">🔍</i>화면 축소';
            }
        });
    }

    // 지도 확대 기능
    const mapExpandButton = document.querySelector('.map-expand-button');
    if (mapExpandButton) {
        mapExpandButton.addEventListener('click', function() {
            const mapContainer = document.querySelector('.map-container');
            if (mapContainer.classList.contains('expanded')) {
                mapContainer.classList.remove('expanded');
                this.innerHTML = '<i class="map-icon">🗺️</i>지도 확대해서 보기';
            } else {
                mapContainer.classList.add('expanded');
                this.innerHTML = '<i class="map-icon">🗺️</i>지도 축소';
            }
        });
    }

    // 전화 걸기 기능
    const callButton = document.querySelector('.call-button');
    if (callButton) {
        callButton.addEventListener('click', function() {
            const phoneNumber = '010-1234-5678';
            if (confirm(`전화번호 ${phoneNumber}로 전화를 걸까요?`)) {
                window.location.href = `tel:${phoneNumber}`;
            }
        });
    }

    // 채팅하기 기능
     const chatButton = document.querySelector('.chat-button');
    const chatWindow = document.getElementById('chat-window');
    const closeChatButton = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendChatButton = document.getElementById('send-chat');
    const chatMessages = document.getElementById('chat-messages');

     if (chatButton && chatWindow && closeChatButton && chatInput && sendChatButton && chatMessages) {
        chatButton.addEventListener('click', function() {
            chatWindow.classList.add('active');
            chatInput.focus();
        });

        closeChatButton.addEventListener('click', function() {
            chatWindow.classList.remove('active');
        });
        
          function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                const messageElement = document.createElement('div');
                messageElement.classList.add('chat-message', 'sent');
                messageElement.textContent = message;
                chatMessages.appendChild(messageElement);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                chatInput.value = '';
                
                setTimeout(() => {
                    const receivedMessageElement = document.createElement('div');
                    receivedMessageElement.classList.add('chat-message', 'received');
                    receivedMessageElement.textContent = "네, 말씀하신 내용 잘 확인했습니다.";
                    chatMessages.appendChild(receivedMessageElement);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000); 
            }
          }
        }

    // 실시간 시간 업데이트
    function updateTime() {
        const timestampElement = document.querySelector('.timestamp');
        if (timestampElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('ko-KR');
            timestampElement.textContent = timeString;
        }
    }
    
    // 1초마다 시간 업데이트
    setInterval(updateTime, 1000);
    updateTime(); // 초기 실행

    // 비디오 컨트롤 기능
    const playBtn = document.querySelector('.play-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const liveVideo = document.querySelector('.live-video');

    if (playBtn && liveVideo) {
        playBtn.addEventListener('click', function() {
            // 실제 비디오 재생 로직 (현재는 이미지이므로 시뮬레이션)
            console.log('비디오 재생');
        });
    }

    if (pauseBtn && liveVideo) {
        pauseBtn.addEventListener('click', function() {
            // 실제 비디오 일시정지 로직
            console.log('비디오 일시정지');
        });
    }

    if (fullscreenBtn && liveVideo) {
        fullscreenBtn.addEventListener('click', function() {
            // 전체화면 기능
            if (liveVideo.requestFullscreen) {
                liveVideo.requestFullscreen();
            } else if (liveVideo.webkitRequestFullscreen) {
                liveVideo.webkitRequestFullscreen();
            } else if (liveVideo.msRequestFullscreen) {
                liveVideo.msRequestFullscreen();
            }
        });
    }

    // 지도 컨트롤 기능
    const zoomInBtn = document.querySelector('.zoom-in');
    const zoomOutBtn = document.querySelector('.zoom-out');
    const centerBtn = document.querySelector('.center');

    if (zoomInBtn) {   
        zoomInBtn.addEventListener('click', function() {
            console.log('지도 확대');
        });
    }

    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', function() {
            console.log('지도 축소');
        });
    }

    if (centerBtn) {
        centerBtn.addEventListener('click', function() {
            console.log('지도 중앙화');
        });
    }

    // 확대된 화면에서 ESC 키로 닫기
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const expandedVideo = document.querySelector('.video-container.expanded');
            const expandedMap = document.querySelector('.map-container.expanded');
            
            if (expandedVideo) {
                expandedVideo.classList.remove('expanded');
                const expandBtn = document.querySelector('.expand-button');
                if (expandBtn) {
                    expandBtn.innerHTML = '<i class="expand-icon">🔍</i>화면 확대해서 보기';
                }
            }
            
            if (expandedMap) {
                expandedMap.classList.remove('expanded');
                const mapExpandBtn = document.querySelector('.map-expand-button');
                if (mapExpandBtn) {
                    mapExpandBtn.innerHTML = '<i class="map-icon">🗺️</i>지도 확대해서 보기';
                }
            }
        }
    });

    // 닫기 버튼 기능
    const videoCloseBtn = document.querySelector('.video-close-btn');
    const mapCloseBtn = document.querySelector('.map-close-btn');

    if (videoCloseBtn) {
        videoCloseBtn.addEventListener('click', function() {
            const videoContainer = document.querySelector('.video-container');
            if (videoContainer.classList.contains('expanded')) {
                videoContainer.classList.remove('expanded');
                const expandBtn = document.querySelector('.expand-button');
                if (expandBtn) {
                    expandBtn.innerHTML = '<i class="expand-icon">🔍</i>화면 확대해서 보기';
                }
            }
        });
    }

    if (mapCloseBtn) {
        mapCloseBtn.addEventListener('click', function() {
            const mapContainer = document.querySelector('.map-container');
            if (mapContainer.classList.contains('expanded')) {
                mapContainer.classList.remove('expanded');
                const mapExpandBtn = document.querySelector('.map-expand-button');
                if (mapExpandBtn) {
                    mapExpandBtn.innerHTML = '<i class="map-icon">🗺️</i>지도 확대해서 보기';
                }
            }
        });
    }
});