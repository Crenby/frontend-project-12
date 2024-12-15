import { useTranslation } from 'react-i18next';
import RegistrationForm from './forms/RegistrationForm.jsx';

const SignUp = () => {
  const { t } = useTranslation();

  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/"> Hexlet Chat</a>
        </div>
      </nav>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  <img src="..\src\assets\avatar_signup.jpg" className="rounded-circle" alt={t('signUp')} />
                </div>
                <RegistrationForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
