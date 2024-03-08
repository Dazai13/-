// Получаем все слайды
var slides = document.querySelectorAll('.carousel');
// Текущий индекс слайда
var currentSlideIndex = 0;

// Функция для отображения текущего слайда
function showSlide(index) {
    // Проверяем, что индекс находится в допустимом диапазоне
    if (index >= 0 && index < slides.length) {
        // Скрываем все слайды
        slides.forEach(function(slide) {
            slide.style.display = 'none';
        });
        // Отображаем текущий слайд
        slides[index].style.display = 'block';
    }
}

// Функция для создания кнопок страниц
function createPageButtons() {
    var pageNumberContainer = document.querySelector('.page-numbers');
    pageNumberContainer.innerHTML = ''; // Очищаем содержимое контейнера кнопок
    for (var i = 0; i < slides.length; i++) {
        var button = document.createElement('button');
        button.classList.add('page-button');
        button.textContent = i + 1;
        button.addEventListener('click', function() {
            var pageIndex = parseInt(this.textContent) - 1;
            showSlide(pageIndex);
        });
        pageNumberContainer.appendChild(button);
    }
}

// Создаем кнопки страниц
createPageButtons();

// Функция для перехода к предыдущему слайду
function goToPrevSlide() {
    currentSlideIndex--;
    if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    showSlide(currentSlideIndex);
}

// Функция для перехода к следующему слайду
function goToNextSlide() {
    currentSlideIndex++;
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    }
    showSlide(currentSlideIndex);
}

// Функция для разделения таблицы на слайды
function splitTableIntoSlides() {
  var tableRows = document.querySelectorAll('#data-table tbody tr');
  var slideHeight = 700;
  var currentSlide = null;
  var currentSlideHeight = 0;
  
  // Перебираем все строки таблицы
  tableRows.forEach(function(row) {
      // Если текущая строка не помещается в текущий слайд, создаем новый слайд
      if (!currentSlide || currentSlideHeight + row.clientHeight > slideHeight) {
          // Создаем новый слайд
          currentSlide = document.createElement('div');
          currentSlide.classList.add('carousel');
          currentSlideHeight = 0;
          // Вставляем новый слайд после последнего слайда
          document.querySelector('.slider').appendChild(currentSlide);
      }
      
      // Перемещаем строку в текущий слайд
      currentSlide.appendChild(row);
      currentSlideHeight += row.clientHeight;
  });
  
  // Переинициализируем переменные слайдера
  slides = document.querySelectorAll('.carousel');
  currentSlideIndex = 0;
  createPageButtons(); // Создаем кнопки страниц для новых слайдов
}

// Вызываем функцию разделения таблицы на слайды после загрузки страницы
window.addEventListener('load', splitTableIntoSlides);
