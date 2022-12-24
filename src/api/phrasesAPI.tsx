import { DICTIONARY_API_URL } from '../utils/constants';

export const phrasesAPI = () => {
  return fetch(DICTIONARY_API_URL, {
    method: 'GET',
  }).then(res => res.json()
    .catch(e => console.error(e)),
  );
};