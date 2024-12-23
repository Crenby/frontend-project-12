import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { authorization } from '../../slices/authorizationSlice.js';
import chatApi from '../../chatApi.js';

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
      chatApi.login(values.name, values.password)
        .then((response) => {
          setAuthorizationFailed(false);
          localStorage.setItem('userToken', response.data.token);
          localStorage.setItem('userName', response.data.username);
          dispatch(authorization({ name: response.data.username, token: response.data.token }));
          navigate('/', { replace: false });
        })
        .catch(() => {
          setAuthorizationFailed(true);
        });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">
        {t('enter')}
      </h1>
      <Form.Group className="form-floating mb-3">
        <FloatingLabel htmlFor="name" controlId="name" label={t('username')}>
          <Form.Control
            id="name"
            name="name"
            type="name"
            placeholder={t('username')}
            onChange={formik.handleChange}
            value={formik.values.name}
            isInvalid={authorizationFailed}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <FloatingLabel htmlFor="password" controlId="password" label={t('password')}>
          <Form.Control
            id="password"
            name="password"
            type="password"
            placeholder={t('password')}
            onChange={formik.handleChange}
            value={formik.values.password}
            isInvalid={authorizationFailed}
          />
          {authorizationFailed && (
            <Form.Control.Feedback type="invalid">
              {t('noValidUsername')}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>
      </Form.Group>
      <Button variant="outline-primary" className="w-100" type="submit">
        {t('enter')}
      </Button>
    </Form>
  );
};

export default LoginForm;
