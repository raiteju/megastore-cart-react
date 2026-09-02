// src/pages/Checkout.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
    const navigate = useNavigate();
    const { state, dispatch } = useCart();
    const { cartItems } = state;

    // Step state (1: Shipping, 2: Payment, 3: Review)
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    // Form data
    const [formData, setFormData] = useState({
        // Shipping
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US',
        // Payment
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });

    const [errors, setErrors] = useState({});

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = subtotal * 0.1;
    const deliveryFee = 15;
    const total = subtotal - discount + deliveryFee;

    // If cart is empty, redirect to home
    if (cartItems.length === 0) {
        navigate('/');
        return null;
    }

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Validate Step 1: Shipping
    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Validate Step 2: Payment
    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
        if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
        if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
        if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Go to next step
    const handleNext = () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (step === 2 && validateStep2()) {
            setStep(3);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Go back
    const handleBack = () => {
        setStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Place Order
    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const order = {
            id: Date.now(),
            items: cartItems,
            shippingInfo: {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
                country: formData.country,
            },
            paymentInfo: {
                method: 'Credit Card',
                cardName: formData.cardName,
                last4: formData.cardNumber.slice(-4),
            },
            subtotal,
            discount,
            deliveryFee,
            total,
            orderDate: new Date().toLocaleDateString(),
            status: 'Confirmed',
        };
        
        // Save order to localStorage
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Clear cart
        dispatch({ type: 'CLEAR_CART' });
        
        setIsProcessing(false);
        navigate('/order-confirmation', { state: { order } });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm mb-6">
                    <span 
                        onClick={() => navigate('/')} 
                        className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                        Home
                    </span>
                    <span className="text-gray-300">&gt;</span>
                    <span 
                        onClick={() => navigate('/cart')} 
                        className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                        Cart
                    </span>
                    <span className="text-gray-300">&gt;</span>
                    <span className="text-gray-800 font-medium">Checkout</span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center gap-2 sm:gap-4">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center">
                                <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold text-sm sm:text-base ${
                                    s === step ? 'bg-blue-600 text-white' :
                                    s < step ? 'bg-green-500 text-white' :
                                    'bg-gray-200 text-gray-600'
                                }`}>
                                    {s < step ? '✓' : s}
                                </div>
                                <span className={`ml-2 text-xs sm:text-sm font-medium hidden sm:block ${
                                    s === step ? 'text-blue-600' :
                                    s < step ? 'text-green-500' :
                                    'text-gray-500'
                                }`}>
                                    {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
                                </span>
                                {s < 3 && (
                                    <div className={`w-8 sm:w-16 h-1 mx-2 ${
                                        s < step ? 'bg-green-500' : 'bg-gray-200'
                                    }`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form - Left Column */}
                    <div className="lg:col-span-2">
                        <div className="rounded-3xl border border-neutral-300 px-4 py-6 sm:flex-row sm:items-center">
                            {/* Step 1: Shipping Information */}
                            {step === 1 && (
                                <div>
                                    <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="John Doe"
                                            />
                                            {errors.fullName && (
                                                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="+1 234 567 890"
                                            />
                                        </div>
                                        
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Address *
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    errors.address ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="123 Main Street"
                                            />
                                            {errors.address && (
                                                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    errors.city ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="New York"
                                            />
                                            {errors.city && (
                                                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Zip Code *
                                            </label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    errors.zipCode ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="10001"
                                            />
                                            {errors.zipCode && (
                                                <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                State
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="NY"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Country
                                            </label>
                                            <select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="US">United States</option>
                                                <option value="UK">United Kingdom</option>
                                                <option value="CA">Canada</option>
                                                <option value="AU">Australia</option>
                                                <option value="IN">India</option>
                                                <option value="AE">UAE</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Payment Method */}
                            {step === 2 && (
                                <div>
                                    <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Card Number *
                                            </label>
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="1234 5678 9012 3456"
                                                maxLength="19"
                                            />
                                            {errors.cardNumber && (
                                                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Name on Card *
                                            </label>
                                            <input
                                                type="text"
                                                name="cardName"
                                                value={formData.cardName}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    errors.cardName ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="John Doe"
                                            />
                                            {errors.cardName && (
                                                <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
                                            )}
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Expiry Date *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="expiryDate"
                                                    value={formData.expiryDate}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                        errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                    placeholder="MM/YY"
                                                    maxLength="5"
                                                />
                                                {errors.expiryDate && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                                                )}
                                            </div>
                                            
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    CVV *
                                                </label>
                                                <input
                                                    type="password"
                                                    name="cvv"
                                                    value={formData.cvv}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                        errors.cvv ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                    placeholder="123"
                                                    maxLength="4"
                                                />
                                                {errors.cvv && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                                            <p className="text-sm text-blue-700">
                                                💳 <span className="font-semibold">Simulated Payment</span> - For demo purposes only. No real charges will be made.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Order Review */}
                            {step === 3 && (
                                <div>
                                    <h2 className="text-xl font-bold mb-6">Review Your Order</h2>
                                    
                                    <div className="space-y-6">
                                        {/* Shipping Address */}
                                        <div className="border-b border-neutral-300 pb-4">
                                            <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                📦 Shipping Address
                                            </h3>
                                            <p className="text-gray-600">{formData.fullName}</p>
                                            <p className="text-gray-600">{formData.address}</p>
                                            <p className="text-gray-600">
                                                {formData.city}, {formData.state} {formData.zipCode}
                                            </p>
                                            <p className="text-gray-600">{formData.country}</p>
                                        </div>
                                        
                                        {/* Payment Method */}
                                        <div className="border-b border-neutral-300 pb-4">
                                            <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                💳 Payment Method
                                            </h3>
                                            <p className="text-gray-600">
                                                Credit Card ending in {formData.cardNumber.slice(-4) || '****'}
                                            </p>
                                            <p className="text-gray-600">{formData.cardName}</p>
                                        </div>
                                        
                                        {/* Order Items */}
                                        <div>
                                            <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                🛒 Order Items ({cartItems.length})
                                            </h3>
                                            {cartItems.map((item) => (
                                                <div key={item.id} className="flex justify-between py-2 border-b last:border-0">
                                                    <span className="text-gray-600">
                                                        {item.name} 
                                                        <span className="text-sm text-gray-400 ml-1">x {item.quantity}</span>
                                                    </span>
                                                    <span className="font-medium">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Order Total Summary */}
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-gray-600">
                                                    <span>Subtotal</span>
                                                    <span>${subtotal.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between text-green-600">
                                                    <span>Discount (10%)</span>
                                                    <span>-${discount.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-600">
                                                    <span>Delivery Fee</span>
                                                    <span>${deliveryFee.toFixed(2)}</span>
                                                </div>
                                                <div className="border-t border-neutral-300 pt-2 mt-2">
                                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                                        <span>Total</span>
                                                        <span>${total.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8 pt-6 border-t border-neutral-300">
                                {step > 1 ? (
                                    <button
                                        onClick={handleBack}
                                        disabled={isProcessing}
                                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                                    >
                                        ← Back
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => navigate('/cart')}
                                        disabled={isProcessing}
                                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                                    >
                                        ← Return to Cart
                                    </button>
                                )}
                                
                                {step < 3 ? (
                                    <button
                                        onClick={handleNext}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Continue →
                                    </button>
                                ) : (
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={isProcessing}
                                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            'Place Order ✓'
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary - Right Column */}
                    <div className="lg:col-span-1">
                        <div className="rounded-3xl border border-neutral-300 px-4 py-6 sm:flex-row sm:items-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Items ({cartItems.length})</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-green-600">
                                    <span>Discount (-10%)</span>
                                    <span>-${discount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery Fee</span>
                                    <span>${deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-neutral-300 pt-3 mt-3">
                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-neutral-300">
                                <p className="text-sm text-gray-500 mb-2">Items in your cart:</p>
                                {cartItems.slice(0, 3).map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm text-gray-600 py-1">
                                        <span>{item.name}</span>
                                        <span>x{item.quantity}</span>
                                    </div>
                                ))}
                                {cartItems.length > 3 && (
                                    <p className="text-sm text-gray-400 mt-1">
                                        +{cartItems.length - 3} more items
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}