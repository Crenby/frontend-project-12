import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col, Container, Card, Row 
} from 'react-bootstrap';
import LoginForm from './forms/LoginForm.jsx';
import AvatarImage from '../assets/loginLogo.jfif';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.authorization.userToken);

  useLayoutEffect(() => {
    if (token) {
      navigate('/', { replace: false });
    }
  }, [dispatch, navigate, token]);

  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <Container>
          <a className="navbar-brand" href="/">
            Hexlet Chat
          </a>
        </Container>
      </nav>
      <Container className="h-100" fluid>
        <Row className="justify-content-center align-content-center h-100">
          <Col className="col-12 col-md-8 col-xxl-6">
            <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src={AvatarImage} className="rounded-circle" alt={t('enter')} />
                </Col>
                <LoginForm />
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>
                    {t('notAccount')}
                  </span>
                  <a href="/signup">
                    {t('signUp')}
                  </a>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
