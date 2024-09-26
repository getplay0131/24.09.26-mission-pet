// 구현 필요한 기능들
// 1.펫쇼케이스 내 자동 슬라이드 기능 구현 > 완료
// 1-1.자동적으로 일정 시간 후 좌측으로 슬라이드쇼 진행 > 완료
// 1-2.아이콘형 버튼 클릭시 해당 방향으로 전환 > 완료
// 1-3.아이콘형 방향 전환 버튼은 슬라이드 > 완료
//  전환시에도 해당 자리에 고정되어 있어야 한다. > 완료
// 1-4. 슬라이딩 기능은 방향과 트랜지션을 이용하여 구현해야한다. > 구현 완료
// 2.입양 및 분양 섹션 - 사진 클릭 시 해당 페이지로 이동하여 정보 기재
// [마이페이지]에서 해당 이미지를 클릭시 팝업으로 이미지 편집 또는 기본 이미지로 전환 기능을 구현해야 한다. > 완료
// [마이페이지]마이페이지 내 내 정보 클릭시 즉시 편집 가능 > 완료
// [마이페이지]메인 인덱스에서 마이페이지 버튼 클릭시 로그인 창으로 이동하며, 로그인 창에서 유효성 검사를 통과시 마이페이지 창으로 이동함 > 완료
// [마이페이지]내정보 레이아웃이 항시 화면 중앙에 있어야함. > 완료 >> 반응형에 따라 구성 필요 > 완료
//[모든 페이지 공통] 로고 클릭 시 index.html로 이동 > 완료
// [모든 페이지 공통]D-day 카운트 기능 : 기준일은 가입일을 기준으로 하며 기준일은 절대 수정이 불가하다. > 완료

// 현재 문제점

// ----------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  // DOM 요소 선택
  const menuToggle = document.getElementById("menu_Toggle");
  const leftMenu = document.getElementById("left_Menu");
  const menuIcon = document.getElementById("menuIcon");
  const mainlogo = document.getElementById("mainlogo");
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pageIndicator = document.querySelector(".page-indicator");
  const dDayElement = document.getElementById("dayCount");
  const dDayLink = document.getElementById("dDayLink");

  let currentIndex = 0;
  let isDragging = false;
  let startX;
  let autoSlideInterval;

  // 메뉴 토글 기능
  function toggleMenu(event) {
    event.stopPropagation();
    leftMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-times");
  }

  // 로고 클릭 시 메인 페이지 이동
  if (mainlogo) {
    mainlogo.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "index.html";
    });
    mainlogo.style.cursor = "pointer";
  } // 커서를 포인터로 변경하여 클릭 가능함을 시각적으로 표시
});

// 메뉴 외부 클릭 시 메뉴 닫기
function closeMenuOnOutsideClick(event) {
  if (!leftMenu.contains(event.target) && !menuToggle.contains(event.target)) {
    leftMenu.classList.remove("active");
    menuToggle.classList.remove("active");
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  }
}
// ver1 슬라이더 기능 하단
function updateSliderPosition(transition = true) {
  if (transition) {
    sliderWrapper.style.transition = "transform 0.5s ease-in-out";
  } else {
    sliderWrapper.style.transition = "none";
  }
  sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateIndicators();
}

function updateIndicators() {
  document.querySelectorAll(".indicator").forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSliderPosition();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSliderPosition();
}

// 페이지 인디케이터 생성
slides.forEach((_, index) => {
  const indicator = document.createElement("div");
  indicator.classList.add("indicator");
  if (index === 0) indicator.classList.add("active");
  indicator.addEventListener("click", () => {
    currentIndex = index;
    updateSliderPosition();
  });
  pageIndicator.appendChild(indicator);
});

// ver1 슬라이더 기능 상단

