// src/pages/OrderConfirmation.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function OrderConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;

    useEffect(() => {
        if (!order) {
            navigate('/');
        }
    }, [order, navigate]);

    if (!order) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-3xl mx-auto px-4">
                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Header Section - Green Gradient */}
                    <div className="bg-black px-8 py-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <h1 className="text-2xl font-bold">Order Confirmed! 🎉</h1>
                                </div>
                                <p className="text-green-100 mt-1">Thank you for your purchase</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-green-100">Order #</p>
                                <p className="font-mono font-bold text-lg">{order.id}</p>
                            </div>
                        </div>
                    </div>

                    {/* Body Section */}
                    <div className="p-8">
                        {/* Order Status */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                ✓ Confirmed
                            </span>
                            <span className="text-sm text-gray-500">
                                Ordered on {order.orderDate}
                            </span>
                        </div>

                        {/* Order Items */}
                        <div className="border border-neutral-300 rounded-xl p-4 mb-6">
                            <h3 className="font-semibold text-gray-700 mb-3">Order Items</h3>
                            <div className="space-y-2">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center border-b last:border-0 py-2">
                                        <div>
                                            <p className="font-medium text-gray-800">{item.name}</p>
                                            <p className="text-sm text-gray-500">Size: {item.size} | Color: {item.color}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-gray-800">${item.price.toFixed(2)}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping & Payment Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="border border-neutral-300 rounded-xl p-4">
                                <h3 className="font-semibold text-gray-700 mb-2">📦 Shipping Address</h3>
                                <p className="text-gray-600">{order.shippingInfo.fullName}</p>
                                <p className="text-gray-600">{order.shippingInfo.address}</p>
                                <p className="text-gray-600">
                                    {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}
                                </p>
                                <p className="text-gray-600">{order.shippingInfo.country}</p>
                            </div>
                            <div className="border border-neutral-300 rounded-xl p-4">
                                <h3 className="font-semibold text-gray-700 mb-2">💳 Payment Method</h3>
                                <p className="text-gray-600">{order.paymentInfo.method}</p>
                                <p className="text-gray-600">Card ending in {order.paymentInfo.last4}</p>
                                <p className="text-gray-600">{order.paymentInfo.cardName}</p>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-gray-50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-700 mb-3">Order Summary</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-green-600">
                                    <span>Discount (10%)</span>
                                    <span>-${order.discount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery Fee</span>
                                    <span>${order.deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-neutral-300 pt-2 mt-2">
                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <button
                                onClick={() => navigate('/')}
                                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Continue Shopping
                            </button>
                            <button
                                onClick={() => navigate('/orders')}
                                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                            >
                                View Orders
                            </button>
                        </div>

                        {/* Simulated Payment Note */}
                        <div className="mt-6 pt-6 border-t text-center">
                            <p className="text-sm text-gray-400">
                                💳 This is a simulated payment for demo purposes. No real charges were made.
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                                A confirmation email has been sent to your registered email address.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}