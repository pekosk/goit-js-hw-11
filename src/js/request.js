import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24498854-53423749accc3067f6b5cc5fe';

const search = document.querySelector('[name="searchQuery"]');

export async function makeRequest(name, page, per_page) {
  const searchCards = {
      params: {
      key: `${API_KEY}`,
      q: `${name}`,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      page,
      per_page
    },
    };
    
    const result = await axios.get(`${BASE_URL}`, searchCards);
    return result;
};
