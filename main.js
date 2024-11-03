const body = document.body;

// Форма
const myForm = document.createElement('form');
myForm.id = 'inputForm';
myForm.action = ' ';
body.appendChild(myForm);

// Инпут в форме
const input = document.createElement('input');
input.id = 'myInput';
input.type = 'file';
input.name = '';
input.setAttribute('multiple', true);
input.setAttribute('accept', '.png, .jpg, .jpeg');
myForm.appendChild(input);

// Див блок с файлами
const mainCardBlock = document.createElement('div');
mainCardBlock.classList.add('main-card__block');
myForm.appendChild(mainCardBlock);

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
    textSize.textContent = `Размер: ${file.size} кб`;

    // кнопка удаления блока
    const btnRemove = document.createElement('button');
    btnRemove.classList.add('btn-delete_block');
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
btnSend.type = 'submit';
btnSend.innerHTML = 'SEND';
myForm.appendChild(btnSend);

