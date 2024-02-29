/*Курсор на месте при перезагрузкке (Пункт 3)*/

window.addEventListener('beforeunload', function(event) {
    localStorage.setItem('cursorX', event.clientX);
    localStorage.setItem('cursorY', event.clientY);
  });

/*Слайде*/
var slider = document.querySelector(".slider");
var carousel = document.querySelector(".carousel");
var slideWidth = carousel.offsetWidth;

function goToSlide(index) {
    carousel.style.transform = "translateX(" + (-slideWidth * index) + "px)";
}

function prevSlide() {
    var currentIndex = Math.abs(carousel.style.transform) / slideWidth;
    var prevIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    goToSlide(prevIndex);
}

function nextSlide() {
    var currentIndex = Math.abs(carousel.style.transform) / slideWidth;
    var slidesCount = carousel.children.length / 2; // Учитываем количество строк в таблице
    var nextIndex = currentIndex < slidesCount - 1 ? currentIndex + 1 : slidesCount - 1;
    goToSlide(nextIndex);
}
/*Кнопка DESELECT (Пункт 6)*/
function clearFields() {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type === "text") {
            inputs[i].value = "";
        }
    }
}

/*Крестик на поиске(Пункт 2) */


var input1 = document.getElementById("searchInput1");
var input2 = document.getElementById("searchInput2");
var input3 = document.getElementById("searchInput3");
var input4 = document.getElementById("searchInput4");
var input5 = document.getElementById("searchInput5");
var input6 = document.getElementById("searchInput6");
var input7 = document.getElementById("searchInput7");
var input8 = document.getElementById("searchInput8");

var clearIcon1 = document.getElementById("clearIcon1");
var clearIcon2 = document.getElementById("clearIcon2");
var clearIcon3 = document.getElementById("clearIcon3");
var clearIcon4 = document.getElementById("clearIcon4");
var clearIcon5 = document.getElementById("clearIcon5");
var clearIcon6 = document.getElementById("clearIcon6");
var clearIcon7 = document.getElementById("clearIcon7");
var clearIcon8 = document.getElementById("clearIcon8");

input1.addEventListener("input", function() {
    manageClearIcon(input1, clearIcon1);
});
input2.addEventListener("input", function() {
    manageClearIcon(input2, clearIcon2);
});
input3.addEventListener("input", function() {
    manageClearIcon(input3, clearIcon3);
});
input4.addEventListener("input", function() {
    manageClearIcon(input4, clearIcon4);
});
input5.addEventListener("input", function() {
    manageClearIcon(input5, clearIcon5);
});
input6.addEventListener("input", function() {
    manageClearIcon(input6, clearIcon6);
});
input7.addEventListener("input", function() {
    manageClearIcon(input7, clearIcon7);
});
input8.addEventListener("input", function() {
    manageClearIcon(input8, clearIcon8);
});

function manageClearIcon(input, clearIcon) {
    if (input.value.length > 0) {
        clearIcon.style.display = "inline-block";
    } else {
        clearIcon.style.display = "none";
    }
}

var clearIcons = document.querySelectorAll("[id^='clearIcon']");
for (var i = 0; i < clearIcons.length; i++) {
    clearIcons[i].addEventListener("mouseover", function() {
        this.style.opacity = "0.5";
    });
    clearIcons[i].addEventListener("mouseout", function() {
        this.style.opacity = "1";
    });
}

function clearSearch(index) {
    var input = document.getElementById("searchInput" + index);
    var clearIcon = document.getElementById("clearIcon" + index);
    input.value = "";
    clearIcon.style.display = "none";
}

