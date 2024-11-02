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


  body.appendChild(header);
  body.appendChild(mainWind);
  