//ver2 슬라이드 기능 하단
document.addEventListener("DOMContentLoaded", () => {
  const slideArea = document.getElementById("petShowcase");
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pageIndicator = document.querySelector(".page-indicator");

  let currentIndex = 0;
  let startX;
  let isDragging = false;

  // 페이지 인디케이터 생성
  slides.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    if (index === 0) indicator.classList.add("active");
    indicator.addEventListener("click", () => goToSlide(index));
    pageIndicator.appendChild(indicator);
  });

  function updateSliderPosition(transition = true) {
    if (transition) {
      sliderWrapper.style.transition = "transform 0.5s ease-in-out";
    } else {
      sliderWrapper.style.transition = "none";
    }
    sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicators();
  }

  function updateIndicators() {
    document.querySelectorAll(".indicator").forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSliderPosition();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSliderPosition();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSliderPosition();
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // 터치 이벤트
  slideArea.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  slideArea.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    const move = (diff / slideArea.offsetWidth) * 100;
    sliderWrapper.style.transform = `translateX(${
      -currentIndex * 100 - move
    }%)`;
  });

  slideArea.addEventListener("touchend", finishDragging);

  // 마우스 이벤트
  slideArea.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
  });

  slideArea.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = startX - currentX;
    const move = (diff / slideArea.offsetWidth) * 100;
    sliderWrapper.style.transform = `translateX(${
      -currentIndex * 100 - move
    }%)`;
  });

  slideArea.addEventListener("mouseup", finishDragging);
  slideArea.addEventListener("mouseleave", finishDragging);

  function finishDragging(e) {
    if (!isDragging) return;
    isDragging = false;
    const endX = "touches" in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX - endX;
    const threshold = slideArea.offsetWidth * 0.2;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    } else {
      updateSliderPosition();
    }
  }

  // 자동 슬라이드
  setInterval(nextSlide, 5000);
});
// 자동 슬라이드 ver2
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}

// 자동 슬라이드 정지
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// 슬라이드 기능 상단

// D-day 카운트 함수
function updateDDayCount() {
  const joinDate = new Date("2024-08-01"); // 가입일
  const today = new Date();
  const difference = Math.floor((today - joinDate) / (1000 * 60 * 60 * 24));

  const dayCountElement = document.getElementById("dayCount");
  if (dayCountElement) {
    dayCountElement.textContent = difference;
  }

  const dayElement = document.getElementById("day");
  if (dayElement) {
    dayElement.textContent = difference === 1 ? " DAY" : " DAYS";
  }
}

// 페이지 로드 시 함수 실행
window.addEventListener("DOMContentLoaded", updateDDayCount);

// 가입일 설정 함수
function setJoinDate() {
  const joinDate = new Date().toISOString().split("T")[0]; // 오늘 날짜를 YYYY-MM-DD 형식으로 가져옴
  localStorage.setItem("userJoinDate", joinDate);
  updateJoinDateDisplay();
  updateDDayCount();
}

// 가입일 표시 업데이트 함수
function updateJoinDateDisplay() {
  const joinDate = localStorage.getItem("userJoinDate");
  const joinDateDisplay = document.getElementById("joinDateDisplay");
  if (joinDate) {
    joinDateDisplay.textContent = joinDate;
  } else {
    joinDateDisplay.textContent = "미설정";
  }
}

// D-day 카운트 함수
function updateDDayCount() {
  const joinDateString = localStorage.getItem("userJoinDate");

  if (!joinDateString) {
    document.getElementById("dayCount").textContent = "0";
    return;
  }

  const today = new Date();
  const joinDate = new Date(joinDateString);

  const differenceInTime = today.getTime() - joinDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  document.getElementById("dayCount").textContent = differenceInDays;
  document.getElementById("day").textContent =
    differenceInDays === 1 ? " DAY" : " DAYS";
}

// 페이지 로드 시 실행
window.onload = function () {
  updateJoinDateDisplay();
  updateDDayCount();
};

// 로고 클릭 시 메인 페이지 이동
mainlogo.addEventListener("click", function () {
  window.location.href = "index.html";
});

// 마이페이지 버튼 클릭 이벤트
myPageButton.addEventListener("click", function () {
  // 로그인 상태 확인 (예시 - 실제 구현 필요)
  const isLoggedIn = checkLoginStatus();
  if (isLoggedIn) {
    window.location.href = "mypage.html";
  } else {
    window.location.href = "login.html";
  }
});

// 로그인 상태 확인 함수 (예시 - 실제 구현 필요)
function checkLoginStatus() {
  // 여기에 실제 로그인 상태 확인 로직 구현
  return false; // 예시로 항상 로그아웃 상태 반환
}

