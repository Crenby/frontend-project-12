import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import leoProfanity from 'leo-profanity';
import axios from 'axios';
import cn from 'classnames';
import { useFormik } from 'formik';
import { io } from 'socket.io-client';
import * as yup from 'yup';
import useOnClickOutside from 'use-onclickoutside';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { getChannels, setActiveChannel } from '../slices/channelsSlice.js';

const Channels = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const [modalAddChannel, setModalAddChannel] = useState(false);
  const [addChannelError, setAddChannelError] = useState(false);
  const [actionMenu, setActionMenu] = useState(false);
  const [modalRemoveChannel, setModalRemoveChannel] = useState(false);
  const [modalRenameChannel, setModalRenameChannel] = useState(false);

  const socket = io();

  function upDataChannels() {
    axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    }).then((response) => {
      dispatch(getChannels(response.data));
    });
  }

  socket.on('newChannel', () => {
    upDataChannels();
  });

  socket.on('removeChannel', () => {
    upDataChannels();
  });

  socket.on('renameChannel', () => {
    upDataChannels();
  });

  function validate(fields) {
    const schema = yup.object().shape({
      channelName: yup.string().required(t('required'))
        .min(3, t('min'))
        .max(20, t('max'))
        .notOneOf(channels.map((channel) => channel.name), t('duplicate')),
    });
    return schema.validate(fields);
  }

  useEffect(() => {
    if (!localStorage.getItem('userToken')) {
      navigate('/login', { replace: false });
    } else {
      axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      }).then((response) => {
        dispatch(getChannels(response.data));
      });
    }
  }, []);

  const closeModalAddChannel = () => {
    setModalAddChannel(false);
  };

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },

    onSubmit: (values) => {
      validate({ channelName: values.channelName })
        .then(() => {
          const cleanedName = leoProfanity.clean(values.channelName);
          const newChannel = { name: cleanedName };
          axios.post('/api/v1/channels', newChannel, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          }).then((response) => {
            closeModalAddChannel();
            dispatch(setActiveChannel(response.data));
            toast.success(t('toast.createChannel'));
          });
        })
        .catch((error) => {
          setAddChannelError(error.message);
          toast.error(t('toast.dataLoadingError'));
        });
    },
  });

  const formikRename = useFormik({
    initialValues: {
      newChannelName: '',
    },

    onSubmit: (values) => {
      renameChannel(values.newChannelName);
      closeModalRenameChannel();
    },
  });

  const openModalAddChannel = () => {
    setModalAddChannel(true);
  };

  const inputClass = cn('form-control', 'mb-2', {
    'is-invalid': addChannelError,
  });

  const openModalRemoveChannel = (id) => {
    setModalRemoveChannel(id);
  };

  const closeModalRemoveChannel = () => {
    setModalRemoveChannel(false);
  };

  const removeChannel = () => {
    setModalRemoveChannel(false);
    axios.delete(`/api/v1/channels/${modalRemoveChannel}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
      .then(() => {
        dispatch(setActiveChannel({ name: 'general', channelId: '1' }));
        toast.warn(t('toast.removeChannel'));
      })
      .catch(() => {
        toast.error(t('toast.dataLoadingError'));
      });
  };

  const openModalRenameChannel = (id) => {
    setModalRenameChannel(id);
  };

  const closeModalRenameChannel = () => {
    setModalRenameChannel(false);
  };

  const renameChannel = (newName) => {
    setModalRenameChannel(false);
    const cleanedName = leoProfanity.clean(newName);
    const editedChannel = { name: cleanedName };
    axios.patch(`/api/v1/channels/${modalRenameChannel}`, editedChannel, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    }).then((response) => {
      dispatch(setActiveChannel(response.data));
      toast.info(t('toast.renamedChannel'));
    });
  };

  const ModalAddChannel = (
    <>
      <div className="fade modal-backdrop show" />
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ paddingRight: '17px', display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t('modals.addChannel')}</div>
              <button onClick={closeModalAddChannel} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
            </div>
            <div className="modal-body">
              <form className="" onSubmit={formik.handleSubmit}>
                <div>
                  <input name="channelName" id="channelName" className={inputClass} onChange={formik.handleChange} value={formik.values.channelName} />
                  <label className="visually-hidden" htmlFor="channelName">{t('modals.nameChannel')}</label>

                  {addChannelError ? <div className="invalid-feedback" style={{ display: 'block' }}>{addChannelError}</div> : null}

                  <div className="d-flex justify-content-end">
                    <button onClick={closeModalAddChannel} type="button" className="me-2 btn btn-secondary">{t('modals.cancelButton')}</button>
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

  const ModalRemoveChannel = (
    <>
      <div className="fade modal-backdrop show" />
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ paddingRight: '17px', display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t('modals.removeChannel')}</div>
              <button onClick={closeModalRemoveChannel} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
            </div>
            <div className="modal-body">
              <p className="lead">{t('modals.questionInModal')}</p>
              <div className="d-flex justify-content-end">
                <button onClick={closeModalRemoveChannel} type="button" className="me-2 btn btn-secondary">{t('modals.cancelButton')}</button>
                <button onClick={removeChannel} type="button" className="btn btn-danger">{t('modals.removeButton')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const ModalRenameChannel = (
    <>
      <div className="fade modal-backdrop show" />
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ paddingRight: '17px', display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t('modals.renameChannel')}</div>
              <button onClick={closeModalRenameChannel} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
            </div>
            <div className="modal-body">
              <form className="" onSubmit={formikRename.handleSubmit}>
                <div>
                  <input name="newChannelName" id="newChannelName" className="mb-2 form-control" onChange={formikRename.handleChange} value={formikRename.values.newChannelName} />
                  <label className="visually-hidden" htmlFor="newChannelName">{t('modals.nameChannel')}</label>
                  <div className="invalid-feedback" />
                  <div className="d-flex justify-content-end">
                    <button onClick={closeModalRenameChannel} type="button" className="me-2 btn btn-secondary">{t('modals.cancelButton')}</button>
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

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    if (actionMenu) setTimeout(() => setActionMenu(false), 100);
  });

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button onClick={openModalAddChannel} type="button" className="p-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
        {modalAddChannel ? ModalAddChannel : null}
        {modalRemoveChannel ? ModalRemoveChannel : null}
        {modalRenameChannel ? ModalRenameChannel : null}
      </div>

      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel, i) => {
          const channelActiveClass = cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn', {
            'btn-secondary': channel.name === activeChannel.name,
          });

          const btnActiveClass = cn('flex-grow-0', 'dropdown-toggle', 'dropdown-toggle-split', 'btn', {
            'btn-secondary': channel.name === activeChannel.name,
          });

          const actionMenuClass = cn('dropdown-menu', {
            show: actionMenu === i,
          });

          const openActiveBtn = (index) => {
            setActionMenu(index);
          };

          return (
            <li key={i} className="nav-item w-100">
              <div ref={ref} role="group" className="d-flex dropdown btn-group">
                <button aria-label={channel.name} 
                  onClick={() => dispatch(setActiveChannel(channel))} className={channelActiveClass}>
                  <span className="me-1">#</span>
                  {channel.name}
                </button>
                {channel.removable ?
                  <>
                    <button onClick={() => openActiveBtn(i)} id={i} type="button" aria-expanded="false" className={btnActiveClass}>
                      <span className="visually-hidden">{t('channelControl')}</span>
                    </button>
                    <div id={i} aria-labelledby="" className={actionMenuClass} data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom-end" style={{ position: 'absolute', inset: '0px 0px auto auto', transform: 'translate(0px, 40px)' }}>
                      <a onClick={() => openModalRemoveChannel(channel.id)} data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabIndex="0" href="#">{t('remove')}</a>
                      <a onClick={() => openModalRenameChannel(channel.id)} data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabIndex="0" href="#">{t('rename')}</a>
                    </div>
                  </> : null}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Channels;
