export default class FeatchAPIService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
    this.isEndCollection = false;
    this.total = 0;
  }

  async fetchArticles() {
    const url = `https://pixabay.com/api/?${this.fetchOptions()}`;

    const response = await fetch(url);
    const data = await response.json();
    this.total = data.totalHits;
    if (Math.ceil(data.totalHits / this.perPage) === this.page) {
      this.isEndCollection = true;
    }
    const photo = await data.hits;

    return photo;
  }

  fetchOptions() {
    const options = {
      key: '36810234-b5e1d7960ec1148affe35137c',
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    };

    return `key=${options.key}&q=${options.q}&image_type=${options.image_type}&orientation=${options.orientation}&safesearch=${options.safesearch}&page=${options.page}&per_page=${options.per_page}`;
  }

  pageIncrement() {
    this.page += 1;
  }
  initialPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newValue) {
    this.searchQuery = newValue;
  }
}
