import { useSelector, useDispatch } from 'react-redux';
import leoProfanity from 'leo-profanity';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button, Modal, Form } from 'react-bootstrap';
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

  return (
    <Modal show>
      <Modal.Header>
        <Modal.Title>
          {t('modals.addChannel')}
        </Modal.Title>
        <Button variant="close" onClick={closeModal}></Button>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Label>
            {t('modals.nameChannel')}
          </Form.Label>
          <Form.Control
            name="channelName"
            id="channelName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channelName}
            autoFocus
            isInvalid={formik.errors.channelName}
          />
          {formik.touched.channelName && formik.errors.channelName && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.channelName}
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

export default ModalAddChannel;
