import './sass/main.scss';
import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";

const BASE_URL = 'https://pixabay.com/';
const API_KEY = '24498854-53423749accc3067f6b5cc5fe';

const search = document.querySelector('[name="searchQuery"]');

const fetchCards = query => {
  return axios.get(`${BASE_URL}${API_KEY}/`, {
    params: {
      q: search.value,
    },
  });
};