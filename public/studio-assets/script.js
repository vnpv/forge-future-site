(function () {
  "use strict";

  var form = document.getElementById("apply-form");
  var errorEl = document.getElementById("form-error");
  var successEl = document.getElementById("apply-success");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var required = form.querySelectorAll("[required]");
    var valid = true;

    required.forEach(function (field) {
      if (!field.value.trim()) valid = false;
    });

    if (!valid) {
      errorEl.hidden = false;
      return;
    }

    errorEl.hidden = true;

    // ФОРМА_URL не задано в контенті. Тут форма веде на існуючий
    // Telegram-бот воронки Forge Future (@ivanpervoy_bot) — потрібно
    // додати обробку параметра "studio" на боці бота, або замінити
    // action форми на реальний ендпоінт прийому заявок.
    var destination = form.getAttribute("action");

    form.hidden = true;
    successEl.hidden = false;

    if (destination) {
      window.open(destination, "_blank", "noopener");
    }
  });
})();
