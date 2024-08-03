import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { updateLoginForm, resetLoginForm, setLoginFormErrors } from './../../redux/actions/loginActions';
import { loginSchema } from './validationSchema';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import ApiServices from "./../../services/ApiServices";
import { showToast } from './../../redux/actions/toastActions';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import './../../App.css';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.login);
    const errors = formData.errors;

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateLoginForm(name, value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formStates = {
            email: formData.email,
            password: formData.password
        }

        const { error, value } = loginSchema.validate(formStates, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.reduce((acc, current) => {
                acc[current.path[0]] = current.message;
                return acc;
            }, {});
            dispatch(setLoginFormErrors(errorMessages));
        } else {
            console.log('Form Data:', value);
            login(value)
        }
    };

    const login = async (values) => {
        try {
            const response = await ApiServices.login(values);
            if (response?.status) {
                dispatch(resetLoginForm());
                navigate('/books');
                window.location.reload()
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
        <div className="centered-card">
            <Card className="p-shadow-4" title="Login">
                <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="email">Email</label>
                        <InputText
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <small className="p-error">{errors.email}</small>}
                    </div>

                    <div className="p-field">
                        <label htmlFor="password">Password</label>
                        <InputText
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <small className="p-error">{errors.password}</small>}
                    </div>

                    <Button type="submit" label="Login" className="p-mt-2" />
                    <div className="p-mt-3">
                        <p>
                            Don't have an account? <Link to="/register">Sign Up</Link>
                        </p>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default LoginForm;
