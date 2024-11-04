const body = document.body;

// шапка
const headerMainTetx = document.createElement("h2");
headerMainTetx.classList.add("mainTextHead");
headerMainTetx.innerHTML = "сохрани свои";
body.appendChild(headerMainTetx);

const headerTetx = document.createElement("h1");
headerTetx.classList.add("textHead");
headerTetx.innerHTML = 'МОМЕНТЫ';
body.appendChild(headerTetx);

//лого
const imgLogo = document.createElement('div');
imgLogo.classList.add('main-logo');
body.appendChild(imgLogo);
const textLogo = document.createElement('p');
textLogo.classList.add('text-logo');
textLogo.innerHTML = 'Мои <br> моменты';
body.appendChild(textLogo);

// Форма
const myForm = document.createElement('form');
myForm.id = 'inputForm';
myForm.action = ' ';
body.appendChild(myForm);

//span for input
const spanInput = document.createElement('span');
spanInput.classList.add('label');
spanInput.innerHTML = '';
myForm.appendChild(spanInput);

// Инпут в форме
const input = document.createElement('input');
input.id = 'myInput';
input.type = 'file';
input.name = '';
input.classList.add('upload-box');
input.setAttribute('multiple', true);
input.setAttribute('accept', '.png, .jpg, .jpeg');
myForm.appendChild(input);

// Див блок с файлами
const mainCardBlock = document.createElement('div');
mainCardBlock.classList.add('main-card__block');
mainCardBlock.id = 'dropZone';
myForm.appendChild(mainCardBlock);

const dropZone = document.getElementById("dropZone");

dropZone.addEventListener("dragover",(e) => {
  e.preventDefault();
  dropZone.classList.add('active');
});

dropZone.addEventListener("drop",(e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  input.files = files;
  input.dispatchEvent(new Event("change"));
  dropZone.classList.remove('active');
});


input.addEventListener('change', function(event) {
  const files = event.target.files;

  // Кол-во выбранных файлов (макс знач: 5)
  if (files.length > 5) {
    alert('Можно  выбрать  не  более  5  файлов!');
    return;
  }
  // очищаем после выбранных
  mainCardBlock.innerHTML = '';
  // Размер одного файла не больше 10мб
  for (const file of files) {
    if (file.size > 10 * 1024 * 1024) { // 10 МБ = 10 * 1024 * 1024 байт
      alert(`Файл "${file.name}" слишком большой!  Максимальный  размер  -  10  МБ.`);
      return;
    }

    // Создаем массив для выбора файла
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert(`Файл "${file.name}" не  является  JPEG  или  PNG!`);
      return;
    }

    // Выводим информацию о файле в блок
    const cardBlock = document.createElement('div'); // Создаем новый div для файла
    cardBlock.classList.add('item-card');

    // Создаем элемент img
    const previewImage = document.createElement('img');
    previewImage.classList.add('preview-image');

    // Читаем файл как Base64 с помощью FileReader
    const reader = new FileReader();
    reader.onload = function(e) {
      previewImage.src = e.target.result; // Устанавливаем src для img
    }
    reader.readAsDataURL(file); // Читаем файл

    const textName = document.createElement('p');
    cardBlock.appendChild(textName);
    textName.textContent = `Имя: ${file.name}`;
    
    const textType = document.createElement('p');
    cardBlock.appendChild(textType);
    textType.textContent = `Тип: ${file.type}`;

    const textSize = document.createElement('p');
    cardBlock.appendChild(textSize);
    textSize.textContent = `Размер: ${file.size} б`;

    // кнопка удаления блока
    const btnRemove = document.createElement('button');
    btnRemove.classList.add('btn-delete_block');
    btnRemove.innerHTML ="🗑️";
    cardBlock.appendChild(btnRemove);
    btnRemove.addEventListener ('click',function(){
      mainCardBlock.removeChild(cardBlock);
    });

    // Добавляем img в div
    cardBlock.appendChild(previewImage);
    // Добавляем div в mainCardBlock
    mainCardBlock.appendChild(cardBlock);
    
  }
});

const btnSend = document.createElement('button');
btnSend.classList.add('btn-sendForm');
btnSend.type = 'sumbit';
btnSend.innerHTML = 'SEND';
myForm.appendChild(btnSend);

const loader = document.createElement('div');
loader.id = 'loader';
loader.style.display = 'none'; 
loader.classList.add('loaders');
myForm.appendChild(loader);

btnSend.addEventListener('click', function(event) {
  event.preventDefault(); 
  loader.style.display = 'block'; // Включаем загрузчик
  // Имитация отправки формы
  setTimeout(() => {
    loader.style.display = 'none'; // Скрываем загрузчик
    alert('Форма отправлена!');
    location.reload();
  }, 2000); // 2 секунды для симуляции загрузки

});