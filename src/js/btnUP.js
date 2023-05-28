export default class buttonUPService {
  constructor() {
    this.el = document.querySelector('.btnUp');
  }
  schow() {
    this.el.classList.remove('hide');
  }
  hide() {
    this.el.classList.add('hide');
  }
  addEventListener() {
    window.addEventListener('scroll', () => {
      const scrollY = window.screenY || document.documentElement.scrollTop;
      scrollY > 400 ? this.schow() : this.hide();
    });
    this.el.addEventListener('click', () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  }
}
