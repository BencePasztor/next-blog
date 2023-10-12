'use client'

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { twMerge } from "tailwind-merge"
import clsx from "clsx"
import Button from "@/components/common/ui/Button"
import { ModalBaseProps } from "@/providers/admin/ModalProvider"

const ModalBase = ({ title, body, confirmCallback, confirmVariant = "primary", confirmText, modalOpen, closeModal, closeOnBackdropClick = true, showCancelButton = true }: ModalBaseProps) => {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const backdropClasses = twMerge(
        "fixed w-full h-full top-0 left-0 z-30 transition-colors",
        clsx({
            "bg-black/40": modalOpen,
            "bg-transparent pointer-events-none": !modalOpen,
        }))


    const confirmHandler = () => {
        if (typeof confirmCallback === "function") {
            confirmCallback()
        }
        closeModal()
    }

    const backdropClickHandler = () => {
        if (closeOnBackdropClick) {
            closeModal()
        }
    }

    return (
        createPortal(
            <>
                {modalOpen &&
                    <div className="fixed inset-x-0 z-40 w-full max-w-md p-4 mx-auto top-8 animate-pop">
                        <div className="p-6 text-center bg-white rounded-lg shadow">
                            <h2 className="mb-2 text-lg font-semibold">{title}</h2>
                            <div className="text-base">{body}</div>
                            <div className="flex items-center justify-center gap-2 mt-4">
                                {showCancelButton && <Button className="text-base font-bold" onClick={closeModal} variant="light" outline>Cancel</Button>}
                                <Button className="text-base font-bold" onClick={confirmHandler} variant={confirmVariant}>{confirmText}</Button>
                            </div>
                        </div>
                    </div>
                }
                <div onClick={backdropClickHandler} className={backdropClasses}></div>
            </>,
            document.getElementById("modal-portal")!)

    )
}

export default ModalBase