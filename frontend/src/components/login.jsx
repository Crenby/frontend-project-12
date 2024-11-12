import { Formik, Form, Field, useFormik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { authorization, changeStatus } from '../slices/authorizationSlice.js';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import cn from 'classnames';

const Login = () => {
  //const name = useSelector((state) => state.authorization.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authorizationFailed, setAuthorizationFailed] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },

    onSubmit: (values) => {
      axios.post('/api/v1/login', { username: values.name, password: values.password })
        .then((response) => {
          setAuthorizationFailed(false);
          localStorage.clear();
          localStorage.setItem('userToken', response.data.token);
          localStorage.setItem('userName', response.data.username);
          dispatch(changeStatus(true));
          dispatch(authorization())
          navigate('/', { replace: false });
        })
        .catch((error) => {
          localStorage.clear();
          setAuthorizationFailed(true);
        });
    },
  });

  const inputClass = cn("form-control", {
    "is-invalid": authorizationFailed
  })

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">

            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="..\src\assets\loginLogo.jfif" className="rounded-circle" alt="Войти"></img>
              </div>
              <form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4"> Войти </h1>

                <div className="form-floating mb-3">
                  <input
                    className={inputClass}
                    id="name"
                    name="name"
                    type="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <label htmlFor="name">Ваш ник</label>
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
                  <label className="form-label" htmlFor="password">Пароль</label>
                  {authorizationFailed ? <div className="invalid-tooltip">Неверные имя пользователя или пароль</div> : null}
                </div>

                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
              </form>
            </div>

            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;