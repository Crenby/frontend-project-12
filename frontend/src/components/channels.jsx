import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import cn from 'classnames';
import { io } from 'socket.io-client';
import useOnClickOutside from 'use-onclickoutside';
import { useTranslation } from 'react-i18next';
import { uniqueId } from 'lodash';
import { getChannels, setActiveChannel } from '../slices/channelsSlice.js';
import ModalAddChannel from './modals/modalAddChannel.jsx';
import { setAddModalStatus, setRenameModalStatus, setDeleteModalStatus } from '../slices/modalsSlice.js';
import ModalRenameChannel from './modals/modalRenameChannel.jsx';
import ModalDeleteChannel from './modals/modalDeleteChannel.jsx';

const Channels = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const [actionMenu, setActionMenu] = useState(false);
  const addModalStatus = useSelector((state) => state.modals.addModal);
  const renameModalStatus = useSelector((state) => state.modals.renameModal);
  const deleteModalStatus = useSelector((state) => state.modals.deleteModal);
  const token = useSelector((state) => state.authorization.userToken);

  const socket = io();

  function upDataChannels() {
    axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
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

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: false });
    } else {
      axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        dispatch(getChannels(response.data));
      });
    }
  }, [dispatch, navigate, token]);

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    if (actionMenu) setTimeout(() => setActionMenu(false), 100);
  });

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button onClick={() => dispatch(setAddModalStatus({ status: true }))} type="button" className="p-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
        {addModalStatus ? <ModalAddChannel /> : null}
        {deleteModalStatus ? <ModalDeleteChannel /> : null}
        {renameModalStatus ? <ModalRenameChannel /> : null}
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
            <li key={uniqueId()} className="nav-item w-100">
              <div ref={ref} role="group" className="d-flex dropdown btn-group">
                <button
                  aria-label={channel.name}
                  type="button"
                  onClick={() => dispatch(setActiveChannel(channel))}
                  className={channelActiveClass}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </button>
                {channel.removable ? (
                  <>
                    <button onClick={() => openActiveBtn(i)} id={i} type="button" aria-expanded="false" className={btnActiveClass}>
                      <span className="visually-hidden">{t('channelControl')}</span>
                    </button>
                    <div id={i} aria-labelledby="" className={actionMenuClass} data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom-end" style={{ position: 'absolute', inset: '0px 0px auto auto', transform: 'translate(0px, 40px)' }}>
                      <button onClick={() => dispatch(setDeleteModalStatus({ status: channel.id }))} data-rr-ui-dropdown-item="" className="dropdown-item" type="button" tabIndex="0" href="#">{t('remove')}</button>
                      <button onClick={() => dispatch(setRenameModalStatus({ status: channel.id }))} data-rr-ui-dropdown-item="" className="dropdown-item" type="button" tabIndex="0" href="#">{t('rename')}</button>
                    </div>
                  </>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Channels;
