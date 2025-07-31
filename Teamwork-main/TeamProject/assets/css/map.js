// map.js

let map;
let markers = [];

function initMap() {
    const mapContainer = document.getElementById('map');
    const defaultCoords = { lat: 36.809167, lng: 127.144444 }; // 천안역 좌표

    map = new google.maps.Map(mapContainer, {
        center: defaultCoords,
        zoom: 13
    });

    // ***** 중요: 변경된 ID 사용 *****
    const searchInput = document.getElementById('map-search-input'); // ID 변경
    const searchButton = document.getElementById('map-search-button'); // ID 변경

    searchButton.addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });

    searchHospitalsNearby(defaultCoords);
}

function searchHospitalsNearby(centerCoords) {
    const service = new google.maps.places.PlacesService(map);
    const request = {
        location: centerCoords,
        radius: 10000,
        type: ['hospital', 'pharmacy']
    };

    service.nearbySearch(request, (results, status) => {
        console.log("searchHospitalsNearby 응답 상태:", status);
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            console.log("searchHospitalsNearby 결과:", results);
            displayHospitals(results);
        } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            console.log('주변 병원 검색 결과가 없습니다.');
            displayHospitals([]);
        } else {
            console.error('주변 병원 검색 중 오류가 발생했습니다:', status);
        }
    });
}

function performSearch(query) {
    if (!query.trim()) {
        alert('검색어를 입력해주세요.');
        return;
    }

    const service = new google.maps.places.PlacesService(map);
    const request = {
        query: query,
        fields: ['name', 'geometry', 'formatted_address', 'vicinity', 'formatted_phone_number', 'international_phone_number', 'website', 'rating', 'user_ratings_total', 'place_id']
    };

    service.textSearch(request, (results, status) => {
        console.log("performSearch 응답 상태:", status);
        if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
            console.log("performSearch 결과:", results);
            displayHospitals(results);
            map.setCenter(results[0].geometry.location);
            map.setZoom(15);
        } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            alert('검색 결과가 없습니다. 다른 검색어를 입력해보세요.');
            displayHospitals([]);
        } else {
            console.error('병원 검색 중 오류가 발생했습니다:', status);
            alert('병원 검색 중 오류가 발생했습니다.');
        }
    });
}

function displayHospitals(hospitals) {
    setMapOnAll(null);
    markers = [];

    const hospitalDetailsDiv = document.getElementById('hospital-details');
    hospitalDetailsDiv.innerHTML = '<p>지도를 클릭하여 병원 정보를 확인하세요.</p>';

    if (hospitals.length === 0) {
        hospitalDetailsDiv.innerHTML = '<p>검색 결과가 없습니다.</p>';
        return;
    }

    hospitals.forEach(hospital => {
        const marker = new google.maps.Marker({
            map: map,
            position: hospital.geometry.location,
            title: hospital.name
        });

        markers.push(marker);

        marker.addListener('click', () => {
            renderHospitalInfo(hospital);
            map.panTo(marker.getPosition());
        });

        const listItem = document.createElement('div');
        listItem.classList.add('hospital-list-item');
        listItem.innerHTML = `<strong>${hospital.name}</strong><br>${hospital.vicinity || hospital.formatted_address || ''}`;
        listItem.style.cursor = 'pointer';
        listItem.style.marginBottom = '10px';
        listItem.style.padding = '5px';
        listItem.style.borderBottom = '1px solid #eee';

        listItem.addEventListener('click', () => {
            renderHospitalInfo(hospital);
            map.panTo(marker.getPosition());
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => {
                marker.setAnimation(null);
            }, 1000);
        });
        hospitalDetailsDiv.appendChild(listItem);
    });

    if (hospitals.length > 0) {
        renderHospitalInfo(hospitals[0]);
    }
}

function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function renderHospitalInfo(hospital) {
    const hospitalDetailsDiv = document.getElementById('hospital-details');

    hospitalDetailsDiv.innerHTML = `
        <h2>${hospital.name}</h2>
        <div><strong>병원 주소:</strong> ${hospital.vicinity || hospital.formatted_address || '정보 없음'}</div>
        <div><strong>메인 병동 전화번호:</strong> ${hospital.formatted_phone_number || hospital.international_phone_number || '정보 없음'}</div>
        <div><strong>응급실 전화번호:</strong> 정보 없음 (API에서 직접 제공되지 않을 수 있습니다. 추가 데이터 필요)</div>
        <div><strong>병원 리뷰:</strong> ${hospital.rating ? `${hospital.rating}점 (${hospital.user_ratings_total}개 리뷰)` : '리뷰 없음'}</div>
        <div>
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name)}&query_place_id=${hospital.place_id}" target="_blank">지도 상세보기 (클릭시 Google Maps로 이동)</a>
        </div>
        ${hospital.website ? `<div><a href="${hospital.website}" target="_blank">병원 홈페이지 바로가기</a></div>` : ''}
    `;
}