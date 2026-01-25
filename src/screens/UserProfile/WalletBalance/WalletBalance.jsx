import React, { useState, useEffect } from 'react';
import styles from './WalletBalance.module.css';
import backFaq from '../../../assets/images/backIcon.svg';
import { Landmark, Plus, Wallet, X } from "lucide-react";
import { formatINR } from "../../../utils/currency";

const SellWalletBalanceGold = ({
    isOpen,
    onClose,
    title = "Wallet",
    showBackButton = true,
}) => {
    const [view, setView] = useState('balance'); // 'balance', 'selectBank', 'addBank'
    const [isProcessing, setIsProcessing] = useState(false);
    const [walletData, setWalletData] = useState({ balance: 0, banks: [] });
    const [selectedBank, setSelectedBank] = useState(null);
    const [amount, setAmount] = useState("");

    const [bankForm, setBankForm] = useState({ name: '', accNo: '', ifsc: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen) {
            fetchWalletData();
        }
    }, [isOpen]);

    const fetchWalletData = async () => {
        // Mocking API call
        const mockData = {
            balance: 12540.50,
            banks: [{ id: 1, name: 'HDFC Bank', accNo: 'XXXX 8829' }]
        };
        setWalletData(mockData);
    };

    const handleAddBank = async () => {
        const newErrors = {};
        if (!bankForm.name) newErrors.name = "Bank name required";
        if (bankForm.accNo.length < 10) newErrors.accNo = "Invalid account number";
        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(bankForm.ifsc)) newErrors.ifsc = "Invalid IFSC code";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsProcessing(true);
        // await addBankService(bankForm);
        await fetchWalletData();
        setIsProcessing(false);
        setView('selectBank');
    };

    const handleWithdraw = () => {
        if (!amount || parseFloat(amount) <= 0) return alert("Please enter a valid amount");
        if (parseFloat(amount) > walletData.balance) return alert("Insufficient balance");
        if (!selectedBank) return alert("Please select a bank");

        setIsProcessing(true);
        // Call API with { amount, bankId: selectedBank }
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        // Allow empty string for backspacing, but don't allow value > balance
        if (value === '' || (parseFloat(value) <= walletData.balance)) {
            setAmount(value);
        }
    };

    const setMaxBalance = () => {
        setAmount(walletData.balance.toString());
    };

    const [historyData] = useState([
        { id: 1, amount: 500.00, date: '24 Jan 2026', time: '11:30 AM', status: 'Success' },
        { id: 2, amount: 1200.00, date: '20 Jan 2026', time: '02:15 PM', status: 'Pending' },
        { id: 3, amount: 250.00, date: '15 Jan 2026', time: '09:45 AM', status: 'Failed' },
    ]);

    if (!isOpen) return null;

   return (
    <div className={`${styles.WalletBalanceModalOverlay} ${isOpen ? styles.WalletBalanceOpen : ''}`}>
        <div className={styles.WalletBalanceModalContainer}>
            <div className={styles.WalletBalanceModalHeader}>
                <div className={styles.WalletBalanceComponentParent}>
                    <img
                        className={styles.WalletBalanceBackIcon}
                        alt="Back"
                        src={backFaq}
                        onClick={view === 'balance' ? onClose : () => setView('balance')}
                        style={{ cursor: 'pointer' }}
                    />
                    <div className={styles.WalletBalanceHeaderTitleWrapper}>
                        <h2 className={styles.WalletBalanceHeading}>{title}</h2>
                        <span className={styles.WalletBalanceSubHeaderText}>Manage your wallet funds</span>
                    </div>
                </div>
            </div>

            <div className={styles.WalletBalanceMainContentScroll}>
                <div className={styles.WalletBalanceInnerBody}>

                    {view === 'balance' && (
                        <>
                            <div className={styles.WalletBalancePremiumCard}>
                                <div className={styles.WalletBalanceCardCircle} />
                                <div className={styles.WalletBalanceCardHeader}>
                                    <span className={styles.WalletBalanceCardTitle}>Total Balance</span>
                                    <Wallet size={18} opacity={0.7} />
                                </div>
                                <h2 className={styles.WalletBalanceCardBalance}>
                                    {formatINR(walletData.balance)}
                                </h2>
                                <div className={styles.WalletBalanceCardFooter}>
                                    <span className={styles.WalletBalanceCardNumber}>**** **** **** 4242</span>
                                    <span
                                        className={styles.WalletBalanceCardWithdrawLabel}
                                        onClick={() => setView('selectBank')}
                                    >
                                        Withdraw to Bank
                                    </span>
                                </div>
                            </div>

                            <div className={styles.WalletBalanceHistorySection}>
                                <h3 className={styles.WalletBalanceSectionTitle}>Withdrawal History</h3>
                                <div className={styles.WalletBalanceHistoryList}>
                                    {historyData.map(item => (
                                        <div key={item.id} className={styles.WalletBalanceHistoryItem}>
                                            <div className={styles.WalletBalanceHistoryLeft}>
                                                <div
                                                    className={`${styles.WalletBalanceStatusDot} ${styles[`WalletBalance${item.status}`]}`}
                                                />
                                                <div className={styles.WalletBalanceHistoryInfo}>
                                                    <p className={styles.WalletBalanceHistoryAmount}>
                                                        {formatINR(item.amount)}
                                                    </p>
                                                    <p className={styles.WalletBalanceHistoryDateTime}>
                                                        {item.date} • {item.time}
                                                    </p>
                                                </div>
                                            </div>
                                            <span
                                                className={`${styles.WalletBalanceStatusBadge} ${styles[`WalletBalance${item.status}Text`]}`}
                                            >
                                                {item.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {view === 'selectBank' && (
                        <div className={styles.WalletBalanceBankListContainer}>
                            <div className={styles.WalletBalanceSectionHeader}>
                                <h3 className={styles.WalletBalanceSectionTitle}>Withdraw Funds</h3>
                                <X
                                    size={18}
                                    className={styles.WalletBalanceCloseIcon}
                                    onClick={() => setView('balance')}
                                />
                            </div>

                            <div className={styles.WalletBalanceCompactAmountBox}>
                                <div className={styles.WalletBalanceAmountHeader}>
                                    <span className={styles.WalletBalanceInputLabel}>Enter Amount</span>
                                    <button
                                        className={styles.WalletBalanceMaxBadge}
                                        onClick={() => setAmount(walletData.balance.toString())}
                                    >
                                        MAX
                                    </button>
                                </div>

                                <div className={styles.WalletBalanceInputRow}>
                                    <span className={styles.WalletBalanceCurrencyPrefix}>₹</span>
                                    <input
                                        type="number"
                                        className={styles.WalletBalancePremiumAmountInput}
                                        value={amount}
                                        onChange={e => {
                                            const val = e.target.value
                                            if (val === '' || Number(val) <= walletData.balance) {
                                                setAmount(val)
                                            }
                                        }}
                                    />
                                </div>

                                <div className={styles.WalletBalanceBalanceInfo}>
                                    Available: {formatINR(walletData.balance)}
                                </div>
                            </div>

                            <h3 className={styles.WalletBalanceSectionTitle}>Select Bank Account</h3>

                            <div className={styles.WalletBalanceBankListScroll}>
                                {walletData.banks.map(bank => (
                                    <div
                                        key={bank.id}
                                        className={`${styles.WalletBalanceBankItem} ${selectedBank === bank.id ? styles.WalletBalanceSelectedBank : ''}`}
                                        onClick={() => setSelectedBank(bank.id)}
                                    >
                                        <Landmark size={20} className={styles.WalletBalanceBankIcon} />
                                        <div className={styles.WalletBalanceBankDetails}>
                                            <p className={styles.WalletBalanceBankName}>{bank.name}</p>
                                            <p className={styles.WalletBalanceBankAcc}>{bank.accNo}</p>
                                        </div>
                                        <div className={styles.WalletBalanceRadioCircle}>
                                            {selectedBank === bank.id && (
                                                <div className={styles.WalletBalanceRadioInner} />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                className={styles.WalletBalanceAddBankBtn}
                                onClick={() => setView('addBank')}
                            >
                                <Plus size={16} /> Add New Bank
                            </button>
                        </div>
                    )}

                    {view === 'addBank' && (
                        <div className={styles.WalletBalanceBankForm}>
                            <div className={styles.WalletBalanceSectionHeader}>
                                <h3 className={styles.WalletBalanceSectionTitle}>Link Bank Account</h3>
                                <X
                                    size={18}
                                    className={styles.WalletBalanceCloseIcon}
                                    onClick={() => setView('selectBank')}
                                />
                            </div>

                            <div className={styles.WalletBalanceInputGroup}>
                                <label>Bank Name</label>
                                <input type="text" />
                                {errors.name && (
                                    <span className={styles.WalletBalanceError}>{errors.name}</span>
                                )}
                            </div>

                            <div className={styles.WalletBalanceInputGroup}>
                                <label>Account Number</label>
                                <input type="text" />
                                {errors.accNo && (
                                    <span className={styles.WalletBalanceError}>{errors.accNo}</span>
                                )}
                            </div>

                            <div className={styles.WalletBalanceInputGroup}>
                                <label>IFSC Code</label>
                                <input type="text" />
                                {errors.ifsc && (
                                    <span className={styles.WalletBalanceError}>{errors.ifsc}</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.WalletBalanceActionFooter}>
                    {view === 'addBank' && (
                        <button
                            className={styles.WalletBalanceSubmitButton}
                            disabled={isProcessing}
                        >
                            Save Bank Account
                        </button>
                    )}

                    {view === 'selectBank' && selectedBank && (
                        <button
                            className={styles.WalletBalanceSubmitButton}
                            disabled={isProcessing}
                        >
                            Withdraw Balance
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
)

};

export default SellWalletBalanceGold;