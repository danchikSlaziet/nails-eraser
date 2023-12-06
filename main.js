

const firstPage = document.querySelector('.first-page');
const firstPageButton = firstPage.querySelector('.first-page__button');
const secondPage = document.querySelector('.second-page');
const secondPageButton = secondPage.querySelector('.second-page__button');
const secondPageInput = secondPage.querySelector('.second-page__input');
const secondPageLabel = secondPage.querySelector('.second-page__label');
const secondPageText = secondPage.querySelector('.second-page__text');
const thirdPage = document.querySelector('.third-page');
const thirdPageButton = thirdPage.querySelector('.third-page__button');
const fourthPage = document.querySelector('.fourth-page');
const fourthPageVideo = fourthPage.querySelector('.fourth-page__video');
const fourthPageButton = fourthPage.querySelector('.fourth-page__button');
const fourthPageInfo = fourthPage.querySelector('.fourth-page__info');
const fourthPageTextChoose = fourthPage.querySelector('.fourth-page__text_choose');
const fourthPageScreen = fourthPage.querySelector('.fourth-page__screen');
const nailButtons = fourthPage.querySelectorAll('.fourth-page__circle');
const finalPage = document.querySelector('.final-page');
const finalPageIMG = finalPage.querySelector('.final-page__img');
const endPage = document.querySelector('.end-page');
const endPageButton = endPage.querySelector('.end-page__button');

const infoPage = document.querySelector('.info-page');
const infoPageButton = document.querySelector('.info-page__button');



// additional constants for debug and help
const hiddenIMG = document.querySelector('.hidden-image');
const nailsSliced = document.querySelector('.nails-sliced');

