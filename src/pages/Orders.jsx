// src/pages/Orders.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        setOrders(savedOrders.reverse()); // Show newest first
    }, []);

    // Toggle order details
    const toggleOrder = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold mb-4">My Orders</h1>
                    <div className="bg-white rounded-lg shadow-sm p-12">
                        <div className="text-6xl mb-4">📦</div>
                        <p className="text-gray-600 text-lg">You haven't placed any orders yet.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Start Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm mb-6">
                    <span 
                        onClick={() => navigate('/')} 
                        className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                        Home
                    </span>
                    <span className="text-gray-300">&gt;</span>
                    <span className="text-gray-800 font-medium">My Orders</span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
                
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="rounded-3xl border border-neutral-300 px-4 py-6 sm:flex-row sm:items-center">
                            {/* Order Header - Always Visible */}
                            <div 
                                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => toggleOrder(order.id)}
                            >
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-2">
                                            {order.items.slice(0, 3).map((item, index) => (
                                                <div key={item.id} className="w-10 h-10 bg-gray-100 rounded-full border-2 border-white overflow-hidden">
                                                    <img 
                                                        src={item.img || 'https://via.placeholder.com/40'} 
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/40';
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                            {order.items.length > 3 && (
                                                <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
                                                    +{order.items.length - 3}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <p className="font-semibold text-gray-900">Order #{order.id}</p>
                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                    {order.status || 'Confirmed'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">{order.orderDate}</p>
                                        </div>
                                    </div>
                                    <div className="text-right mt-3 sm:mt-0">
                                        <p className="text-xl font-bold text-blue-600">${order.total.toFixed(2)}</p>
                                        <p className="text-sm text-gray-500">
                                            {order.items.length} item{order.items.length > 1 ? 's' : ''}
                                        </p>
                                        <span className="text-xs text-gray-400">
                                            {expandedOrder === order.id ? '▲ Hide details' : '▼ View details'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Details - Expandable */}
                            {expandedOrder === order.id && (
                                <div className="border-t border-neutral-300 px-6 py-4 bg-gray-50">
                                    {/* Order Items with Images */}
                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-gray-700 text-sm">Order Items</h4>
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4 border border-neutral-300 rounded-lg p-3 ">
                                                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img 
                                                        src={item.img || 'https://via.placeholder.com/64'} 
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/64';
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-800">{item.name}</p>
                                                    <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                                                        <span>Size: {item.size}</span>
                                                        <span>Color: {item.color}</span>
                                                        <span>Qty: {item.quantity}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-gray-800">${item.price.toFixed(2)}</p>
                                                    <p className="text-sm text-gray-500">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Shipping & Payment Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div className="border border-neutral-300 rounded-lg p-3 ">
                                            <h4 className="font-semibold text-gray-700 text-sm mb-2">📦 Shipping Address</h4>
                                            <p className="text-sm text-gray-600">{order.shippingInfo?.fullName}</p>
                                            <p className="text-sm text-gray-600">{order.shippingInfo?.address}</p>
                                            <p className="text-sm text-gray-600">
                                                {order.shippingInfo?.city}, {order.shippingInfo?.state} {order.shippingInfo?.zipCode}
                                            </p>
                                            <p className="text-sm text-gray-600">{order.shippingInfo?.country}</p>
                                        </div>
                                        <div className="border border-neutral-300 rounded-lg p-3 ">
                                            <h4 className="font-semibold text-gray-700 text-sm mb-2">💳 Payment Method</h4>
                                            <p className="text-sm text-gray-600">{order.paymentInfo?.method}</p>
                                            <p className="text-sm text-gray-600">Card ending in {order.paymentInfo?.last4}</p>
                                            <p className="text-sm text-gray-600">{order.paymentInfo?.cardName}</p>
                                        </div>
                                    </div>

                                    {/* Order Summary */}
                                    <div className="border border-neutral-300 rounded-lg p-3 mt-4">
                                        <h4 className="font-semibold text-gray-700 text-sm mb-2">Order Summary</h4>
                                        <div className="space-y-1 text-sm">
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
                                                <div className="flex justify-between text-lg font-bold text-gray-900">
                                                    <span>Total</span>
                                                    <span>${order.total.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Actions */}
                                    <div className="flex gap-3 mt-4">
                                        <button
                                            onClick={() => navigate('/')}
                                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Buy Again
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}