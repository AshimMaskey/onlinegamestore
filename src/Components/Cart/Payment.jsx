import React, { useState, useContext, useEffect } from 'react';
import AdminContext from '../Context/AdminContext';
import { esewa } from '@/assets/images';

const generateUUID = () => {
    const timestamp = new Date().getTime().toString();
    // const randomComponent = Math.random().toString(36).substr(2;
    return `${timestamp}`;
};

const Payment = () => {
    const [signature, setSignature] = useState('');
    const [transactionUUID, setTransactionUUID] = useState(generateUUID());
    const { cart } = useContext(AdminContext);
    let totalAmount = 0;

    // Calculate total amount from cart
    for (let index in cart) {
        totalAmount += parseInt(cart[index].price);
    }

    useEffect(() => {
        if (totalAmount > 0) {
            generateSignature();
        }
    }, [totalAmount]);

    const generateSignature = () => {
        fetch('http://localhost/onlinegamestore/payment/generate-signature.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                total_amount: totalAmount,
                transaction_uuid: transactionUUID,
                product_code: 'EPAYTEST',
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to generate signature');
            }
            return response.json();
        })
        .then(data => {
            setSignature(data.signature);
        })
        .catch(error => {
            console.error('Error generating signature:', error);
        });
    };

    return (
        <div className='m-10'>
            <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
                <input type="hidden" name="amount" value={totalAmount - 10} />
                <input type="hidden" name="tax_amount" value="10" />
                <input type="hidden" name="total_amount" value={totalAmount} />
                <input type="hidden" name="transaction_uuid" value={transactionUUID} />
                <input type="hidden" name="product_code" value="EPAYTEST" />
                <input type="hidden" name="product_service_charge" value="0" />
                <input type="hidden" name="product_delivery_charge" value="0" />
                <input type="hidden" name="success_url" value="http://localhost:5173/download" />
                <input type="hidden" name="failure_url" value="http://localhost:5173/Cart" />
                <input type="hidden" name="signed_field_names" value="total_amount,transaction_uuid,product_code" />
                <input type="hidden" name="signature" value={signature} />                        
                <button type='submit' className='text-white text-xl bg-green-600 hover:bg-green-700 cursor-pointer duration-200 px-2 py-2 rounded-md'><img src={esewa} className='w-40 bg-gray-100 duration-200 mb-3 rounded-lg h-20' alt="" />Pay with eSewa</button>
            </form>
        </div>
    );
};

export default Payment;
