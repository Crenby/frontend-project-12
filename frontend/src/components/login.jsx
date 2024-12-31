import { useTranslation } from 'react-i18next';
import {
  Col, Container, Card, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from './forms/LoginForm.jsx';
import AvatarImage from '../assets/loginLogo.jfif';
import Header from './header.jsx';

const Login = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
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
                  <Link to="/signup">
                    {t('signUp')}
                  </Link>
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
