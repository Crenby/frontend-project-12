import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useLayoutEffect } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { authorization } from '../slices/authorizationSlice.js';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authorizationFailed, setAuthorizationFailed] = useState(false);

  useLayoutEffect(() => {
    if (localStorage.getItem('userToken')) {
      dispatch(authorization({ name: localStorage.getItem('userName'), token: localStorage.getItem('userToken') }));
      navigate('/', { replace: false });
    }
  }, [dispatch, navigate]);

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },

    onSubmit: (values) => {
      axios.post('/api/v1/login', { username: values.name, password: values.password })
        .then((response) => {
          setAuthorizationFailed(false);
          localStorage.clear();
          localStorage.setItem('userToken', response.data.token);
          localStorage.setItem('userName', response.data.username);
          dispatch(authorization({ name: response.data.username, token: response.data.token }));
          navigate('/', { replace: false });
        })
        .catch(() => {
          localStorage.clear();
          setAuthorizationFailed(true);
        });
    },
  });

  const inputClass = cn('form-control', {
    'is-invalid': authorizationFailed,
  });

  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/"> Hexlet Chat</a>
        </div>
      </nav>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">

              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src="..\src\assets\loginLogo.jfif" className="rounded-circle" alt={t('enter')} />
                </div>
                <form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">
                    {t('enter')}
                  </h1>

                  <div className="form-floating mb-3">
                    <input
                      className={inputClass}
                      id="name"
                      name="name"
                      type="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    <label htmlFor="name">{t('username')}</label>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      className={inputClass}
                      id="password"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <label className="form-label" htmlFor="password">{t('password')}</label>
                    {authorizationFailed ? <div className="invalid-tooltip">{t('noValidUsername')}</div> : null}
                  </div>

                  <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('enter')}</button>
                </form>
              </div>

              <div className="card-footer p-4">
                <div className="text-center">
                  <span>
                    {t('notAccount')}
                  </span>
                  <a href="/signup">{t('signUp')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
