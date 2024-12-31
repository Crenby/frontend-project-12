import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { authorization } from '../slices/authorizationSlice.js';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const token = useSelector((state) => state.authorization.userToken);

  const getOut = () => {
    localStorage.clear();
    dispatch(authorization({ name: '', token: '' }));
    navigate('/login', { replace: false });
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Link className="navbar-brand" to="/"> Hexlet Chat</Link>
        {token && <Button variant="primary" onClick={getOut} type="button">{t('exitButton')}</Button>}
      </Container>
    </nav>
  );
};

export default Header;
