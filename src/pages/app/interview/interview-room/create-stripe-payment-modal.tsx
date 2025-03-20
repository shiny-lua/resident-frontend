import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";

import Modal from "../../../../components/modal"

import CheckoutForm from "./checkout-form";
import Icon from "../../../../components/icon";
const CreateStripePaymentModal = ({ isOpen, onClose, stripePromise, handleScreenShare, setIsPremium }: { isOpen: boolean; onClose: VoidFunction, stripePromise: any, handleScreenShare: VoidFunction, setIsPremium: Function }) => {

    const modalRef = React.useRef<HTMLDivElement | null>(null)
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto"
    }, [isOpen])

    React.useEffect(() => {

        const onModal = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose()
            }
        };

        document.addEventListener("mousedown", onModal);
        return () => {
            document.removeEventListener("mousedown", onModal);
        };
    })

    React.useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [])

    return (
        <Modal>
            <div
                className="grid place-items-center fixed w-screen h-screen bg-black bg-opacity-70 backdrop-blur-sm fade-in">
                <div
                    ref={modalRef}
                    className="fixed left-[50%] top-[50%] z-50 grid max-w-[500px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white shadow-lg duration-200 sm:rounded-lg rounded-lg max-h-[calc(100dvh-48px)] w-[95%] sm:w-5/6 grid-rows-[auto_1fr_auto] pt-8"
                    style={{ pointerEvents: "auto" }}
                >
                    <div className="relative">
                        <div onClick={onClose} className="absolute -top-4 right-2 flex w-6 justify-center rounded-sm border align-middle hover:cursor-pointer" title="Close" >
                            <Icon icon="Close" />
                        </div>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm setIsPremium={setIsPremium} handleScreenShare={handleScreenShare} onClose={onClose} />
                        </Elements>
                    </div>
                </div>
            </div>
        </Modal >
    )
}

export default CreateStripePaymentModal