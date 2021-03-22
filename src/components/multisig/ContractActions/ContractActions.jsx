import React, { useState } from 'react';
import styled from 'styled-components';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../styled/Modal';
import { Title } from '../../styled/Text';
import CreateTx from './CreateTx';
import CreateDelegation from './CreateDelegation';
import ContractEditor from './ContractEditor';

const DDwnToggle = styled(Dropdown.Toggle)`
  &:after {
    display: none;
  }
`;

const DDwnMenu = styled(Dropdown.Menu)`
  padding: 0;
  border: 0;
  box-shadow: ${({ theme }) => theme.borderShadow};

  .dropdown-item {
    transition: color, background-color 0.15s;
    font-size: 14px;
    padding: 4px 10px;
    color: ${({ theme }) => theme.black};

    &:hover {
      background-color: rgba(34, 211, 105, 0.25);
    }

    &:active {
      background-color: rgba(34, 211, 105, 0.5);
      color: ${({ theme }) => theme.black};
    }

    &:focus {
      background-color: rgba(34, 211, 105, 0.5);
      outline: rgba(38, 210, 129, 0.5) auto 1px;
    }
  }
`;

const ContractActions = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [opType, setOpType] = useState('');

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (type) => {
    setOpen(!open);
    setOpType(type);
    setShow(true);
  };

  return (
    <>
      <Dropdown onToggle={() => setOpen(!open)}>
        <DDwnToggle>
          <span style={{ marginRight: '5px' }}>Actions</span>
          <FontAwesomeIcon
            icon="chevron-down"
            rotation={open ? 180 : 0}
            style={{ transition: 'all 0.15s ease' }}
          />
        </DDwnToggle>

        <DDwnMenu align="right">
          <Dropdown.Item
            className="dropdown-item"
            onClick={() => handleShow('transaction')}
          >
            Create transaction
          </Dropdown.Item>
          <Dropdown.Item
            className="dropdown-item"
            onClick={() => handleShow('delegation')}
          >
            Create delegation
          </Dropdown.Item>
          <Dropdown.Item
            className="dropdown-item"
            onClick={() => handleShow('edit')}
          >
            Create contract update
          </Dropdown.Item>
        </DDwnMenu>
      </Dropdown>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header style={{ padding: '15px 30px' }}>
          <div style={{ width: '100%' }}>
            <Modal.Close onClick={handleClose}>
              <FontAwesomeIcon icon="times" />
            </Modal.Close>

            <Title as="h3" style={{ marginBottom: 0 }}>
              {/* eslint-disable-next-line no-nested-ternary */}
              {opType === 'transaction'
                ? 'New transaction'
                : // eslint-disable-next-line no-nested-ternary
                opType === 'delegation'
                ? 'New delegation'
                : opType === 'edit'
                ? 'New contract update'
                : ''}
            </Title>
          </div>
        </Modal.Header>

        <Modal.Body style={{ padding: '15px 30px' }}>
          {(() => {
            if (opType === 'transaction') {
              return <CreateTx onCreate={handleClose} onCancel={handleClose} />;
            }

            if (opType === 'delegation') {
              return (
                <CreateDelegation
                  onCreate={handleClose}
                  onCancel={handleClose}
                />
              );
            }

            if (opType === 'edit') {
              return (
                <ContractEditor onCreate={handleClose} onCancel={handleClose} />
              );
            }

            return '';
          })()}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ContractActions;