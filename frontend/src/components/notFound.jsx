import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ImageNotFound from '../assets/notfound.svg';
import Header from './header.jsx';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className="text-center">
        <img alt={t('notFound')} className="img-fluid h-25" src={ImageNotFound} />
        <h4 className="text-muted">{t('notFound')}</h4>
        <p className="text-muted">
          {t('youCanGo')}
          <Link to="/">{t('toHomePage')}</Link>
        </p>
      </div>
    </>
  );
};

export default NotFound;
