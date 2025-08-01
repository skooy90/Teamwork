window.addEventListener('load', ai)
function ai() {
    const log = document.querySelector('.login')
    
    log.addEventListener('click', function() {
        console.log("login")
        window.location.href = "../Main/main.html";
    })
        
        const lo = document.querySelector('.ship')
        lo.addEventListener('click', function() {
            console.log("ship")
            window.location.href = "signup.html";
    })

    // 현재 스크롤 위치부터 0까지 10px씩 줄이면서 반복
    // for (let i = document.documentElement.scrollTop; i >= 0; i -= 10) {
        // 시간 계산: 아래로 내려올수록 늦게 실행되도록 시간 차이를 줌
        // let time = (200 - i) * 10;
        // 일정 시간 뒤에 실행될 함수 설정
        // setTimeout(function () {
            // i값과 시간값 콘솔에 출력
            // console.log('i :', i, 'time :', time)
            // 문서의 스크롤 위치를 i로 설정 (점점 위로 올림)
            // document.documentElement.scrollTop = i;
        // }, time)
    // }
}



