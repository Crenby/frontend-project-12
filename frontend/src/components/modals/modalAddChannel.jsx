import { useSelector, useDispatch } from 'react-redux';
import leoProfanity from 'leo-profanity';
import axios from 'axios';
import cn from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setAddModalStatus } from '../../slices/modalsSlice.js';
import { setActiveChannel } from '../../slices/channelsSlice.js';

const ModalAddChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const token = useSelector((state) => state.authorization.userToken);

  const validate = yup.object().shape({
    channelName: yup.string().required(t('required'))
      .min(3, t('newChannelLength', { min: 3, max: 20 }))
      .max(20, t('newChannelLength', { min: 3, max: 20 }))
      .notOneOf(channels.map((channel) => channel.name), t('duplicate')),
  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },

    validationSchema: validate,

    onSubmit: (values) => {
      const cleanedName = leoProfanity.clean(values.channelName);
      const newChannel = { name: cleanedName };
      axios.post('/api/v1/channels', newChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        dispatch(setActiveChannel(response.data));
        toast.success(t('toast.createChannel'));
      });
      dispatch(setAddModalStatus({ status: false }));
    },
  });

  const inputClass = cn('form-control', 'mb-2', {
    'is-invalid': formik.errors.channelName,
  });

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ paddingRight: '17px', display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t('modals.addChannel')}</div>
              <button onClick={() => dispatch(setAddModalStatus({ status: false }))} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
            </div>
            <div className="modal-body">
              <form className="" onSubmit={formik.handleSubmit}>
                <div>
                  <input name="channelName" id="channelName" className={inputClass} onChange={formik.handleChange} value={formik.values.channelName} />
                  <label className="visually-hidden" htmlFor="channelName">{t('modals.nameChannel')}</label>
                  {formik.errors.channelName ? <div className="invalid-feedback" style={{ display: 'block' }}>{formik.errors.channelName}</div> : null}
                  <div className="d-flex justify-content-end">
                    <button onClick={() => dispatch(setAddModalStatus({ status: false }))} type="button" className="me-2 btn btn-secondary">{t('modals.cancelButton')}</button>
                    <button type="submit" className="btn btn-primary">{t('send')}</button>
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
