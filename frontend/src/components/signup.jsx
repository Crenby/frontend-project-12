import { useTranslation } from 'react-i18next';
import {
  Container, Row, Col, Card,
} from 'react-bootstrap';
import RegistrationForm from './forms/RegistrationForm.jsx';
import AvatarSignup from '../assets/avatar_signup.jpg';

const SignUp = () => {
  const { t } = useTranslation();

  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <Container>
          <a className="navbar-brand" href="/"> Hexlet Chat</a>
        </Container>
      </nav>
      <Container className="h-100" fluid>
        <Row className="justify-content-center align-content-center h-100">
          <Col className="col-12 col-md-8 col-xxl-6">
            <Card className="shadow-sm">
              <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <img src={AvatarSignup} className="rounded-circle" alt={t('signUp')} />
                <RegistrationForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