// 이벤트 리스너 등록
menuToggle.addEventListener("click", toggleMenu);
document.addEventListener("click", closeMenuOnOutsideClick);
prevBtn.addEventListener("click", () => moveSlide(-1));
nextBtn.addEventListener("click", () => moveSlide(1));

// 이벤트 리스너 ver 2
menuToggle.addEventListener("click", toggleMenu);
document.addEventListener("click", closeMenuOnOutsideClick);
prevBtn.addEventListener("click", () => {
  prevSlide();
  stopAutoSlide();
  startAutoSlide();
});
nextBtn.addEventListener("click", () => {
  nextSlide();
  stopAutoSlide();
  startAutoSlide();
});

const sliderContainerParent = document.querySelector(".slider-container");
sliderContainerParent.addEventListener("mouseenter", stopAutoSlide);
sliderContainerParent.addEventListener("mouseleave", startAutoSlide);

// 초기화
updateDDayCount();
startAutoSlide();

// 24.08.17 여기부터 작업하기
// 마이페이지 기능 (mypage.html에서 사용)
if (window.location.pathname.includes("mypage.html")) {
  const profileImage = document.querySelector(".profile-image");
  const petImage = document.querySelector(".pet-image");
  const userInfoElements = document.querySelectorAll(".profile-section p");

  // 프로필 이미지 클릭 이벤트
  profileImage.addEventListener("click", function () {
    openImageEditPopup(this);
  });

  // 펫 이미지 클릭 이벤트
  petImage.addEventListener("click", function () {
    openImageEditPopup(this);
  });

  // 사용자 정보 클릭 이벤트
  userInfoElements.forEach((element) => {
    element.addEventListener("click", function () {
      makeEditable(this);
    });
  });

  // 이미지 업로드 함수
  function uploadImage(imgElement) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = function (event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        imgElement.src = e.target.result;
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  // 기본 이미지로 변경 함수
  function setDefaultImage(imgElement) {
    imgElement.src = "path/to/default/image.jpg"; // 기본 이미지 경로로 변경 필요
  }

  // 텍스트 편집 가능하게 만들기
  function makeEditable(element) {
    const text = element.textContent;
    const input = document.createElement("input");
    input.value = text;
    element.textContent = "";
    element.appendChild(input);
    input.focus();

    input.addEventListener("blur", function () {
      element.textContent = this.value;
    });

    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        element.textContent = this.value;
      }
    });
  }
}

// -----------------------------------------------------------------------
// 요청사항 > 반영 완료  > 해결 안됨
// 1.화면 크기가 변경될때(반응형), 썸네일 이미지 레이아웃이 슬라이더 영역에서 벗어나지 않게 하기
// 2.활성화 되고 지나간 썸네일 이미지가 왼쪽으로 밀려나며 마지막 이미지 다음에서 대기하며 순환하는 구조
// 3.썸네일 이미지의 개수와 상관없이들이 슬라이더 영역안에서만 해당 항목들이 보이게하기
// 4.슬라이드 전환시 트랜지션 효과 주기

// -----------------------------------------------------------------------
// 썸네일 이미지가 보이지 않는 문제와 버튼 위치 문제를 해결

