import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { authorization } from '../../slices/authorizationSlice.js';
import chatApi from '../../chatApi.js';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      chatApi.signup(values.userName, values.userPassword)
        .then((resp) => {
          chatApi.login(resp.data.username, values.userPassword)
            .then((response) => {
              localStorage.setItem('userToken', response.data.token);
              localStorage.setItem('userName', response.data.username);
              dispatch(authorization({ name: response.data.username, token: response.data.token }));
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
    <Form onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">
        {t('signUp')}
      </h1>
      <Form.Group className="mb-3">
        <FloatingLabel htmlFor="userName" controlId="userName" label={t('signUpPage.username')}>
          <Form.Control
            name="userName"
            placeholder={t('signUpPage.username')}
            onChange={formik.handleChange}
            value={formik.values.userName}
            isInvalid={
              (formik.errors.userName && formik.touched.userName)
              || failedRegistration
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.userName || null}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3">
        <FloatingLabel htmlFor="userPassword" controlId="userPassword" label={t('password')}>
          <Form.Control
            name="userPassword"
            type="password"
            placeholder={t('password')}
            onChange={formik.handleChange}
            value={formik.values.userPassword}
            isInvalid={
              (formik.errors.userPassword && formik.touched.userPassword)
              || failedRegistration
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.userPassword || null}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-4">
        <FloatingLabel htmlFor="confirmPassword" controlId="confirmPassword" label={t('signUpPage.repeatPassword')}>
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder={t('signUpPage.repeatPassword')}
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
            isInvalid={
              (formik.errors.confirmPassword && formik.touched.confirmPassword)
              || failedRegistration
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.confirmPassword || failedRegistration}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Button variant="outline-primary" className="w-100" type="submit">
        {t('signUpPage.signUp')}
      </Button>
    </Form>
  );
};

export default RegistrationForm;
