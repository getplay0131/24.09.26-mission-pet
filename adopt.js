document.addEventListener("DOMContentLoaded", function () {
  // 입양 및 분양 슬라이더 기능
  const adoptSlider = document.querySelector(".adopt-slider");
  const adoptList = adoptSlider.querySelector(".adopt-list");
  const adoptItems = adoptList.querySelectorAll(".adopt-item");
  const adoptPrevBtn = adoptSlider.querySelector(".adopt-prev");
  const adoptNextBtn = adoptSlider.querySelector(".adopt-next");

  let adoptActive = 0;

  // 입양 분양 섹션 슬라이드쇼 기능
  function showAdoptSlide(index) {
    adoptItems[adoptActive].classList.remove("active");
    adoptActive = (index + adoptItems.length) % adoptItems.length;
    adoptItems[adoptActive].classList.add("active");
  }

  // 슬라이드 아이템 수에 따른 도트 생성하기
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

  // 현재 활성화된 슬라이드에 해당하는 도트를 강조 표시
  function updateAdoptDots() {
    const dots = adoptSlider.querySelectorAll(".adopt-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === adoptActive);
    });
  }

  // 반응형 폰트 크기 조절
  function adjustFontSize() {
    const width = window.innerWidth;
    const mainContent = document.querySelector(".slider .list .item .content");
    const adoptContent = document.querySelectorAll(".adopt-content");
    if (mainContent) {
      mainContent.style.fontSize = width;
    }
    adoptContent.forEach((content) => {
      content.style.fontSize = "0.9rem";
      content.querySelector("h4").style.fontSize = "1.2rem";
    });
  }

  function updateFontSize() {
    const content = document.querySelector(".slider .list .item .content");
    if (window.matchMedia("(min-width: 1200px)").matches) {
      content.style.fontSize = "3.5rem";
    } else {
      content.style.fontSize = "1.8rem";
    }
  }

  // 슬라이드 전환 시 이 함수를 호출

  // 입양 및 분양 섹션에서 이전 버튼 클릭시 이벤트 리스너
  adoptPrevBtn.addEventListener("click", () => {
    showAdoptSlide(adoptActive - 1);
    updateAdoptDots();
  });

  // 입양 및 분양 섹션에서 다음 버튼 클릭시 이벤트 리스너
  adoptNextBtn.addEventListener("click", () => {
    showAdoptSlide(adoptActive + 1);
    updateAdoptDots();
  });

  // 자동 슬라이드 (5초마다)
  setInterval(() => {
    showAdoptSlide(adoptActive + 1);
    updateAdoptDots();
  }, 5000);

  createAdoptDots();
  updateAdoptDots();
  adjustFontSize();
  window.addEventListener("resize", adjustFontSize);
});
