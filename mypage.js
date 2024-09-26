// 문서가 완전히 로드되었을 때 실행될 함수를 정의합니다.
document.addEventListener("DOMContentLoaded", () => {
  // HTML 요소들을 JavaScript에서 사용하기 위해 변수에 할당합니다.
  const profileImage = document.getElementById("profileImage"); // 프로필 이미지 요소
  const petImage = document.getElementById("petImage"); // 반려동물 이미지 요소
  const popup = document.getElementById("imageEditPopup"); // 이미지 편집 팝업 요소
  const popupTitle = document.getElementById("popupTitle"); // 팝업 제목 요소
  const uploadBtn = document.getElementById("uploadBtn"); // 이미지 업로드 버튼
  const defaultBtn = document.getElementById("defaultBtn"); // 기본 이미지 설정 버튼
  const closeBtn = document.getElementById("closeBtn"); // 팝업 닫기 버튼

  let currentImage = null; // 현재 편집 중인 이미지를 저장할 변수

  // 이미지 편집 관련 함수들
  // 팝업을 열기 위한 함수를 정의합니다.
  function openPopup(image, title) {
    currentImage = image; // 현재 편집 중인 이미지 설정
    popupTitle.textContent = title + " 이미지 편집"; // 팝업 제목 설정
    popup.style.display = "flex"; // 팝업을 화면에 표시
  }

  // 팝업을 닫기 위한 함수를 정의합니다.
  function closePopup() {
    popup.style.display = "none"; // 팝업을 화면에서 숨김
  }

  // 프로필 이미지 클릭 시 팝업을 여는 이벤트 리스너를 추가합니다.
  profileImage.addEventListener("click", () =>
    openPopup(profileImage, "프로필")
  );

  // 반려동물 이미지 클릭 시 팝업을 여는 이벤트 리스너를 추가합니다.
  petImage.addEventListener("click", () => openPopup(petImage, "반려동물"));

  // 이미지 업로드 버튼 클릭 시 실행될 함수를 정의합니다.
  uploadBtn.addEventListener("click", function () {
    const input = document.createElement("input"); // 파일 입력 요소 생성
    input.type = "file"; // 입력 타입을 파일로 설정
    input.accept = "image/*"; // 이미지 파일만 선택 가능하도록 설정
    input.onchange = function (event) {
      // 파일이 선택되었을 때 실행될 함수
      const file = event.target.files[0]; // 선택된 파일
      const reader = new FileReader(); // 파일을 읽기 위한 FileReader 객체 생성
      reader.onload = function (e) {
        // 파일 읽기가 완료되었을 때 실행될 함수
        currentImage.src = e.target.result; // 이미지 소스를 선택된 파일로 변경
        closePopup(); // 팝업 닫기
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 읽기 시작
    };
    input.click(); // 프로그래매틱하게 파일 선택 대화상자 열기
  });

  // 기본 이미지 설정 버튼 클릭 시 실행될 함수를 정의합니다.
  defaultBtn.addEventListener("click", function () {
    // 현재 이미지에 따라 기본 이미지 경로 설정
    const defaultImagePath =
      currentImage === profileImage
        ? "images/마이페이지/profile-2398782_1920.png"
        : "images/dochi/KakaoTalk_20240809_114425089_01.jpg";
    currentImage.src = defaultImagePath; // 이미지 소스를 기본 이미지로 변경
    closePopup(); // 팝업 닫기
  });

  // 팝업 닫기 버튼에 이벤트 리스너 추가
  closeBtn.addEventListener("click", closePopup);

  // D-day 카운트 계산 함수
  function updateDDayCount() {
    const joinDate = new Date("2024-08-01"); // 가입일 설정
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

  // 텍스트 편집 가능하게 만드는 함수
  function makeEditable(element) {
    element.addEventListener("click", function (e) {
      e.stopPropagation(); // 이벤트 버블링 방지 (클릭 이벤트가 상위 요소로 전파되는 것을 막음)

      if (this.querySelector("input")) return; // 이미 편집 중이면 추가 동작 방지

      const text = this.textContent; // 현재 텍스트 내용 저장
      const input = document.createElement("input"); // 새 입력 요소 생성
      input.value = text; // 입력 요소에 현재 텍스트 설정
      input.className = "editable-input"; // CSS 클래스 추가
      this.textContent = ""; // 기존 텍스트 제거
      this.appendChild(input); // 입력 요소 추가
      input.focus(); // 입력 요소에 포커스

      // 변경사항 저장 함수
      const saveChanges = () => {
        const newText = input.value.trim(); // 입력된 새 텍스트 (앞뒤 공백 제거)
        this.textContent = newText || text; // 새 텍스트가 비어있으면 원래 텍스트로 복원
      };

      // 포커스를 잃었을 때 변경사항 저장
      input.addEventListener("blur", saveChanges);

      // Enter 키 입력 시 변경사항 저장 및 편집 종료
      input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          saveChanges();
          input.blur(); // 포커스 제거
        }
      });
    });
  }

  // 마이페이지에서만 실행될 코드
  if (window.location.pathname.includes("mypage.html")) {
    // 편집 가능한 요소들에 이벤트 리스너 추가
    const editableContents = document.querySelectorAll(".editable-content");
    editableContents.forEach((element) => {
      makeEditable(element);
    });

    // 문서 전체에 클릭 이벤트 리스너 추가 (편집 모드 종료를 위함)
    document.addEventListener("click", function (e) {
      // 클릭된 요소가 편집 중인 입력 요소가 아닌 경우
      if (!e.target.classList.contains("editable-input")) {
        const inputs = document.querySelectorAll(".editable-input");
        inputs.forEach((input) => {
          const parent = input.parentElement;
          // 입력된 값이 있으면 그 값을, 없으면 원래 텍스트를 사용
          parent.textContent = input.value.trim() || parent.textContent;
        });
      }
    });
  }

  // 페이지 로드 시 D-day 카운트 함수 실행
  updateDDayCount();
});
