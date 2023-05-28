export default class FeatchAPIService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
    this.isEndCollection = false;
    this.queryPage = 0;
    this.queryPerPage = 0;
    this.total = 0;
  }
  async fetchArticles() {
    if (this.page > this.queryPage && this.queryPage > 0) {
      this.perPage = this.queryPerPage;
    }
    const options = {
      key: '36810234-b5e1d7960ec1148affe35137c',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    };

    const url = `https://pixabay.com/api/?key=${options.key}&q=${this.searchQuery}&image_type=${options.image_type}&orientation=${options.orientation}&safesearch=${options.safesearch}&page=${this.page}&per_page=${this.perPage}`;

    const response = await fetch(url);
    const data = await response.json();

    if (
      (this.page > this.queryPage && this.queryPage > 0) ||
      data.totalHits < this.perPage
    ) {
      this.isEndCollection = true;
    }
    if (this.page === 1) {
      this.checkPage(data);
    }

    this.total = data.totalHits;
    this.pageIncrement();
    const photo = await data.hits;

    return photo;
  }

  checkPage(data) {
    if (data.totalHits % this.perPage === 0 || data.totalHits < this.perPage) {
      return;
    } else {
      this.queryPage = Math.floor(data.totalHits / this.perPage);
      this.queryPerPage = data.totalHits - this.queryPage * this.perPage;
      console.log(this.queryPerPage);
      console.log(this.queryPage);
    }
  }
  pageIncrement() {
    this.page += 1;
  }
  initialPage() {
    this.page = 1;
  }

  get pageValue() {
    return this.page;
  }
  get endCollection() {
    return this.isEndCollection;
  }
  set endCollection(newValue) {
    this.isEndCollection = newValue;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newValue) {
    this.searchQuery = newValue;
  }
}
