"use strict";

var btns = document.body.getElementsByTagName("button");
// 0 - отменить, 1 - сохранить, 2 - изменить
var textBlock = document.querySelector(".textblock");

//создаем объект для localStorage
var d = new Date();
var obj = {
  id: 0,
  text: textBlock.innerHTML,
  date: formatDate(d),
};

var log = document.querySelector(".history");

var serialObj = JSON.stringify(obj);

// если длина localStorage < 1, добавляем в него первоначальный текст,
// если больше тогда добавляем все имеющиеся записи в localStorage
if (localStorage.length < 1) {
  localStorage.setItem("firstText", serialObj);
} else {
  for (var i = 1; i < localStorage.length; i++) {
    var addLog = document.createElement("p");
    var logdate = JSON.parse(localStorage["text " + i]);
    addLog.innerHTML = "text " + i + " - " + logdate.date;
    log.appendChild(addLog);
  }
}

//создаем обработчик для логов
log.onclick = function (e) {
  var index = [].slice.call(this.children).indexOf(e.target);
  if (index > 0) {
    var post = JSON.parse(localStorage["text " + index]);
    textBlock.innerHTML = post.text;
  }
};

// код кнопки "изменить"
btns[2].onclick = function () {
  textBlock.setAttribute("contenteditable", true);
  this.classList.add("hide");
  btns[1].classList.remove("hide");
  btns[0].classList.remove("hide");
};

//код кнопки "отменить"
btns[0].onclick = function () {
  //убирает кнопки и редактируемость
  textBlock.setAttribute("contenteditable", false);
  this.classList.add("hide");
  btns[1].classList.add("hide");
  btns[2].classList.remove("hide");
  // код для возвращения последней версии из localStorage
  var lastBlock = Math.max(localStorage.length) - 1;
  let post = JSON.parse(localStorage["text " + lastBlock]);
  textBlock.innerHTML = post.text;
};

//код кнопки "сохранить"
btns[1].onclick = function () {
  //сохраняет новую версию в localStorage
  var length = localStorage.length;
  let d = new Date();
  for (var i = 0; i <= length; i++) {
    obj.id = i;
    obj.text = textBlock.innerHTML;
    obj.date = formatDate(d);
    if (i == length) {
      var addLog = document.createElement("p");
      log.appendChild(addLog);
      addLog.innerHTML = "text " + i + " - " + obj.date;
      localStorage["text " + i] = JSON.stringify(obj);
    }
  }
  //убирает кнопки и редактируемость
  textBlock.setAttribute("contenteditable", false);
  this.classList.add("hide");
  btns[0].classList.add("hide");
  btns[2].classList.remove("hide");
};

//код для возврата к изначальному тексту
var baseText = document.querySelector(".history p");

baseText.onclick = function () {
  var post = JSON.parse(localStorage["firstText"]);
  textBlock.innerHTML = post.text;
};

//формат даты
function formatDate(date) {
  var getMonthsName = function () {
    var months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    return months[date.getMonth()];
  };

  var getDaysName = function () {
    var days = [
      "воскресенье",
      "понедельник",
      "вторник",
      "среда",
      "четверг",
      "пятница",
      "суббота",
    ];
    return days[date.getDay()];
  };

  function declOfNum(number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }

  return (
    " " +
    date.getDate() +
    " " +
    getMonthsName() +
    " " +
    date.getFullYear() +
    " года, " +
    getDaysName() +
    ", " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds()
  );
}
