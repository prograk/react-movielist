import DEFAULG_IMG from '../assets/images/default_img.png';

const BASE_URL = 'http://localhost:8000/movies';

export const MOVIE_LIST = BASE_URL;
export const MOVIE_SEARCH = (params) => `${BASE_URL}?q=${params.search}`;
export const MOVIE_DETAIL = (params) => `${BASE_URL}/${params.id}`;
export const MOVIE_SORT = (params) => `${BASE_URL}?_sort=${params.sort}&_order=${params.order}`;


// Functions
export const ADD_DEFAULT_SRC = (ev) => ev.target.src = DEFAULG_IMG