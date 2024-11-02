const body = document.body;


const header = document.createElement("div");
  header.classList.add('header');
  header.textContent = ("МОМЕНТЫ");

const input = document.createElement('input');
  input.id = 'fileInput';
  input.type = 'file';
  input.setAttribute('multiple', true);
  input.setAttribute('accept','.png, .jpg, .jpeg');
  input.classList.add("input_file");

const mainWind = document.createElement('div');
  mainWind.classList.add('main-block');
  mainWind.appendChild(input);

const mainCardBlock = document.createElement('div');
  mainCardBlock.classList.add('info-card__block');
  mainWind.appendChild(mainCardBlock);

  input.addEventListener('change', function(event) {
    const files = event.target.files;

    if (files.length > 5) {
      alert('Можно  выбрать  не  более  5  файлов!');
      return; 
    }
    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        alert(`Файл  "${file.name}"  слишком  большой!  Максимальный  размер  -  10  МБ.`);
        return;
      }
    
     const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
     if (!allowedTypes.includes(file.type)) {
       alert(`Файл  "${file.name}"  не  является  JPEG  или  PNG!`);
       input.value = ''; 
       return; 
      }
      const fileInfo = document.createElement('div');
      fileInfo.classList.add('info-card');
        fileInfo.textContent = `
        Имя: ${file.name}
        Тип: ${file.type}
        Размер: ${file.size / 1024} КБ
        `;
        mainCardBlock.appendChild(fileInfo);
    }
  });



  body.appendChild(header);
  body.appendChild(mainWind);
  