const botToken = '6905480197:AAH7vIDyN7NwzdmlUlN3Fpaq5BeYwf6wuS0';
let userChatId = '';
const photoPath = './images/logo.png';
const apiUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`;

let isAllLayersErased = false;

function startEraseGame() {
  function move3(e, percent) {
    if (percent.toFixed(1) >= 98.6)  {
      console.log('стёрты все слои');
      this.clear();
      isAllLayersErased = true;
      fourthPage.classList.add('fourth-page_disabled');
      endPage.classList.remove('end-page_disabled');
      endPage.querySelector('.end-page__text').textContent = 'Поздравляем! Ты успешно справился с заданием! Теперь ты в конкурсе!';
    }
  }
  function move2(e, percent) {
    if (percent.toFixed(1) >= 98.6)  {
      console.log('end')
      this.clear();
      this.enable = false;
      $('#elem2').wScratchPad('clear');
      document.getElementById('elem2').style = 'display: none; pointer-events: none';
      $('#elem3').wScratchPad({
        size: 25,          // The size of the brush/scratch.
        bg: './images/alpha-bg.png',  // Background (image path or hex color).
        fg: './images/red.png',  // Foreground (image path or hex color).
        realtime: true,       // Calculates percentage in realitime.
        scratchMove: move3,
        cursor: 'initial' // Set cursor.
      });
    }
  }
  function move(e, percent) {
    if (percent.toFixed(1) >= 98.6) {
      console.log('end');
      this.clear();
      this.enable = false;
      $('#elem').wScratchPad('clear');
      document.getElementById('elem').style = 'display: none; pointer-events: none';
      $('#elem2').wScratchPad({
        size: 25,          // The size of the brush/scratch.
        bg: './images/red.png',  // Background (image path or hex color).
        fg: './images/gray.png',  // Foreground (image path or hex color).
        realtime: true,       // Calculates percentage in realitime.
        scratchMove: move2,
        cursor: 'initial' // Set cursor.
      });
      
    }
  }
  
  $('#elem').wScratchPad({
    size: 25,          // The size of the brush/scratch.
    bg: './images/gray.png',  // Background (image path or hex color).
    fg: './images/blue.png',  // Foreground (image path or hex color).
    realtime: true,       // Calculates percentage in realitime.
    scratchMove: move,
    cursor: 'initial' // Set cursor.
  });
}
startEraseGame();

function restartEraseGame() {
  $('#elem').wScratchPad('reset');
  $('#elem2').wScratchPad('reset');
  $('#elem3').wScratchPad('reset');
  fourthPageScreen.innerHTML = `
    <div id="elem">
    </div>
    <div id="elem2">
    </div>
    <div id="elem3">
    </div>
    <img id="hand" src="./images/hand.png" alt="">
  `;
  startEraseGame();
}

// ================ FETCH ==================

class Api {
  constructor({baseUrl, secondUrl, thirdUrl, fourthUrl}) {
    this._baseUrl = baseUrl;
    this._secondUrl = secondUrl;
    this._thirdUrl = thirdUrl;
    this._fourthUrl = fourthUrl;
  }

  _getFetch(url, options) {
    return fetch(url, options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`)
      });
  }

  sendStatistics(data, name) {
    let params;
    // if (data["last_name"] === '' && data["username"] === '') {
    //   params = {
    //     "name": name,
    //     "id": parseInt(data["id"]),
    //     "first_name": data["first_name"],
    //   }
    // }
    // else if (data["last_name"] !== '' && data["username"] === '') {
    //   params = {
    //     "name": name,
    //     "id": parseInt(data["id"]),
    //     "first_name": data["first_name"],
    //     "last_name": data["last_name"]
    //   }
    // }
    // else if (data["last_name"] === '' && data["username"] !== '') {
    //   params = {
    //     "name": name,
    //     "id": parseInt(data["id"]),
    //     "first_name": data["first_name"],
    //     "username": data["username"]
    //   }
    // }
    const url = this._baseUrl;
    const options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(params)
    }
    return this._getFetch(url, options);
  }

  sendFileId(id, fileId) {
    const params = {
      "id": id,
      "file_id": fileId
    }
    const url = this._secondUrl;
    const options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(params)
    }
    return this._getFetch(url, options);
  }

  postNumber(id, number) {
    const params = {
      "id": id,
      "number": number
    }
    const url = this._fourthUrl;
    const options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(params)
    }
    return this._getFetch(url, options);
  }

  getNumber(id) {
    const url = this._thirdUrl + `?id=${id}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }
    return this._getFetch(url, options);
  }
}

const api = new Api({
  baseUrl: 'https://nails.ilovebot.ru/api/statistics',
  secondUrl: 'https://nails.ilovebot.ru/api/save_file',
  thirdUrl: 'https://nails.ilovebot.ru/api/get_number',
  fourthUrl: 'https://nails.ilovebot.ru/api/set_number'
});

let detect = new MobileDetect(window.navigator.userAgent);

function parseQuery(queryString) {
  let query = {};
  let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

let userData;
let firstTime = true;

window.addEventListener('DOMContentLoaded', () => {
  let app = window.Telegram.WebApp;
  let query = app.initData;
  let user_data_str = parseQuery(query).user;
  let user_data = JSON.parse(user_data_str);
  userData = user_data;
  app.expand();
  app.ready();
  userChatId = user_data["id"];

  api.getNumber(parseInt(userChatId))
    .then((data) => {
      console.log(data);
      if (data === 'Номер есть') {
        firstTime = false;
      }
    })
    .catch(err => console.log(err));

  api.sendStatistics(user_data, 'открытие приложения')
    .then(data => console.log(data))
    .catch(err => console.log(err));
});

document.addEventListener('click', function(event) {
  // Проверяем, был ли клик вне элемента input
  var isClickInsideInput = event.target.tagName === 'INPUT';
  
  // Если клик был вне элемента input, скрываем клавиатуру
  if (!isClickInsideInput) {
    document.activeElement.blur(); // Снимаем фокус с активного элемента (в данном случае, инпута)
  }
});

if (detect.os() === 'iOS') {
  fourthPageButton.textContent = 'Продолжить';
}

console.log(detect.os());

// if (detect.os() === 'iOS') {
//   fourthPageButton.textContent = 'Продолжить'
// }

const phoneMask = new IMask(secondPageInput, {
  mask: "+{7} (000) 000-00-00",
});

function phoneInputHandler() {
  if (phoneMask.masked.isComplete) {
    secondPageButton.disabled = false;
  } else {
    secondPageButton.disabled = true;
  }
}

secondPageInput.addEventListener('input', () => {
  phoneInputHandler();
  api.sendStatistics(userData, 'нажатие на "инпут(ввод номера телефона)" на экране с номером телефона')
    .then(data => console.log(data))
    .catch(err => console.log(err));
})

secondPageInput.addEventListener('focus', () => {
  if (detect.os() === 'iOS') {
    secondPageInput.style.transform = 'translateY(-120px)';
    secondPageLabel.style.transform = 'translateY(-120px)';
    secondPageButton.style.transform = 'translateY(-120px)';
    secondPageText.style.transform = 'translateY(-120px)'; 
  }
});

secondPageInput.addEventListener('blur', () => {
  if (detect.os() === 'iOS') {
    secondPageInput.style.transform = 'translateY(0)';
    secondPageLabel.style.transform = 'translateY(0)';
    secondPageText.style.transform = 'translateY(0)';
    secondPageButton.style.transform = 'translateY(0)';
    window.scrollTo({top: 0, behavior: "smooth"});
  }
});


firstPageButton.addEventListener('click', () => {
  api.sendStatistics(userData, 'нажатие на кнопку "далее" на 1 экране')
    .then(data => console.log(data))
    .catch(err => console.log(err));
  firstPage.classList.add('first-page_disabled');
  if (firstTime) {
    secondPage.classList.remove('second-page_disabled');
  }
  else {
    fourthPage.classList.remove('fourth-page_disabled');
    thirdPage.classList.add('third-page_disabled');
  timerInstance.start({
    startValues: {
      seconds: 20
    },
    countdown: true,
  });
  timerInstance.addEventListener('secondsUpdated', function (e) {
      $('#basicUsage').html(timerInstance.getTimeValues().seconds);
  });
  }
});

secondPageButton.addEventListener('click', () => {
  secondPage.classList.add('second-page_disabled');
  thirdPage.classList.remove('third-page_disabled');
  api.postNumber(parseInt(userData["id"]), secondPageInput.value)
    .then(data => console.log(data))
    .catch(err => console.log(err));
  api.sendStatistics(userData, 'нажатие на кнопку "проверить подписку МТС premium" на экране с номером телефона')
    .then(data => console.log(data))
    .catch(err => console.log(err));
  // secondPageInput.addEventListener('blur', () => {
  //   if (detect.os() === 'iOS') {
  //     secondPageInput.style.transform = 'translateY(0)';
  //     secondPageLabel.style.transform = 'translateY(0)';
  //     secondPageText.style.transform = 'translateY(0)';
  //     secondPageButton.style.transform = 'translateY(0)';
  //     window.scrollTo({top: 0, behavior: "smooth"});
  //   }
  // });
});

var timerInstance = new easytimer.Timer();

thirdPageButton.addEventListener('click', () => {
  thirdPage.classList.add('third-page_disabled');
  timerInstance.start({
    startValues: {
      seconds: 20
    },
    countdown: true,
  });
  timerInstance.addEventListener('secondsUpdated', function (e) {
      $('#basicUsage').html(timerInstance.getTimeValues().seconds);
  });

  fourthPage.classList.remove('fourth-page_disabled');
  api.sendStatistics(userData, 'нажатие на кнопку "Приступить" на экране 3 экране ("Твой номер записан. Ты можешь создать новое изображение")')
    .then(data => console.log(data))
    .catch(err => console.log(err));
});

timerInstance.addEventListener('stopped', () => {
  fourthPage.classList.add('fourth-page_disabled');
  endPage.classList.remove('end-page_disabled');
  if (!isAllLayersErased) {
    endPage.querySelector('.end-page__text').textContent = 'Ты не успел. Попробуй еще раз';
  }
  else {
    endPage.querySelector('.end-page__text').textContent = 'Поздравляем! Ты успешно справился с заданием! Теперь ты в конкурсе!';
  }
})

endPageButton.addEventListener('click', () => {
  api.sendStatistics(userData, 'нажатие на кнопку "Выбрать другой дизайн" на последнем экране')
    .then(data => console.log(data))
    .catch(err => console.log(err));
  endPage.classList.add('end-page_disabled');
  fourthPage.classList.remove('fourth-page_disabled');
  document.getElementById('basicUsage').textContent = 20;
  timerInstance.reset();
  restartEraseGame();
  isAllLayersErased = false;
})
