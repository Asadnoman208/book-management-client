import { ADD_BOOK, SET_BOOKS, UPDATE_BOOK_FORM, RESET_BOOK_FORM } from '../actions/types';

const initialState = {
  books: [],
  bookForm: {
    _id: '',
    title: '',
    author: '',
    description: '',
    genre: '',
    publishedYear: ''
  }
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return { ...state, books: action.payload };
    case ADD_BOOK:
      return { ...state, books: [...state.books, action.payload] };
    case UPDATE_BOOK_FORM:
      return {
        ...state,
        bookForm: { ...state.bookForm, ...action.payload }
      };
    case RESET_BOOK_FORM:
      return {
        ...state,
        bookForm: initialState.bookForm
      };
    default:
      return state;
  }
};

export default bookReducer;
