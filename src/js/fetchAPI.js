export default class FeatchAPIService {
  constructor() {
    this.searchQuery = '';
  }

  async fetchArticles() {
    const url = `https://pixabay.com/api/?${this.fetchOptions()}`;

    const response = await fetch(url);
    const data = await response.json();
    const photos = await data.hits;

    return photos;
  }

  fetchOptions() {
    const options = {
      key: '36810234-b5e1d7960ec1148affe35137c',
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    };

    return `key=${options.key}&q=${options.q}&image_type=${options.image_type}&orientation=${options.orientation}&safesearch=${options.safesearch}`;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newValue) {
    this.searchQuery = newValue;
  }
}
