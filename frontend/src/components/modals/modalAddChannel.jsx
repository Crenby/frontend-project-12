import { useSelector, useDispatch } from 'react-redux';
import leoProfanity from 'leo-profanity';
import cn from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setAddModalStatus } from '../../slices/modalsSlice.js';
import { setActiveChannel } from '../../slices/channelsSlice.js';
import chatApi from '../../chatApi.js';

const ModalAddChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);

  const closeModal = () => dispatch(setAddModalStatus({ status: false }));

  const validate = yup.object({
    channelName: yup
      .string()
      .required(t('required'))
      .min(3, t('newChannelLength', { min: 3, max: 20 }))
      .max(20, t('newChannelLength', { min: 3, max: 20 }))
      .notOneOf(channels.map((channel) => channel.name), t('duplicate')),
  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      try {
        const cleanedName = leoProfanity.clean(values.channelName);
        const newChannel = { name: cleanedName };
        const response = await chatApi.addChannel(newChannel);
        dispatch(setActiveChannel(response.data));
        toast.success(t('toast.createChannel'));
        closeModal();
      } catch (error) {
        toast.error(t('toast.error'));
      }
    },
  });

  const inputClass = cn('form-control', 'mb-2', {
    'is-invalid': formik.errors.channelName && formik.touched.channelName,
  });

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div 
        role="dialog" 
        aria-modal="true" 
        className="fade modal show" 
        tabIndex="-1" 
        style={{ paddingRight: '17px', display: 'block' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{t('modals.addChannel')}</h4>
              <button 
                onClick={closeModal} 
                type="button" 
                aria-label="Close" 
                data-bs-dismiss="modal" 
                className="btn btn-close" 
              />
            </div>
            <div className="modal-body">
              <form className="" onSubmit={formik.handleSubmit}>
                <div>
                  <input 
                    name="channelName" 
                    id="channelName" 
                    className={inputClass} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    value={formik.values.channelName} 
                  />
                  <label className="visually-hidden" htmlFor="channelName">
                    {t('modals.nameChannel')}
                  </label>
                  {formik.touched.channelName && formik.errors.channelName && (
                    <div className="invalid-feedback" style={{ display: 'block' }}>
                      {formik.errors.channelName}
                    </div>
                  )}
                  <div className="d-flex justify-content-end">
                    <button 
                      onClick={closeModal} 
                      type="button" 
                      className="me-2 btn btn-secondary"
                    >
                      {t('modals.cancelButton')}
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {t('send')}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAddChannel;
