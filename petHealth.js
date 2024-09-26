document.addEventListener("DOMContentLoaded", () => {
  // 하단 : 펫헬스 항목 클릭시 알림창 발생

  document.querySelectorAll("#petInfo .todoyInfo li a").forEach((button) => {
    button.addEventListener("click", function () {
      alert("해당 기능은 현재 작업중입니다. 불편을 드려 죄송합니다.");
    });
  });
  document.querySelectorAll("#petInfo .savedInfo li a").forEach((button) => {
    button.addEventListener("click", function () {
      alert("해당 기능은 현재 작업중입니다. 불편을 드려 죄송합니다.");
    });
  });
  document.querySelectorAll("#petInfo .relateddog li a").forEach((button) => {
    button.addEventListener("click", function () {
      alert("해당 기능은 현재 작업중입니다. 불편을 드려 죄송합니다.");
    });
  });
  document.querySelectorAll("#petInfo .relatedcat li a").forEach((button) => {
    button.addEventListener("click", function () {
      alert("해당 기능은 현재 작업중입니다. 불편을 드려 죄송합니다.");
    });
  });
  document
    .querySelectorAll("#petInfo .material-symbols-outlined")
    .forEach((button) => {
      button.addEventListener("click", function () {
        alert("해당 기능은 현재 작업중입니다. 불편을 드려 죄송합니다.");
      });
    });
  // 상단 : 펫헬스, 펫트레이닝 항목 클릭시 알림창 발생
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
  updateDDayCount();

  // 종료지점
});
