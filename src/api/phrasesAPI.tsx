import DICTIONARY_API_URL from '../utils/constants';

const phrasesAPI = () => fetch(DICTIONARY_API_URL, {
  method: 'GET',
}).then((res) => res.json()
  .catch((e) => console.error(e)));

export default phrasesAPI();
