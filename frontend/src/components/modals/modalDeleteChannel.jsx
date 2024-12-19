import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setActiveChannel } from '../../slices/channelsSlice.js';
import { setDeleteModalStatus } from '../../slices/modalsSlice.js';
import chatApi from '../../chatApi.js';

const ModalDeleteChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const deleteModalStatus = useSelector((state) => state.modals.deleteModal);

  const closeModal = () => dispatch(setDeleteModalStatus({ status: false }));

  const removeChannel = async () => {
    try {
      await chatApi.removeChannel(deleteModalStatus);
      dispatch(setActiveChannel({ name: 'general', channelId: '1' }));
      toast.warn(t('toast.removeChannel'));
    } catch (error) {
      toast.error(t('toast.dataLoadingError'));
    }
    closeModal();
  };

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
                {t('modals.removeChannel')}
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
              <p className="lead">
                {t('modals.questionInModal')}
              </p>
              <div className="d-flex justify-content-end">
                <button
                  onClick={closeModal}
                  type="button"
                  className="me-2 btn btn-secondary"
                >
                  {t('modals.cancelButton')}
                </button>
                <button
                  onClick={removeChannel}
                  type="button"
                  className="btn btn-danger"
                >
                  {t('modals.removeButton')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDeleteChannel;
