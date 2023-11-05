export async function getSearch(query?: null | string) {
  let resSearch = [];
  try {
    const apiURL = 'https://rickandmortyapi.com/api/character';
    const queryString = query ? `?name=${query}` : '';

    const response = await fetch(`${apiURL}${queryString}`);
    if (response.ok) {
      resSearch = await response.json();
    }
  } catch (err) {
    console.log(err);
  }
  console.log(resSearch);
  return resSearch.results;
}
