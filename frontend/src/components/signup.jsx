import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [failedRegistration, setFailedRegistration] = useState(false);

  const validate = yup.object({
    confirmPassword: yup.string().required(t('required'))
      .oneOf([yup.ref('userPassword')], t('signUpPage.confirmPassword')),
    userPassword: yup.string().required(t('required'))
      .min(6, t('signUpPage.minPasswordLenght')),
    userName: yup.string().required(t('required'))
      .min(3, t('signUpPage.usernameLenght', { min: 3, max: 20 }))
      .max(20, t('signUpPage.usernameLenght', { min: 3, max: 20 })),
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      userPassword: '',
      confirmPassword: '',
    },

    validationSchema: validate,

    onSubmit: (values) => {
      axios.post('/api/v1/signup', { username: values.userName, password: values.userPassword })
        .then((resp) => {
          axios.post('/api/v1/login', { username: resp.data.username, password: values.userPassword })
            .then((response) => {
              localStorage.clear();
              localStorage.setItem('userToken', response.data.token);
              localStorage.setItem('userName', response.data.username);
              navigate('/', { replace: false });
            });
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setFailedRegistration(t('signUpPage.existingUser'));
          }
        });
    },
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
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  <img src="..\src\assets\avatar_signup.jpg" className="rounded-circle" alt={t('signUp')} />
                </div>
                <form className="w-50" onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">{t('signUp')}</h1>
                  <div className="form-floating mb-3">
                    <input placeholder={t('signUpPage.minUsernameLenght')} name="userName" autoComplete="userName" required="" id="userName" className="form-control" onChange={formik.handleChange} value={formik.values.userName} />
                    <label className="form-label" htmlFor="userName">{t('signUpPage.username')}</label>
                    {formik.errors.userName ? <div className="invalid-tooltip" style={{ display: 'block' }}>{formik.errors.userName}</div> : null}
                  </div>
                  <div className="form-floating mb-3">
                    <input placeholder={t('signUpPage.minPasswordLenght')} name="userPassword" aria-describedby="passwordHelpBlock" required="" autoComplete="new-password" type="password" id="userPassword" className="form-control" onChange={formik.handleChange} value={formik.values.userPassword} />
                    <label className="form-label" htmlFor="userPassword">{t('password')}</label>
                    {formik.errors.userPassword ? <div className="invalid-tooltip" style={{ display: 'block' }}>{formik.errors.userPassword}</div> : null}
                  </div>
                  <div className="form-floating mb-4">
                    <input placeholder={t('signUpPage.notConfirmPassword')} name="confirmPassword" required="" autoComplete="new-password" type="password" id="confirmPassword" className="form-control" onChange={formik.handleChange} value={formik.values.confirmPassword} />
                    <label className="form-label" htmlFor="confirmPassword">{t('signUpPage.repeatPassword')}</label>
                    {formik.errors.confirmPassword || failedRegistration ? <div className="invalid-tooltip" style={{ display: 'block' }}>{formik.errors.confirmPassword || failedRegistration}</div> : null}
                  </div>
                  <button type="submit" className="w-100 btn btn-outline-primary">{t('signUpPage.signUp')}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
