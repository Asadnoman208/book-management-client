import React, { useEffect, useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import ApiServices from './../../services/ApiServices';
import { bookSchema } from './../Authentication/validationSchema';
import './AddBookModal.css';
import { showToast } from './../../redux/actions/toastActions';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks, updateBookForm, resetBookForm, } from './../../redux/actions/bookActions';


const AddBookModal = (props) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const book = useSelector((state) => state.books.bookForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (props.visible) {
            setVisible(true);
        }
    }, [props.visible]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateBookForm({ [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { _id, ...newBooks } = book;
        const { error } = bookSchema.validate(newBooks, { abortEarly: false });

        if (error) {
            const errorMessages = {};
            error.details.forEach((detail) => {
                errorMessages[detail.path[0]] = detail.message;
            });
            setErrors(errorMessages);
            return;
        }

        try {
            const { _id, ...newValues } = book;
            var response = null
            if (_id?.length > 0) {
                response = await ApiServices.editBook(_id, newValues);
            }
            else {
                response = await ApiServices.addBook(newValues);
            }
            dispatch(setBooks(response?.data?.data));
            dispatch(resetBookForm());
            dispatch(showToast({
                severity: 'success',
                summary: 'success',
                detail: 'Book added successfully',
                life: 3000,
            }));
            handleClose()

        } catch (err) {
            dispatch(showToast({
                severity: 'error',
                summary: 'Error',
                detail: err?.message,
                life: 3000,
            }));
        }
    };

    const handleClose = () => {
        dispatch(resetBookForm());
        props.handleClose()
        setVisible(false);
    }
    return (

        <div>
            <Dialog header="Add Book" visible={visible} style={{ width: '35vw' }} modal onHide={() => handleClose()}>
                <form onSubmit={handleSubmit} className="add-book-form">
                    <div className="p-field">
                        <label htmlFor="title">Title</label>
                        <InputText id="title" name="title" value={book.title} onChange={handleChange} required />
                        {errors.title && <small className="p-error">{errors.title}</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="author">Author</label>
                        <InputText id="author" name="author" value={book.author} onChange={handleChange} required />
                        {errors.author && <small className="p-error">{errors.author}</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="description">Description</label>
                        <InputTextarea id="description" name="description" value={book.description} onChange={handleChange} required />
                        {errors.description && <small className="p-error">{errors.description}</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="genre">Genre</label>
                        <InputText id="genre" name="genre" value={book.genre} onChange={handleChange} required />
                        {errors.genre && <small className="p-error">{errors.genre}</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="publishedYear">Published Year</label>
                        <InputText id="publishedYear" name="publishedYear" value={book.publishedYear} onChange={handleChange} required />
                        {errors.publishedYear && <small className="p-error">{errors.publishedYear}</small>}
                    </div>
                    <div className="button-container">
                        <Button label="Submit" icon="pi pi-check" type="submit" className="submit-button" />
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default AddBookModal;
