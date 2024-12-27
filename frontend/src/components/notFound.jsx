import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ImageNotFound from '../assets/notfound.svg';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <Container>
          <a className="navbar-brand" href="/"> Hexlet Chat</a>
        </Container>
      </nav>
      <div className="text-center">
        <img alt={t('notFound')} className="img-fluid h-25" src={ImageNotFound} />
        <h4 className="text-muted">{t('notFound')}</h4>
        <p className="text-muted">
          {t('youCanGo')}
          <Link href="/">{t('toHomePage')}</Link>
        </p>
      </div>
    </>
  );
};

export default NotFound;
