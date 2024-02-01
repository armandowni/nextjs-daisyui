import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "@tinqjs/tinjs-tw";
import { ForwardedRef, forwardRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { PromptDelete } from "./prompt";

export const useFormDialog = (initialValue?: any) => {
  const [isOpen, setOpen] = useState(false);
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [dataForm, setDataForm] = useState(initialValue);

  const add = (data?: any) => {
    setOpen(true);
    if (data) return setDataForm(data);
    else return setDataForm(null);
  };
  const edit = (data: any) => {
    setOpen(true);
    setDataForm(data);
  };
  const deleteData = (data: any) => {
    setOpenDelete(true);
    setDataForm(data);
  };
  const close = () => {
    setDataForm(null);
    setOpenDelete(false);
    setOpen(false);
  };

  return { add, edit, close, deleteData, isOpenDelete, isOpen, dataForm };
};
declare type ModalProps = {
  className?: string;
  children?: any;
  isOpen?: boolean;
  onClose?: any;
};
const TemplateModal = (
  { className, onClose, isOpen, children }: ModalProps,
  ref: ForwardedRef<any>
) => {
  return (
    <Modal show={isOpen} onClose={onClose} className={className} ref={ref}>
      {children}
    </Modal>
  );
};

const ReferableModal = forwardRef(TemplateModal);

export const ModalComponent = styled(ReferableModal)`
  & input,
  select {
    ${tw`w-full`}
  }

  & .x-dialog-body {
    ${tw`z-50`}
  }
`;

declare type DeleteModalProps = {
  className?: string;
  isOpen?: boolean;
  data?: any;
  message?: string;
  onDelete?: (data) => void;
  onClose?: any;
};
const TemplateDeleteModal = (
  { className, onClose, isOpen, data, message, onDelete }: DeleteModalProps,
  ref: ForwardedRef<any>
) => {
  return (
    <Modal show={isOpen} onClose={onClose} className={className} ref={ref}>
      <PromptDelete
        message={message}
        onYes={() => {
          onDelete(data);
          onClose();
        }}
        onNo={() => {
          onClose();
        }}
        icon={faExclamationTriangle}
      />
    </Modal>
  );
};

const ReferableDeleteModal = forwardRef(TemplateDeleteModal);

export const DeleteModalComponent = styled(ReferableDeleteModal)`
  & .x-dialog-body {
    ${tw`z-50`}
  }
`;
