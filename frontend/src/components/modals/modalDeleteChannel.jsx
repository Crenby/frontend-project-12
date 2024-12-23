import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button, Modal, Form } from 'react-bootstrap';
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
    <Modal show>
      <Modal.Header>
        <Modal.Title>
          {t('modals.removeChannel')}
        </Modal.Title>
        <Button variant="close" onClick={closeModal} />
      </Modal.Header>
      <Modal.Body>
        {t('modals.questionInModal')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          {t('modals.cancelButton')}
        </Button>
        <Button
          variant="danger"
          type="submit"
          onClick={removeChannel}
        >
          {t('modals.removeButton')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteChannel;
