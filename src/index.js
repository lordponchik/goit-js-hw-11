import FeatchAPIService from './js/fetchAPI';
import buttonUPService from './js/btnUP';
import btnLoadService from './js/btnLoad';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { checkPosition } from './js/endlessScroll';

const refs = {
  formEl: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadBtnEl: document.querySelector('.load-more'),
  loadAnimEl: document.querySelector('.load-more__anim'),
};

const featchAPI = new FeatchAPIService();
const buttonUP = new buttonUPService();
const buttonLoad = new btnLoadService(refs.loadBtnEl, refs.loadAnimEl);
let pressedBtnSearch = false;
let isLoading = false;

buttonUP.addEventListener();

refs.formEl.addEventListener('submit', onSearch);
// refs.loadBtnEl.addEventListener('click', onLoad);

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

  // buttonLoad.show();
  // buttonLoad.disabled();

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

      // buttonLoad.hide();

      refs.galleryEl.insertAdjacentHTML('beforeend', renderPhotos(photos));

      // checkCollection();
      // buttonLoad.enabled();
      lightbox.refresh();
      pressedBtnSearch = true;
      isLoading = false;
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}
let scrl = true;
if (scrl) {
  window.addEventListener('scroll', () => {
    checkPosition(onLoad);
  });
}
// checkPosition(onLoad);

function onLoad() {
  // buttonLoad.show();
  // buttonLoad.disabled();
  if (!pressedBtnSearch || isLoading) return;

  isLoading = true;

  featchAPI
    .fetchArticles()
    .then(photos => {
      // buttonLoad.hide();

      refs.galleryEl.insertAdjacentHTML('beforeend', renderPhotos(photos));

      if (featchAPI.endCollection) {
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        return;
      }

      scrollGallery();
      // checkCollection();
      // buttonLoad.enabled();
      lightbox.refresh();
      isLoading = false;
    })
    .catch(error => {
      Notify.failure(error.message);
    });
}

function checkCollection() {
  if (featchAPI.endCollection) {
    buttonLoad.hide();
  } else if (!featchAPI.endCollection) {
    buttonLoad.show();
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
