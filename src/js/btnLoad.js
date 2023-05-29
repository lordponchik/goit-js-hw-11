export default class btnLoadService {
  constructor(loadBtnEl, loadAnimEl) {
    this.el = loadBtnEl;
    this.anim = loadAnimEl;
  }
  disabled() {
    this.el.disabled = true;
    this.anim.classList.remove('is-not-show');
  }
  enabled() {
    this.el.disabled = false;
    this.anim.classList.add('is-not-show');
  }
  show() {
    this.el.classList.remove('is-not-show');
  }
  hide() {
    this.el.classList.add('is-not-show');
  }
}
