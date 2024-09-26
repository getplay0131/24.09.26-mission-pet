document.addEventListener("DOMContentLoaded", function () {
  //하단: HTML 요소 참조

  // 슬라이더 관련 요소 참조
  const items = document.querySelectorAll(".slider .list .item");
  const thumbnails = document.querySelectorAll(".thumbnail .item");
  const thumbnail = document.querySelector(".thumbnail");
  const thumbnailContainer = document.querySelector(".thumbnail-container");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dDayElement = document.getElementById("dayCount");
  const dDayLink = document.getElementById("dDayLink");
  //상단: HTML 요소 참조

  // 전역 변수
  let countItem = items.length;
  let itemActive = 0;
  let thumbnailItemWidth = thumbnails[0].offsetWidth + 10; // 마진 포함

  // 하단 : 함수 구역

  // 썸네일 위치 조정 함수
  function updateThumbnailPosition() {
    const containerWidth = thumbnailContainer.offsetWidth;
    const maxVisibleItems = Math.floor(containerWidth / thumbnailItemWidth);
    const totalWidth = thumbnails.length * thumbnailItemWidth;

    if (totalWidth > containerWidth) {
      let shift;
      if (itemActive < maxVisibleItems / 2) {
        shift = 0;
      } else if (itemActive > thumbnails.length - maxVisibleItems / 2) {
        shift = thumbnails.length - maxVisibleItems;
      } else {
        shift = itemActive - Math.floor(maxVisibleItems / 2);
      }
      thumbnail.style.transform = `translateX(-${
        shift * thumbnailItemWidth
      }px)`;
    } else {
      thumbnail.style.transform = "translateX(0)";
    }
  }

  // function updateSlider() {
  //   items.forEach((item) => item.classList.remove("active"));
  // }

  // 슬라이드쇼 함수
  function showSlide(index) {
    // 현재 활성 아이템 비활성화
    items[itemActive].classList.remove("active");
    thumbnails[itemActive].classList.remove("active");

    // 새 아이템 활성화
    itemActive = (index + countItem) % countItem;
    items[itemActive].classList.add("active");
    thumbnails[itemActive].classList.add("active");

    updateThumbnailPosition();
    console.log("Current active item:", itemActive); // 디버깅용 로그
  }

  // 다음 슬라이드
  function nextSlide() {
    showSlide(itemActive + 1);
  }

  // 이전 슬라이드
  function prevSlide() {
    showSlide(itemActive - 1);
  }

  // 상단 : 함수 구역

  // 이벤트 리스너 설정

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // 썸네일 클릭 이벤트
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => showSlide(index));
  });

  // 자동 슬라이드 시작
  let slideInterval = setInterval(nextSlide, 5000);

  // 마우스가 슬라이더 위에 있을 때 자동 슬라이드 중지
  const slider = document.querySelector(".slider");
  slider.addEventListener("mouseenter", () => clearInterval(slideInterval));
  slider.addEventListener("mouseleave", () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  });

  // 초기 썸네일 위치 설정 및 윈도우 리사이즈 이벤트
  updateThumbnailPosition();
  window.addEventListener("resize", function () {
    thumbnailItemWidth = thumbnails[0].offsetWidth + 10;
    updateThumbnailPosition();
  });

  // D-day 카운트 함수
  function updateDDayCount() {
    const joinDate = new Date("2024-08-01");
    // 가입일
    const today = new Date();
    const difference = Math.floor((today - joinDate) / (1000 * 60 * 60 * 24));
    dDayElement.textContent = difference;
  }

  // D-day 카운트 계산 함수
  function updateDDayCount() {
    const joinDate = new Date("2024-08-10"); // 가입일 설정
    const today = new Date(); // 현재 날짜
    // 밀리초 단위의 차이를 일 단위로 변환
    const difference = Math.floor((today - joinDate) / (1000 * 60 * 60 * 24));

    // D-day 표시 요소 업데이트
    const dayCountElement = document.getElementById("dayCount");
    if (dayCountElement) {
      dayCountElement.textContent = difference;
    }

    // 단수/복수 처리
    const dayElement = document.getElementById("day");
    if (dayElement) {
      dayElement.textContent = difference === 1 ? " DAY" : " DAYS";
    }
  }

  // 초기 슬라이드 표시
  showSlide(0);
  updateDDayCount();
  updateThumbnailPosition();
});
