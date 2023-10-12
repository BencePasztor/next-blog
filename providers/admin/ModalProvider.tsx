import { useState, createContext, useContext, ReactNode } from "react"
import { ButtonVariant } from "@/components/common/ui/Button"
import ModalBase from "@/components/admin/ui/ModalBase"

type OpenModalParams = {
    title: string,
    body: ReactNode,
    confirmText: string,
    confirmVariant?: ButtonVariant,
    confirmCallback?: () => void,
    closeOnBackdropClick?: boolean,
    showCancelButton?: boolean
}

export type ModalBaseProps = {
    modalOpen: boolean,
    closeModal: () => void
} & OpenModalParams

type ModalContextType = {
    openModal: (modalParams: OpenModalParams) => void,
    closeModal: () => void
}

type ModalState = {
    modalOpen: boolean
} & OpenModalParams

type ModalProviderProps = {
    children: ReactNode
}

// Context
const ModalContext = createContext<ModalContextType | null>(null)

// Hook
export const useModal = () => {
    return useContext(ModalContext)!
}

// Provider
const ModalProvider = ({ children }: ModalProviderProps) => {

    const [modalState, setModalState] = useState<ModalState>({
        modalOpen: false,
        title: '',
        body: '',
        confirmText: ''
    })

    const openModal = (modalParams: OpenModalParams) => { setModalState({ ...modalParams, modalOpen: true }) }

    const closeModal = () => {
        setModalState({
            modalOpen: false,
            title: '',
            body: '',
            confirmText: ''
        })
    }

    const providerValue = {
        openModal,
        closeModal
    }

    return (
        <ModalContext.Provider value={providerValue}>
            <ModalBase {...modalState} closeModal={closeModal} />
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider