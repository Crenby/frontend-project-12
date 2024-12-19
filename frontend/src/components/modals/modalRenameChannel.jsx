import { useSelector, useDispatch } from 'react-redux';
import leoProfanity from 'leo-profanity';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setRenameModalStatus } from '../../slices/modalsSlice.js';
import { setActiveChannel } from '../../slices/channelsSlice.js';
import chatApi from '../../chatApi.js';

const ModalRenameChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const renameModalStatus = useSelector((state) => state.modals.renameModal);
  const channels = useSelector((state) => state.channels.channels);

  const closeModal = () => dispatch(setRenameModalStatus({ status: false }));

  const validate = yup.object({
    newChannelName: yup
      .string()
      .required(t('required'))
      .min(3, t('newChannelLength', { min: 3, max: 20 }))
      .max(20, t('newChannelLength', { min: 3, max: 20 }))
      .notOneOf(channels.map((channel) => channel.name), t('duplicate')),
  });

  const formik = useFormik({
    initialValues: {
      newChannelName: '',
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      try {
        const cleanedName = leoProfanity.clean(values.newChannelName);
        const editedChannel = { name: cleanedName };
        const response = await chatApi.editChannel(editedChannel, renameModalStatus);
        dispatch(setActiveChannel(response.data));
        toast.info(t('toast.renamedChannel'));
        closeModal();
      } catch (error) {
        toast.error(t('toast.error'));
      }
    },
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
              <h4 className="modal-title">
                {t('modals.renameChannel')}
              </h4>
              <button
                onClick={closeModal}
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
                className="btn btn-close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <input
                    name="newChannelName"
                    id="newChannelName"
                    className="mb-2 form-control"
                    onChange={formik.handleChange}
                    value={formik.values.newChannelName}
                  />
                  <label
                    className="visually-hidden"
                    htmlFor="newChannelName"
                  >
                    {t('modals.nameChannel')}
                  </label>
                  {formik.errors.newChannelName && formik.touched.newChannelName && (
                    <div className="invalid-feedback" style={{ display: 'block' }}>
                      {formik.errors.newChannelName}
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
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
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

export default ModalRenameChannel;
