import FeatchAPIService from './js/fetchAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formEl: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
};

const featchAPI = new FeatchAPIService();

refs.formEl.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  featchAPI.query = e.currentTarget.elements.searchQuery.value.trim();

  refs.galleryEl.innerHTML = '';

  featchAPI.fetchArticles().then(photos => {
    if (photos.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    refs.galleryEl.insertAdjacentHTML('beforeend', renderPhotos(photos));
  });
}

// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.

function renderPhotos(photos) {
  return photos
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo-card__img"/>
      <div class="photo-card__info">
        <div><p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p></div>
        <div><p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p></div>
      </div>
    </div>`;
      }
    )
    .join('');
}

// const URL_API = 'https://pixabay.com/api/?';
// const options = {
//   key: '36810234-b5e1d7960ec1148affe35137c',
//   q: 'cat',
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: true,
// };

// function objectOptionsToStr(options) {
//   const keysOptions = Object.keys(options);
//   let str = '';

//   for (const iterator of keysOptions) {
//     str += `${iterator}=${keysOptions[iterator]}`;
//   }

//   return str;
// }

// async function fetchPixabay() {
//   const response = await fetch(
//     `https://pixabay.com/api/?key=${options.key}&q=${options.q}&image_type=${options.image_type}&orientation=${options.orientation}&safesearch=${options.safesearch}`
//   );
//   const bild = await response.json();
//   return bild;
// }

// fetchPixabay().then(bild => console.log(bild));

//   .fetch(
//     `https://pixabay.com/api/?key=${options.key}&q=${options.q}&image_type=${options.image_type}&orientation=${options.orientation}&safesearch=${options.safesearch}`
//   )
//   .then(response => response.json());
