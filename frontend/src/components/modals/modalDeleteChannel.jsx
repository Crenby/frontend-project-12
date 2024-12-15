import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setActiveChannel } from '../../slices/channelsSlice.js';
import { setDeleteModalStatus } from '../../slices/modalsSlice.js';

const ModalDeleteChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const deleteModalStatus = useSelector((state) => state.modals.deleteModal);
  const token = useSelector((state) => state.authorization.userToken);

  const removeChannel = () => {
    axios.delete(`/api/v1/channels/${deleteModalStatus}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        dispatch(setActiveChannel({ name: 'general', channelId: '1' }));
        toast.warn(t('toast.removeChannel'));
      })
      .catch(() => {
        toast.error(t('toast.dataLoadingError'));
      });
    dispatch(setDeleteModalStatus({ status: false }));
  };

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ paddingRight: '17px', display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t('modals.removeChannel')}</div>
              <button onClick={() => dispatch(setDeleteModalStatus({ status: false }))} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
            </div>
            <div className="modal-body">
              <p className="lead">{t('modals.questionInModal')}</p>
              <div className="d-flex justify-content-end">
                <button onClick={() => dispatch(setDeleteModalStatus({ status: false }))} type="button" className="me-2 btn btn-secondary">{t('modals.cancelButton')}</button>
                <button onClick={removeChannel} type="button" className="btn btn-danger">{t('modals.removeButton')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDeleteChannel;
