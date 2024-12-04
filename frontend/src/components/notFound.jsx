import { useTranslation } from 'react-i18next';

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
        <img alt={t('notFound')} className="img-fluid h-25" src="..\src\assets\notfound.svg"></img>
        <h1 className="h4 text-muted">{t('notFound')}</h1>
        <p className="text-muted"> {t('youCanGo')} <a href="/">{t('toHomePage')}</a></p>
      </div>
    </>
  )
};

export default NotFound;
