import '../sass/main.scss';
import { fetchRequest } from "./request";
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

const hideLoadMoreBtn = () => {
  loadMoreBtn.classList.add('is-hidden');
}

const showLoadMoreBtn = () => {
  loadMoreBtn.classList.remove('is-hidden');
}

// const increasePageInLocalStorage = () => {
//   const pageIterattor = Number(localStorage.getItem('page')) + 1;
//   localStorage.setItem('page', JSON.stringify(pageIterattor));
//   console.log(pageIterattor);
// };

const renderGalleryCards = data => {
  return data.hits
  .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views:</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments:</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b> ${downloads}
    </p>
  </div>
</div>`)
.join('');
}

const formSubmitClick = async event => {
  event.preventDefault();

  localStorage.setItem('page', '1');

  const query = formInput.value;
  localStorage.setItem('query', query);

  clearGallery();

  try {
    const { data } = await fetchRequest(query);
    
    if(data.hits > 1) {
      let pageIterattor = Number(localStorage.getItem('page')) + 1;
    localStorage.setItem('page', JSON.stringify(pageIterattor));
    galleryList.insertAdjacentHTML('beforeend', renderGalleryCards(data));

    showLoadMoreBtn();
    }
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  } catch (err) {
    console.log(err);
  }
};

const onLoadMoreBtnClick = async () => {
  const query = localStorage.getItem('query');
    let pageIterattor = Number(localStorage.getItem('page'));
    localStorage.setItem('page', JSON.stringify(pageIterattor));

  try {
    const { data } = await fetchRequest(query);

    if (data.totalHits <= pageIterattor * 40) {
      hideLoadMoreBtn();
      Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
    }
    pageIterattor += 1;
    localStorage.setItem('page', JSON.stringify(pageIterattor));
    console.log(pageIterattor);
    galleryList.insertAdjacentHTML('beforeend', renderGalleryCards(data, data.totalHits));
  }
   catch (err) {
    console.log(err);
  }
}

gallerySearch.addEventListener('submit', formSubmitClick);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);