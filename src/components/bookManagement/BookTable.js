import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks, updateBookForm } from './../../redux/actions/bookActions';
import ApiServices from "./../../services/ApiServices";
import { showToast } from './../../redux/actions/toastActions';

const BookTable = (props) => {
    const books = useSelector((state) => state.books.books);
    const dispatch = useDispatch();


    const handleEdit = (book) => {
        props.openModal()
        const { user, __v, ...updatedValues } = book
        dispatch(updateBookForm(updatedValues));
    };

    const handleDelete = async (bookId) => {
        try {
            const response = await ApiServices.deleteBook(bookId);
            if (response?.status) {
                dispatch(setBooks(response?.data?.data));
                dispatch(showToast({
                    severity: 'success',
                    summary: 'success',
                    detail: 'Book deleted successfully',
                    life: 3000,
                }));
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

    const actionBodyTemplate = (rowData) => {
        return (
            <div>
                <Button icon="pi pi-file-edit" rounded aria-label="Filter" onClick={() => handleEdit(rowData)} />
                <Button icon="pi pi-trash" rounded severity="danger" aria-label="Cancel" onClick={() => handleDelete(rowData._id)} />
            </div>
        );
    };

    return (
        <DataTable value={books} paginator rows={10} className="p-datatable-customers">
            <Column field="title" header="Title" />
            <Column field="author" header="Author" />
            <Column field="description" header="Description" />
            <Column field="genre" header="Genre" />
            <Column field="publishedYear" header="Published Year" />
            <Column body={actionBodyTemplate} header="Actions" />
        </DataTable>
    );
};

export default BookTable;
