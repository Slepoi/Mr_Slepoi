let isFormSubmitted = false;

function submitForm() {
  event.preventDefault();
  const form = document.getElementById("myForm");
  const name = form.elements["name"].value;
  const phone = form.elements["phone"].value;
  
  // Проверка на заполненность формы
  if (!name || !phone) {
    alert("Заполните все поля формы!");
    return false;
  }
  
  // Проверка наличия предыдущей заявки
  if (isFormSubmitted) {
    alert("Вы уже оставляли заявку на этой странице!");
    return false;
  }
  
  const data = {
    stream_code: "vv4uf",
    client: {
      phone: phone,
      name: name,
    },
  };
  const json = JSON.stringify(data);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://order.drcash.sh/v1/order", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer RLPUUOQAMIKSAB2PSGUECA");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      window.location.href = "https://slepoi.github.io/Mr_Slepoi/thankyou.html";
      isFormSubmitted = true; // Устанавливаем флаг, что заявка отправлена
      localStorage.setItem("isFormSubmitted", true); // Сохраняем информацию о том, что заявка была отправлена
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      alert("Ошибка отправки заказа. Попробуйте еще раз!");
    }
  };
  xhr.send(json);
  return false;
}

window.onload = function() {
  // Проверка наличия предыдущей заявки
  if (localStorage.getItem("isFormSubmitted")) {
    isFormSubmitted = true;
  }
}