export class OnSearchApi {
  private static instance: OnSearchApi;

  public static getInstance() {
    if (!this.instance) this.instance = new OnSearchApi();
    return this.instance;
  }

  public async getSearch(query?: string | null) {
    let resSearh = [];
    try {
      const apiURL = 'https://rickandmortyapi.com/api/character';
      const queryString = query ? `?name=${query}` : '';

      const response = await fetch(`${apiURL}${queryString}`);
      if (response.ok) {
        resSearh = await response.json();
      }
    } catch (err) {
      console.log(err);
    }

    return resSearh.results;
  }
}
