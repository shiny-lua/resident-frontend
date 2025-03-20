import { CardCvcElement, CardExpiryElement, CardNumberElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useState } from 'react'
import Loader from '../../../../components/loader';
import Icon from '../../../../components/icon';
import { restApi } from '../../../../context/restApi';
import { useGlobalContext } from '../../../../context';
import { showToast } from '../../../../context/helper';

const CheckoutForm = ({ handleScreenShare, setIsPremium, onClose }: { handleScreenShare: VoidFunction, setIsPremium: Function, onClose: VoidFunction }) => {
    const [state, { dispatch }]: GlobalContextType = useGlobalContext()
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        // Get the card element
        const cardElement = elements.getElement(CardNumberElement);

        if (!cardElement) {
            setMessage("An error occurred while processing your payment.");
            setIsLoading(false);
            return;
        }

        // Create payment method instead of confirming payment directly
        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (paymentMethodError) {
            console.log(paymentMethodError);
            setMessage(paymentMethodError.message || "An unexpected error occurred.");
            setIsLoading(false);
            return;
        }
        console.log(paymentMethod)

        const res = await restApi.postRequest('/create-payment-method', {
            payment_method_id: paymentMethod.id,
            card: paymentMethod.card,
            created: paymentMethod.created,
            billing_details: paymentMethod.billing_details
        })

        if (res.status === 200) {
            console.log("res.data.is_premium", res.data)
            setIsPremium(res.data.is_premium)
            dispatch({
                type: "user",
                payload: {
                    ...state.user,
                    isPremium: res.data.is_premium
                }
            })

            onClose()
            showToast("Your credit card has been successfully added!", "success")
        } else {
            setMessage(res.data.msg);
            setIsLoading(false);
        }

        setIsLoading(false);
    }

    return (
        <div className="">
            <div className="p-6 pb-0">
                <h2 className="text-[14px] font-semibold mb-6">Connect your credit card to unlock free trial experience.</h2>
                {message && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
                        <Icon icon="AlertCircle" className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-600">{message}</span>
                    </div>
                )}
                <form id="payment-form" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Card Number</label>
                            <div className="mt-1 relative">
                                <CardNumberElement
                                    className='mb-8 border border-gray-300 rounded-md p-2 pr-12'
                                    options={{
                                        showIcon: true,
                                        style: {
                                            base: {
                                                fontSize: '16px',
                                                color: '#424770',
                                                '::placeholder': {
                                                    color: '#aab7c4',
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Expiration</label>
                                <CardExpiryElement
                                    className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">CVC</label>
                                <CardCvcElement
                                    className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <button
                            disabled={isLoading || !stripe || !elements}
                            className="w-full bg-sky-500 text-white py-3 px-4 rounded-md hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className='flex items-center justify-center gap-2'>
                                {isLoading && <Loader />}
                                Continue
                            </span>
                        </button>

                    </div>
                    <p className="text-center text-xs font-semibold text-gray-500 my-2">You won't be charged.</p>
                    <div className="flex flex-col items-center justify-center space-y-2 text-sm text-gray-500">
                        {/* <div className='flex items-center gap-2'>
                            <span className='font-semibold text-sky-500'>Powered by</span>
                            <Icon icon="Stripe" />
                        </div> */}
                        <div className='flex items-center gap-2 bg-sky-200/70 rounded-md py-1 px-2'>
                            <Icon icon="Lock" className='w-6 h-6 text-sky-500' />
                            <span className='text-sm font-semibold text-sky-500'>Secured by 256-bit AES and 256-bit SSL/TLS encryption</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CheckoutForm;


