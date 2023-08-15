const audioplayer = document.getElementById('audioplayer');
const barraTiempo = document.getElementById('barra-tiempo');
const adelantoBarra = document.getElementById('adelanto-barra');
adelantoBarra.min = 0;
adelantoBarra.max = 100;
adelantoBarra.step = 1;
const imgCanciones = document.getElementById('img-canciones');
const nombreCancion = document.getElementById('nombre-cancion');
const pantallaReproductor = document.getElementById('pantallareproductor');
const listaCanciones = document.getElementById('lista-canciones');
const botonLista= document.querySelector('.boton');
const btnReproducirPausar = document.querySelector('.btnReproducirPausar');
const btnAdelantar= document.querySelector('.btnAdelantar');
const btnRetroceder= document.querySelector('.btnRetroceder');




const audios = [
  {
    src: 'Assets/audios/y2mate.com - Redimi2  Todo Va a Estar Bien Video Oficial ft Evan Craft.mp3',
    image: 'Assets/img/Todo Va a Estar Bien.jpg',
    title: 'Todo va a estar bien'
  },
  {
    src: 'Assets/audios/y2mate.com - Tones and I  Dance Monkey Lyrics.mp3',
    image: 'Assets/img/Dance Monkey.jpg',
    title: 'Dance Monkey'
  },
  {
    src: 'Assets/audios/y2mate.com - Michael Jackson  Billie Jean Official Video.mp3',
    image: 'Assets/img/Billi Jean.jpg',
    title: 'Billie Jean'
  },
  {
    src: 'Assets/audios/y2mate.com - Daft Punk  Get Lucky Official Audio ft Pharrell Williams Nile Rodgers.mp3',
    image: 'Assets/img/Get Lucky.jpg',
    title: 'Get Lucky'
  },
  {
    src: 'Assets/audios/El Nombre de Jesús (Video Oficial) ft. Christine.mp3',
    image: 'Assets/img/El Nombre De Jesus.jpg',
    title: 'El Nombre de Jesus'
  },
  {
    src: 'Assets/audios/Arctic Monkeys - Do I Wanna Know (Official Video).mp3',
    image: 'Assets/img/Do I Wanna Know.png',
    title: 'Do I Wanna Know'
  },
  {
    src: 'Assets/audios/Jain - Makeba (Ooohe, Makeba, Makeba ma qué bella)  Sub Español.mp3',
    image: 'Assets/img/Makeva Jain.jpg',
    title: 'Makeva Jain'
  },
  {
    src: 'Assets/audios/X2Download.app - Else - Paris (128 kbps).mp3',
    image: 'Assets/img/Else Makeva.jpg',
    title: 'Else Paris'
  }
];

let currentAudioIndex = 0;


adelantoBarra.addEventListener('input', function() {
  const adelantoPorcentaje = adelantoBarra.value / 100;
  const nuevaPosicion = adelantoPorcentaje * audioplayer.duration;
  audioplayer.currentTime = nuevaPosicion;
});

audioplayer.addEventListener('ended', function() {
  currentAudioIndex = (currentAudioIndex + 1) % audios.length;
  cargarAudio(currentAudioIndex);
});

audioplayer.addEventListener('timeupdate', function() {
  const duracionActual = audioplayer.currentTime;
  const duracionTotal = audioplayer.duration;
  const porcentajeDuracion = (duracionActual / duracionTotal) * 100;

  adelantoBarra.value = porcentajeDuracion;

  tiempoRecorrido.textContent = formatTime(duracionActual);

  const tiempoRestanteSegundos = Math.floor(duracionTotal - duracionActual);
  tiempoRestante.textContent = `-${formatTime(tiempoRestanteSegundos)}`;
});

function cargarAudio(index) {
  audioplayer.src = audios[index].src;
  imgCanciones.src = audios[index].image;
  pantallaReproductor.style.backgroundImage = `url('${audios[index].image}')`;
  audioplayer.load();
  audioplayer.play();
  nombreCancion.textContent = audios[index].title;
  adelantoBarra.value = 0;
}

cargarAudio(currentAudioIndex);

let isPlaying = false;

btnReproducirPausar.addEventListener('click', function() {
  if (isPlaying) {
    audioplayer.pause();
    btnReproducirPausar.innerHTML = '<img src="Assets/img/icons8-play-32.png" alt="">'; 
  } else {
    audioplayer.play();
    btnReproducirPausar.innerHTML = '<img src="Assets/img/icons8-pausa-32.png" alt="">';
  }
  isPlaying = !isPlaying;
});


btnRetroceder.addEventListener('click', function() {
  currentAudioIndex = (currentAudioIndex - 1 + audios.length) % audios.length;
  cargarAudio(currentAudioIndex);
});

btnAdelantar.addEventListener('click', function() {
  currentAudioIndex = (currentAudioIndex + 1) % audios.length;
  cargarAudio(currentAudioIndex);
});

function cargarListaCanciones() {
  listaCanciones.innerHTML = '';

  for (let i = 0; i < audios.length; i++) {
    const li = document.createElement('li');
    li.textContent = audios[i].title;
    li.setAttribute('data-index', i);
    li.addEventListener('click', function() {
      const clickedIndex = parseInt(li.getAttribute('data-index'));
      cargarAudio(clickedIndex);
      imgCanciones.src = audios[clickedIndex].image;
      listaCanciones.classList.add('hidden');
    });
    listaCanciones.appendChild(li);
  }

  listaCanciones.classList.toggle('hidden');
}

botonLista.addEventListener('click', cargarListaCanciones); 

  