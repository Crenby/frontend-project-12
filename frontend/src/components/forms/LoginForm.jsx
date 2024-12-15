import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { authorization } from '../../slices/authorizationSlice.js';

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authorizationFailed, setAuthorizationFailed] = useState(false);

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
  );
};

export default LoginForm;
