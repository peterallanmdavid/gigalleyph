"use client";

import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { Button, Modal } from "flowbite-react";
interface ModalProviderProps {}

const defaultModalContextValues = {};

interface ModalProviderContextValues {
  showModal: (modalConfig: ModalConfig) => void;
  dismissModal: () => void;
}

interface ModalConfig {
  title?: string;
  body?: string;
  renderCustomBody?: () => JSX.Element;
  hideCloseButton?: boolean;
}
const ModalProviderContext = createContext<ModalProviderContextValues>({
  showModal: () => null,
  dismissModal: () => null,
});

export const ModalProvider: React.FC<PropsWithChildren<ModalProviderProps>> = ({
  children,
}) => {
  const [modalConfig, setModalConfig] = useState<ModalConfig>({});
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = (modalConfig: ModalConfig) => {
    console.log("show modal was called");
    setModalConfig(modalConfig);
    setModalOpen(true);
  };
  const dismissModal = () => {
    setModalOpen(false);
  };

  const { title, body, renderCustomBody } = modalConfig;
  console.log("this is the modalopen", modalOpen);
  return (
    <ModalProviderContext.Provider
      value={{
        showModal,
        dismissModal,
      }}
    >
      {children}
      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        {!!title && <Modal.Header>Add Gig</Modal.Header>}

        <Modal.Body>
          {!!renderCustomBody ? (
            renderCustomBody()
          ) : (
            <>{!!body && <div className="space-y-6">{body}</div>}</>
          )}
        </Modal.Body>
      </Modal>
    </ModalProviderContext.Provider>
  );
};

export const useModal = () => useContext(ModalProviderContext);
