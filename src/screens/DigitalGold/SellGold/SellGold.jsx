import React, { useState } from 'react';
import styles from './SellGold.module.css';
import backFaq from '../../../assets/images/backIcon.svg';
import { createGoldOrder, createGoldOrderVerify } from '../../../services/apis/digitalGold.service';
import { postRequest } from "../../../services/apiClient"
import SellGoldStatusModal from './SellGoldStatusModal';
import Select from 'react-select';

const SellGold = ({
    isOpen,
    onClose,
    title = "Sell Gold",
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

                        if (verifyRes.message === "Gold purchased successfully") {
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


    const bankOptions = [
        { value: 12, label: 'State Bank of India' },
        { value: 13, label: 'HDFC Bank' },
    ]


    return (
        <div className={`${styles.SellGoldmodalOverlay} ${isOpen ? styles.open : ''}`}>
            <div className={styles.SellGoldmodalmodalContainer}>

                <div className={styles.SellGoldmodalmodalHeader}>
                    {showBackButton && (
                        <div className={styles.SellGoldmodalcomponent1Parent}>
                            <img
                                className={styles.SellGoldmodalcomponent1Icon5}
                                alt="Back"
                                src={resetForm}
                                onClick={onClose}
                                style={{ cursor: 'pointer' }}
                            />
                            <div className={styles.SellGoldHeaderTitleWrapper}>
                                <b className={styles.SellGoldmodalfaqsheading}>{title}</b>
                                <span className={styles.SellGoldSubHeaderText}>24K | 99.94% Pure Gold</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.SellGoldMainContentScroll}>
                    <div className={styles.SellGoldInnerBody}>

                        <div className={styles.SellGoldInputSection}>
                            <div className={styles.SellGoldInputContainer}>
                                <span className={styles.SellGoldRupeeSign}>₹</span>
                                <input
                                    type="number"
                                    className={styles.SellGoldMainInput}
                                    placeholder="0"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>


                        <div className={styles.SellGoldChipList}>
                            {[100, 500, 1000, 5000].map((val) => (
                                <button
                                    key={val}
                                    className={styles.SellGoldQuickChip}
                                    onClick={() => handleQuickSelect(val)}
                                >
                                    ₹{val}
                                </button>
                            ))}
                        </div>



                        <div className={styles.SellGoldBankSelection}>
                            <Select options={bankOptions} />
                        </div>
                    </div>


                    <div className={styles.SellGoldActionFooter}>
                        <p className={styles.SellGoldLivePriceText}>
                            LIVE Sell price ₹{livePrice}/gm + 3% GST
                        </p>
                        <button className={styles.SellGoldSubmitButton} onClick={createGoldOrders} disabled={isProcessing}
                            style={{
                                opacity: isProcessing ? 0.6 : 1,
                                cursor: isProcessing ? "not-allowed" : "pointer"
                            }}>
                            {isProcessing ? "Processing..." : "Sell Gold"}
                        </button>
                        <p className={styles.SellGoldTermsText}>
                            By continuing you agree to the <span className={styles.SellGoldTermsLink}>terms and conditions.</span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SellGold;