document.addEventListener("DOMContentLoaded", function () {
  // ... 기존 코드 ...

  function updateThumbnailPosition() {
    const containerWidth = thumbnailContainer.offsetWidth;
    const totalWidth = thumbnails.length * thumbnailItemWidth;
    const maxVisibleItems = Math.floor(containerWidth / thumbnailItemWidth);

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

  // ... 나머지 코드 ...

  // 초기 썸네일 위치 설정 및 윈도우 리사이즈 이벤트
  updateThumbnailPosition();
  window.addEventListener("resize", function () {
    thumbnailItemWidth = thumbnails[0].offsetWidth + 10;
    updateThumbnailPosition();
  });
});

// -----------------------------------------------------------------------

// 슬라이드 기능 정지 수정 코드
document.addEventListener("DOMContentLoaded", function () {
  // DOM 요소 선택
  const items = document.querySelectorAll(".slider .list .item");
  const thumbnails = document.querySelectorAll(".thumbnail .item");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const thumbnailContainer = document.querySelector(".thumbnail-container");
  const thumbnail = document.querySelector(".thumbnail");

  // 변수 초기화
  let countItem = items.length;
  let itemActive = 0;
  let thumbnailItemWidth = thumbnails[0].offsetWidth + 10; // 마진 포함

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
  }

  // 썸네일 위치 업데이트 함수
  function updateThumbnailPosition() {
    const containerWidth = thumbnailContainer.offsetWidth;
    const totalWidth = thumbnails.length * thumbnailItemWidth;
    const maxVisibleItems = Math.floor(containerWidth / thumbnailItemWidth);

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

  // 다음 슬라이드 보기
  function nextSlide() {
    showSlide(itemActive + 1);
  }

  // 이전 슬라이드 보기
  function prevSlide() {
    showSlide(itemActive - 1);
  }

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

  // 초기 슬라이드 표시
  showSlide(0);
});

// -----------------------------------------------------------------------
// 반응형이면서도 유연한 슬라이더 기능

document.addEventListener("DOMContentLoaded", function () {
  // 메인 슬라이더 관련 코드 (기존 코드 유지)
  // ...

  // 입양 및 분양 슬라이더 기능
  const adoptSlider = document.querySelector(".adopt-slider");
  const adoptList = adoptSlider.querySelector(".adopt-list");
  const adoptItems = adoptList.querySelectorAll(".adopt-item");
  const adoptPrevBtn = adoptSlider.querySelector(".adopt-prev");
  const adoptNextBtn = adoptSlider.querySelector(".adopt-next");
  let adoptActive = 0;

  function showAdoptSlide(index) {
    adoptItems[adoptActive].classList.remove("active");
    adoptActive = (index + adoptItems.length) % adoptItems.length;
    adoptItems[adoptActive].classList.add("active");
  }

  function createAdoptDots() {
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "adopt-dots";
    adoptItems.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.className = "adopt-dot";
      dot.addEventListener("click", () => {
        showAdoptSlide(index);
        updateAdoptDots();
      });
      dotsContainer.appendChild(dot);
    });
    adoptSlider.appendChild(dotsContainer);
  }

  function updateAdoptDots() {
    const dots = adoptSlider.querySelectorAll(".adopt-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === adoptActive);
    });
  }

  adoptPrevBtn.addEventListener("click", () => {
    showAdoptSlide(adoptActive - 1);
    updateAdoptDots();
  });

  adoptNextBtn.addEventListener("click", () => {
    showAdoptSlide(adoptActive + 1);
    updateAdoptDots();
  });

  // 자동 슬라이드 (5초마다)
  setInterval(() => {
    showAdoptSlide(adoptActive + 1);
    updateAdoptDots();
  }, 5000);

  // 초기 설정
  createAdoptDots();
  updateAdoptDots();

  // 반응형 폰트 크기 조절
  function adjustFontSize() {
    const width = window.innerWidth;
    const mainContent = document.querySelector(".slider .list .item .content");
    const adoptContent = document.querySelectorAll(".adopt-content");

    if (width < 768) {
      document.documentElement.style.fontSize = "14px";
    } else if (width < 1024) {
      document.documentElement.style.fontSize = "16px";
    } else {
      document.documentElement.style.fontSize = "18px";
    }

    // 특정 요소에 대한 미세 조정이 필요한 경우
    if (mainContent) {
      mainContent.style.fontSize = "1rem";
    }
    adoptContent.forEach((content) => {
      content.style.fontSize = "0.9rem";
      content.querySelector("h4").style.fontSize = "1.2rem";
    });
  }

  // 초기 실행 및 리사이즈 이벤트에 연결
  adjustFontSize();
  window.addEventListener("resize", adjustFontSize);
});
// --------------------------------------------------------------------------
// 팝업 이벤트
if (window.location.pathname.includes("mypage.html")) {
  const profileImage = document.querySelector(".profile-image");
  const petImage = document.querySelector(".pet-image");
  const userInfoElements = document.querySelectorAll(".profile-section p");

  // 프로필 이미지 클릭 이벤트
  profileImage.addEventListener("click", function () {
    openImageEditPopup(this);
  });

  // 펫 이미지 클릭 이벤트
  petImage.addEventListener("click", function () {
    openImageEditPopup(this);
  });

  // 사용자 정보 클릭 이벤트 (가입일 제외)
  userInfoElements.forEach((element) => {
    if (!element.textContent.includes("가입일")) {
      element.addEventListener("click", function () {
        makeEditable(this);
      });
    }
  });

// --------------------------------------------------------------------------
// 팝업 이벤트 불가 개선 코드
document.addEventListener("DOMContentLoaded", function() {
  const profileImage = document.querySelector(".profile-image");
  const petImage = document.querySelector(".pet-image");

  // 프로필 이미지 클릭 이벤트
  if (profileImage) {
    profileImage.addEventListener("click", function() {
      openImageEditPopup(this, "프로필");
    });
  }

  // 펫 이미지 클릭 이벤트
  if (petImage) {
    petImage.addEventListener("click", function() {
      openImageEditPopup(this, "반려동물");
    });
  }

  // 이미지 편집 팝업 열기 함수
  function openImageEditPopup(imgElement, type) {
    const popup = document.createElement("div");
    popup.className = "image-edit-popup";
    popup.innerHTML = `
      <div class="popup-content">
        <h3>${type} 이미지 편집</h3>
        <button id="uploadBtn">이미지 업로드</button>
        <button id="defaultBtn">기본 이미지로 변경</button>
        <button id="closeBtn">닫기</button>
      </div>
    `;
    document.body.appendChild(popup);

    // 팝업 스타일 설정
    popup.style.position = "fixed";
    popup.style.top = "0";
    popup.style.left = "0";
    popup.style.width = "100%";
    popup.style.height = "100%";
    popup.style.backgroundColor = "rgba(0,0,0,0.5)";
    popup.style.display = "flex";
    popup.style.justifyContent = "center";
    popup.style.alignItems = "center";

    const popupContent = popup.querySelector(".popup-content");
    popupContent.style.backgroundColor = "white";
    popupContent.style.padding = "20px";
    popupContent.style.borderRadius = "10px";
    popupContent.style.textAlign = "center";

    // 버튼 이벤트 처리
    document.getElementById("uploadBtn").onclick = () => uploadImage(imgElement);
    document.getElementById("defaultBtn").onclick = () => setDefaultImage(imgElement, type);
    document.getElementById("closeBtn").onclick = () => popup.remove();
  }

  // 이미지 업로드 함수
  function uploadImage(imgElement) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = function(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function(e) {
        imgElement.src = e.target.result;
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  // 기본 이미지로 변경 함수
  function setDefaultImage(imgElement, type) {
    const defaultImagePath = type === "프로필" 
      ? "images/마이페이지/profile-2398782_1920.png" 
      : "images/dochi/KakaoTalk_20240809_114425089_01.jpg";
    imgElement.src = defaultImagePath;
  }

  // 여기에 D-day 카운트 및 다른 기능들을 추가할 수 있습니다.
});






// --------------------------------------------------------------------------
// 드래그 기능 [보류]
// 터치 및 마우스 이벤트
// sliderWrapper.addEventListener("mousedown", startDragging);
// sliderWrapper.addEventListener("touchstart", (e) =>
//   startDragging(e.touches[0])
// );
// sliderWrapper.addEventListener("mousemove", drag);
// sliderWrapper.addEventListener("touchmove", (e) => drag(e.touches[0]));
// sliderWrapper.addEventListener("mouseup", endDragging);
// sliderWrapper.addEventListener("touchend", endDragging);
// sliderWrapper.addEventListener("mouseleave", endDragging);

// function startDragging(e) {
//   isDragging = true;
//   startX = e.pageX;
//   stopAutoSlide();
// }

// function drag(e) {
//   if (!isDragging) return;
//   e.preventDefault();
//   const x = e.pageX;
//   const walk = ((x - startX) / sliderWrapper.offsetWidth) * 100;
//   sliderWrapper.style.transform = `translateX(${-currentIndex * 100 + walk}%)`;
// }

// function endDragging() {
//   if (!isDragging) return;
//   isDragging = false;
//   const threshold = 20;
//   const walk = startX - event.pageX;
//   if (Math.abs(walk) > threshold) {
//     if (walk > 0) {
//       nextSlide();
//     } else {
//       prevSlide();
//     }
//   } else {
//     updateSliderPosition();
//   }
//   startAutoSlide();
// }
