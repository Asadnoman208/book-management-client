import { ADD_BOOK, SET_BOOKS, UPDATE_BOOK_FORM, RESET_BOOK_FORM } from './types';

const setBooks = (books) => ({
  type: SET_BOOKS,
  payload: books,
});

const addBook = (book) => ({
  type: ADD_BOOK,
  payload: book,
});


const updateBookForm = (book) => ({
  type: UPDATE_BOOK_FORM,
  payload: book,
});

const resetBookForm = () => ({
  type: RESET_BOOK_FORM,
});

export { setBooks, addBook, updateBookForm, resetBookForm };
