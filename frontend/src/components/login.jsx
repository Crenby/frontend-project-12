import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { authorization } from '../slices/authorizationSlice.js';
import LoginForm from './forms/LoginForm.jsx';
import AvatarImage from '../assets/loginLogo.jfif';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (localStorage.getItem('userToken')) {
      dispatch(authorization({ name: localStorage.getItem('userName'), token: localStorage.getItem('userToken') }));
      navigate('/', { replace: false });
    }
  }, [dispatch, navigate]);

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
                  <img src={AvatarImage} className="rounded-circle" alt={t('enter')} />
                </div>
                <LoginForm />
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
