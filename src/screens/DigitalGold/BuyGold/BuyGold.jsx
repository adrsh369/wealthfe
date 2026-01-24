import React, { useState } from 'react';
import styles from './BuyGold.module.css';
import backFaq from '../../../assets/images/backIcon.svg';
import { createGoldOrder, createGoldOrderVerify } from '../../../services/apis/digitalGold.service';
import { postRequest } from "../../../services/apiClient"
import BuyGoldStatusModal from './BuyGoldStatusModal';

const BuyGold = ({
    isOpen,
    onClose,
    title = "Buy Digital Gold",
    showBackButton = true,
    setStatusModal
}) => {
    const [amount, setAmount] = useState('');
    const livePrice = 5428.18;
    const [isProcessing, setIsProcessing] = useState(false);


    if (!isOpen) return null;

    const handleQuickSelect = (val) => {
        setAmount(val.toString());
    };

    const createGoldOrders = async () => {
        try {
            setIsProcessing(true);

            const response = await createGoldOrder({ amount: amount });

            const options = {
                key: response.razorpayKey,
                amount: response.amount,
                currency: "INR",
                order_id: response.orderId,
                method: {
                    upi: true
                },
                prefill: {
                    vpa: ""
                },
                handler: async function (razorpayResponse) {
                    try {
                        const verifyRes = await createGoldOrderVerify({
                            ...razorpayResponse,
                            transactionId: response.transactionId
                        });

                        if (verifyRes.status === 1) {
                            setStatusModal({
                                open: true,
                                type: 'success',
                                details: { amount: amount, transactionId: response.transactionId }
                            });
                            onClose();

                        } else {
                            setStatusModal({
                                open: true,
                                type: 'failed',
                                details: { amount: amount }
                            });
                            onClose();
                        }
                    } finally {
                        setIsProcessing(false);
                    }
                },
                modal: {
                    ondismiss: () => {
                        setIsProcessing(false);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            setStatusModal({ open: true, type: 'failed', details: { amount: amount } });
            onClose();
        }
    };

    const resetForm = () => {
        setIsProcessing(false);
        setAmount('');
        onClose();
    }


    return (
        <div className={`${styles.BuyGoldmodalOverlay} ${isOpen ? styles.open : ''}`}>
            <div className={styles.BuyGoldmodalmodalContainer}>

                <div className={styles.BuyGoldmodalmodalHeader}>
                    {showBackButton && (
                        <div className={styles.BuyGoldmodalcomponent1Parent}>
                            <img
                                className={styles.BuyGoldmodalcomponent1Icon5}
                                alt="Back"
                                src={backFaq}
                                onClick={resetForm}
                                style={{ cursor: 'pointer' }}
                            />
                            <div className={styles.BuyGoldHeaderTitleWrapper}>
                                <b className={styles.BuyGoldmodalfaqsheading}>{title}</b>
                                <span className={styles.BuyGoldSubHeaderText}>24K | 99.94% Pure Gold</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.BuyGoldMainContentScroll}>
                    <div className={styles.BuyGoldInnerBody}>

                        <div className={styles.BuyGoldInputSection}>
                            <div className={styles.BuyGoldInputContainer}>
                                <span className={styles.BuyGoldRupeeSign}>₹</span>
                                <input
                                    type="number"
                                    className={styles.BuyGoldMainInput}
                                    placeholder="0"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>


                        <div className={styles.BuyGoldChipList}>
                            {[100, 500, 1000, 5000].map((val) => (
                                <button
                                    key={val}
                                    className={styles.BuyGoldQuickChip}
                                    onClick={() => handleQuickSelect(val)}
                                >
                                    ₹{val}
                                </button>
                            ))}
                        </div>


                        <div className={styles.BuyGoldCouponBox}>
                            <div className={styles.BuyGoldCouponLabelGroup}>
                                <div className={styles.BuyGoldPercentIcon}>%</div>
                                <span className={styles.BuyGoldCouponTitle}>Use coupon</span>
                            </div>
                            <span className={styles.BuyGoldComingSoonTag}>Coming Soon</span>
                        </div>
                    </div>


                    <div className={styles.BuyGoldActionFooter}>
                        <p className={styles.BuyGoldLivePriceText}>
                            LIVE Buy price ₹{livePrice}/gm + 3% GST
                        </p>
                        <button className={styles.BuyGoldSubmitButton} onClick={createGoldOrders} disabled={isProcessing}
                            style={{
                                opacity: isProcessing ? 0.6 : 1,
                                cursor: isProcessing ? "not-allowed" : "pointer"
                            }}>
                            {isProcessing ? "Processing..." : "Buy Gold"}
                        </button>
                        <p className={styles.BuyGoldTermsText}>
                            By continuing you agree to the <span className={styles.BuyGoldTermsLink}>terms and conditions.</span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BuyGold;