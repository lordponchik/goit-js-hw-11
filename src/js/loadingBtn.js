const refs = {
  loadingBtns: document.querySelector('.loading__btns'),
  btnEndlessScrollEl: document.querySelector('.js-endless'),
  btnLoadBtnEl: document.querySelector('.js-load-more'),
};

export let btnUpload = 'endlessBtn';

refs.loadingBtns.addEventListener('click', e => {
  if (e.target.classList.contains('js-endless')) {
    e.target.setAttribute('disabled', '');
    refs.btnLoadBtnEl.removeAttribute('disabled');
    btnUpload = 'endlessBtn';
    return;
  }
  if (e.target.classList.contains('js-load-more')) {
    e.target.setAttribute('disabled', '');
    refs.btnEndlessScrollEl.removeAttribute('disabled');
    btnUpload = 'loadMoreBtn';
    return;
  }
});
