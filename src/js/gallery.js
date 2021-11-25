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
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="380px" height="240px"/>
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

    galleryList.insertAdjacentHTML('beforeend', renderGalleryCards(data));
    // increasePageInLocalStorage();
    const pageIterattor = Number(localStorage.getItem('page')) + 1;
    localStorage.setItem('page', JSON.stringify(pageIterattor));
    showLoadMoreBtn();
  } catch (err) {
    console.log(err);
  }
};

const onLoadMoreBtnClick = async () => {
  const query = localStorage.getItem('query');

  try {
    const { data } = await fetchRequest(query);

    let pageIterattor;
    galleryList.insertAdjacentHTML('beforeend', renderGalleryCards(data));

    pageIterattor += 1;
    localStorage.setItem('page', JSON.stringify(pageIterattor));
  } catch (err) {
    console.log(err);
  }
};

gallerySearch.addEventListener('submit', formSubmitClick);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);