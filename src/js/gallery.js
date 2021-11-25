import '../sass/main.scss';
import { fetchRequest } from "../js/request";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import { async } from "./request";

const gallerySearch = document.querySelector('#search-form');
const formInput = document.querySelector('[name="searchQuery"]')
const loadMoreBtn = document.querySelector('.load-more');
const galleryList = document.querySelector('.gallery-list');

const clearGallery = () => {
  galleryList.innerHTML = '';
}

const showLoadMoreBtn = () => {
  loadMoreBtn.classList.remove('is-hidden');
}

const increasePageInLocalStorage = () => {
  const pageIterattor = Number(localStorage.getItem('page')) + 1;
  localStorage.setItem('page', JSON.stringify(pageIterattor));
};

const renderGalleryCards = data => {
  return data.hits
  .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`)
}

const formSubmitClick = async event => {
  event.preventDefault();
  
  localStorage.setItem('page', '1');

  const query = formInput.value;
  localStorage.setItem('query', query);

  clearGallery();

  try {
    const { data } = await fetchRequest(query);

    galleryList.insertAdjacentHTML('beforeend', renderGalleryCards(data));
    increasePageInLocalStorage();
    showLoadMoreBtn();
  } catch (err) {
    console.log(err);
  }
};

gallerySearch.addEventListener('submit', formSubmitClick);