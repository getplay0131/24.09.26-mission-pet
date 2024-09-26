document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu_Toggle");
  const leftMenu = document.getElementById("left_Menu");
  const menuIcon = document.getElementById("menuIcon");
  const menuItems = document.querySelectorAll("#left_Menu a:not(#home)");

  let moreButton = document.querySelector(".more-menu-button");
  if (!moreButton) {
    moreButton = document.createElement("div");
    moreButton.className = "more-menu-button";
    moreButton.innerText = "더보기 ▼";
    leftMenu.appendChild(moreButton);
  }

  function toggleMenu(event) {
    event.stopPropagation();
    leftMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-times");
    checkMenuOverflow();
  }

  function closeMenuOnOutsideClick(event) {
    if (
      !leftMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      leftMenu.classList.remove("active");
      menuToggle.classList.remove("active");
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    }
  }

  function checkMenuOverflow() {
    const menuList = leftMenu.querySelector("ul");
    if (
      menuList.scrollHeight >
      leftMenu.clientHeight - moreButton.offsetHeight
    ) {
      moreButton.style.display = "block";
      leftMenu.style.maxHeight = `calc(100vh - 60px - ${moreButton.offsetHeight}px)`;
    } else {
      moreButton.style.display = "none";
      leftMenu.style.maxHeight = "calc(100vh - 60px)";
    }
  }

  moreButton.onclick = function () {
    leftMenu.style.maxHeight = `calc(100vh - 60px)`;
    this.style.display = "none";
  };

  menuToggle.addEventListener("click", toggleMenu);
  document.addEventListener("click", closeMenuOnOutsideClick);
  window.addEventListener("resize", checkMenuOverflow);

  menuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      alert("해당 페이지는 현재 작업 중입니다. 불편을 드려 죄송합니다.");
    });
  });

  // 초기 설정
  checkMenuOverflow();
});
