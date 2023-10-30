export class OnSearchApi {
  private static instance: OnSearchApi;

  public static getInstance() {
    if (!this.instance) this.instance = new OnSearchApi();
    return this.instance;
  }

  async getSearch(query?: string) {
    const apiURL = 'https://rickandmortyapi.com/api/character';
    const queryString = query ? `?name=${query}` : '';
    let res = null;

    const response = await fetch(`${apiURL}${queryString}`);
    if (!response.ok) {
      throw new Error('Error data from API');
    }
    res = await response.json();
    return res;
  }
}
