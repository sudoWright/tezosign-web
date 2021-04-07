import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from '../../../styled/Dropdown';
import Modal from '../../../styled/Modal';
import { Title } from '../../../styled/Text';
import VestingVestForm from './VestingVestForm';
import VestingSetDelegateForm from './VestingSetDelegateForm';

const VestingActions = ({ vestingAddress, vestingBalance }) => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  // vesting_vest
  // vesting_set_delegate
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
        <Dropdown.Toggle>
          <span style={{ marginRight: '5px' }}>Actions</span>
          <FontAwesomeIcon
            icon="chevron-down"
            rotation={open ? 180 : 0}
            style={{ transition: 'all 0.15s ease' }}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu align="right">
          <Dropdown.Item
            className="dropdown-item"
            onClick={() => handleShow('vesting_vest')}
          >
            Withdraw from vesting
          </Dropdown.Item>
          <Dropdown.Item
            className="dropdown-item"
            onClick={() => handleShow('vesting_set_delegate')}
          >
            Set new vesting delegate
          </Dropdown.Item>
        </Dropdown.Menu>
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
              {opType === 'vesting_vest'
                ? 'Withdraw from vesting'
                : opType === 'vesting_set_delegate'
                ? 'Set new vesting delegate'
                : ''}
            </Title>
          </div>
        </Modal.Header>

        <Modal.Body style={{ padding: '15px 30px' }}>
          {(() => {
            if (opType === 'vesting_vest') {
              return (
                <VestingVestForm
                  vestingAddress={vestingAddress}
                  vestingBalance={vestingBalance}
                  onSubmit={handleClose}
                  onCancel={handleClose}
                />
              );
            }

            if (opType === 'vesting_set_delegate') {
              return (
                <VestingSetDelegateForm
                  vestingAddress={vestingAddress}
                  onSubmit={handleClose}
                  onCancel={handleClose}
                />
              );
            }

            return '';
          })()}
        </Modal.Body>
      </Modal>
    </>
  );
};

VestingActions.propTypes = {
  vestingAddress: PropTypes.string.isRequired,
  vestingBalance: PropTypes.number.isRequired,
};

export default VestingActions;
