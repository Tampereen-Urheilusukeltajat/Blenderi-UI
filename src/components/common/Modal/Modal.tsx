import React from 'react';
import {
  Modal as BootstrapModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { PrimaryButton, SecondaryButton } from '../Button/Buttons';

type ModalProps = {
  cancelButtonText?: string;
  confirmButtonText?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  title: string;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  children,
  title,
  confirmButtonText = 'OK',
  cancelButtonText = 'Peruuta',
}) => {
  return (
    <BootstrapModal show={isOpen} onHide={onClose}>
      <ModalHeader closeButton>
        <ModalTitle>{title}</ModalTitle>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <SecondaryButton onClick={onClose} text={cancelButtonText} />
        <PrimaryButton onClick={onConfirm} text={confirmButtonText} />
      </ModalFooter>
    </BootstrapModal>
  );
};
