import React, { useEffect, useState } from 'react';
import BookTable from './BookTable';
import AddBook from './AddBook';
import { useDispatch, useSelector } from 'react-redux';
import ApiServices from "./../../services/ApiServices";
import { setBooks } from './../../redux/actions/bookActions';
import { showToast } from './../../redux/actions/toastActions';
import { Button } from 'primereact/button';

const Header = () => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        getBooks()
    }, [])

    const getBooks = async () => {
        try {
            const response = await ApiServices.getBooks();
            if (response?.status) {
                dispatch(setBooks(response?.data));
            }
        } catch (err) {
            dispatch(showToast({
                severity: 'error',
                summary: 'Error',
                detail: err?.message,
                life: 3000,
            }));
        }
    };

    return (
        <div className="book-management-app">
            <div className="header">
                <h4>Book Management App</h4>
                <Button label="Add Book" icon="pi pi-plus" onClick={() => setVisible(true)} className="add-button" />
            </div>
            <BookTable openModal={() => { setVisible(true) }} />
            <AddBook visible={visible} handleClose={() => setVisible(false)} />
        </div>
    );
};

export default Header;
