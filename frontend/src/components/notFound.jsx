import { useTranslation } from 'react-i18next';
import ImageNotFound from '../assets/notfound.svg';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/"> Hexlet Chat</a>
        </div>
      </nav>

      <div className="text-center">
        <img alt={t('notFound')} className="img-fluid h-25" src={ImageNotFound} />
        <h1 className="h4 text-muted">{t('notFound')}</h1>
        <p className="text-muted">
          {t('youCanGo')}
          <Link href="/">{t('toHomePage')}</Link>
        </p>
      </div>
    </>
  );
};

export default NotFound;
