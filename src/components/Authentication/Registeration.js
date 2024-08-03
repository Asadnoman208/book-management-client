import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Link } from 'react-router-dom';
import { updateRegistrationForm, resetRegistrationForm, setRegistrationFormErrors } from './../../redux/actions/registrationActions';
import { registrationSchema } from './validationSchema';
import ApiServices from "./../../services/ApiServices";
import { showToast } from './../../redux/actions/toastActions';


const RegistrationForm = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.registration);
  const errors = formData.errors;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateRegistrationForm(name, value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formStates = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    }

    const { error } = registrationSchema.validate(formStates, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.reduce((acc, current) => {
        acc[current.path[0]] = current.message;
        return acc;
      }, {});

      dispatch(setRegistrationFormErrors(errorMessages));
    } else {
      register(formStates)
    }
  };


  const register = async (values) => {
    const { confirmPassword, ...newValues } = values;

    try {
      const response = await ApiServices.register(newValues);
      if (response?.status) {
        dispatch(showToast({
          severity: 'success',
          summary: 'Success',
          detail: response?.msg,
          life: 3000,
        }));
        dispatch(resetRegistrationForm());
      }
    } catch (err) {
      dispatch(showToast({
        severity: 'error',
        summary: 'Error',
        detail: 'Something went wrong',
        life: 3000,
      }));
    }
  };

  return (
    <div className="centered-card">
      <Card className="p-shadow-4" title="Register">
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="p-field">
            <label htmlFor="username">Username</label>
            <InputText
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <small className="p-error">{errors.username}</small>}
          </div>

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

          <div className="p-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <InputText
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <small className="p-error">{errors.confirmPassword}</small>}
          </div>

          <Button type="submit" label="Register" className="p-mt-2" />
          <div className="p-mt-3">
            <p>
              <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RegistrationForm;
