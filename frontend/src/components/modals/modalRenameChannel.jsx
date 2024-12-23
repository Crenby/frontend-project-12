import { useSelector, useDispatch } from 'react-redux';
import leoProfanity from 'leo-profanity';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button, Modal, Form } from 'react-bootstrap';
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
    <Modal show>
      <Modal.Header>
        <Modal.Title>
          {t('modals.renameChannel')}
        </Modal.Title>
        <Button variant="close" onClick={closeModal} />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Label htmlFor="newChannelName">
            {t('modals.nameChannel')}
          </Form.Label>
          <Form.Control
            name="newChannelName"
            id="newChannelName"
            className="mb-2 form-control"
            onChange={formik.handleChange}
            value={formik.values.newChannelName}
            autoFocus
            isInvalid={formik.errors.newChannelName}
          />
          {formik.errors.newChannelName && formik.touched.newChannelName && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.newChannelName}
            </Form.Control.Feedback>
          )}
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              {t('modals.cancelButton')}
            </Button>
            <Button variant="primary" type="submit">
              {t('send')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;
