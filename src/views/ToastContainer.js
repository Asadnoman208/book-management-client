import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Toast } from 'primereact/toast';
import { hideToast } from './../redux/actions/toastActions';

const ToastContainer = () => {
    const toast = useRef(null);
    const dispatch = useDispatch();
    const { show, severity, summary, detail, life } = useSelector((state) => state.toast);

    useEffect(() => {
        if (show) {
            toast.current.show({ severity, summary, detail, life });
            setTimeout(() => {
                dispatch(hideToast());
            }, life);
        }
    }, [show, severity, summary, detail, life, dispatch]);

    return <Toast ref={toast} />;
};

export default ToastContainer;
