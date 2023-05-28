import FeatchAPIService from './js/fetchAPI';
import buttonUPService from './js/btnUP';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  formEl: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadEl: document.querySelector('.load-more'),
  spanBtnLoadEl: document.querySelector('.load-more__span'),
};

const featchAPI = new FeatchAPIService();
const buttonUP = new buttonUPService();

buttonUP.addEventListener();

refs.formEl.addEventListener('submit', onSearch);
refs.loadEl.addEventListener('click', onLoad);

const lightbox = new SimpleLightbox('.gallery a');

function onSearch(e) {
  e.preventDefault();
  featchAPI.query = e.currentTarget.elements.searchQuery.value.trim();

  if (featchAPI.query.length === 0) {
    Notify.failure("We're sorry, but you want to find nothing");
    return;
  }
  featchAPI.endCollection = false;
  featchAPI.initialPage();
  refs.galleryEl.innerHTML = '';

  featchAPI
    .fetchArticles()
    .then(photos => {
      if (photos.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      Notify.success(`Hooray! We found ${featchAPI.total} images.`);

      refs.galleryEl.insertAdjacentHTML('beforeend', renderPhotos(photos));

      renderBtnLoad();
      lightbox.refresh();
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}
function onLoad() {
  featchAPI
    .fetchArticles()
    .then(photos => {
      renderBtnLoad();
      refs.galleryEl.insertAdjacentHTML('beforeend', renderPhotos(photos));
      lightbox.refresh();

      if (featchAPI.endCollection) {
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        return;
      }
      scrollGallery();
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}

function renderBtnLoad() {
  refs.loadEl.classList.add('is-not-show');
  if (featchAPI.endCollection) {
    refs.loadEl.classList.add('is-not-show');
  } else if (!featchAPI.endCollection) {
    refs.loadEl.classList.remove('is-not-show');
  }
}

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
        <a href="${largeImageURL}"> <img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo-card__img"/></a>
      <div class="photo-card__info">
        <div><p class="info-item">
          <b class="info-item__name">Likes</b>
          <b class="info-item__value">${likes}</b>
        </p>
        <p class="info-item">
          <b class="info-item__name">Views</b>
          <b class="info-item__value">${views}</b>
        </p></div>
        <div><p class="info-item">
          <b class="info-item__name">Comments</b>
          <b class="info-item__value">${comments}</b>
        </p>
        <p class="info-item">
          <b class="info-item__name">Downloads</b>
          <b class="info-item__value">${downloads}</b>
        </p></div>
      </div>
    </div>`;
      }
    )
    .join('');
}

function scrollGallery() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 1.5,
    behavior: 'smooth',
  });
}
