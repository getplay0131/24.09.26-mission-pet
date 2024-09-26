document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const toggleButton = document.querySelector(".password-toggle");
  toggleButton.addEventListener("click", togglePassword);

  if (toggleButton) {
    toggleButton.addEventListener("click", togglePassword);
  }

  // 하단:   로그인 체크
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "passwords") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "mypage.html";
    } else {
      alert("입력한 정보가 일치하지 않습니다.");
      loginForm.reset();
    }
  });
  // 상단:   로그인 체크

  //   글쓰기 버튼 클릭 시 로그인 체크
  function checkLoginBeforeWrite() {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      window.location.href = "login.html";
      return false;
    }
    return true;
  }

  function togglePassword() {
    const passwordInput = document.getElementById("password");
    const toggleButton = document.querySelector(".password-toggle");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleButton.textContent = "🙈";
    } else {
      passwordInput.type = "password";
      toggleButton.textContent = "👁️";
    }
  }

  // 종료지점
});
