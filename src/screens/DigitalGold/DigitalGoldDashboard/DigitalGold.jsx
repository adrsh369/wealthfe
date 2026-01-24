import React, { useState, useEffect } from 'react';
import { MoveLeft, Calendar, Coins, Play, CircleStar, ChevronRight, CheckCircle2, Clock, ArrowLeft, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import styles from './DigitalGold.module.css';
import Navbar from '../../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import BuyGold from '../BuyGold/BuyGold';
import BuyGoldStatusModal from '../BuyGold/BuyGoldStatusModal';
import backIcon from '../../../assets/images/backIcon.svg';
import SellGold from '../SellGold/SellGold';
import SellGoldStatusModal from '../SellGold/SellGoldStatusModal';
import { fetchGoldInvestedSummary, getGoldOrders, goldLivePrice } from '../../../services/apis/digitalGold.service';
import { formatINR } from '../../../utils/currency';
import CountUp from 'react-countup';
import LoadingDots from '../../../components/LoadingDots/LoadingDots';
import useDeviceCheck from '../../../utils/useDeviceCheck'
import DesktopOrderSkeleton from '../../../components/SkeletonLoading/GoldOrdersSkeleton/DesktopOrderSkeleton';

const DigitalGold = () => {
  const { isMobileUtils, isDesktopUtils } = useDeviceCheck();
  const navigate = useNavigate();
  const [showBuyGoldModal, setBuyGoldModal] = useState(false);
  const [showSellGoldModal, setSellGoldModal] = useState(false);
  const [livePrice, setLivePrice] = useState(0);
  const [loadingLivePrice, setLoadingLivePrice] = useState(false);
  const [statusModal, setStatusModal] = useState({
    open: false,
    type: '',
    details: {}
  });

  const [statusModalSell, setStatusModalSell] = useState({
    open: false,
    type: '',
    details: {}
  });

  const [goldInvestedSummary, setGoldInvestedSummary] = useState({
    totalInvestedAmount: null,
    totalGrams: null
  });

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);



  const getGoldInvestedSummary = async () => {
    try {
      const res = await fetchGoldInvestedSummary();
      if (res.status === 1) {
        setGoldInvestedSummary({
          totalInvestedAmount: res.totalInvestedAmount || 0,
          totalGrams: res.totalGoldInGrams || 0
        });
      } else {
        setGoldInvestedSummary({
          totalInvestedAmount: 0,
          totalGrams: 0
        });
      }
    } catch (err) {
      console.error("Error fetching gold summary:", err);
      setGoldInvestedSummary({
        totalInvestedAmount: 0,
        totalGrams: 0
      });
    }
  };

  const fetchLivePrice = async () => {
    setLoadingLivePrice(true);

    try {
      const response = await goldLivePrice();

      if (response.status === 1) {
        setLivePrice(response?.pricePerGram || 0);
      } else {
        setLivePrice(0);
      }

    } catch (err) {
      setLivePrice(0);
    } finally {
      setLoadingLivePrice(false);
    }
  };

  // useEffect(() => {
  //   getGoldInvestedSummary();
  //   fetchLivePrice();
  // }, []);


  const fetchDesktopGoldOrders = async () => {
    setOrdersLoading(true);
    try {
      const res = await getGoldOrders();
      if (res.status === 1) {
        setOrders(res.orders || []);
      } else {
        setOrders([]);
      }
    } catch {
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };


  useEffect(() => {
    if (isDesktopUtils) {
      fetchDesktopGoldOrders ();
    }
  }, [isDesktopUtils]);


  const getCountUpStart = (value) => {
    if (typeof value !== "number") return 0;
    return Math.floor(value / 1000) * 1000;
  };

  const getGramsStart = (value) => {
    if (typeof value !== "number") return 0;
    return Number((value - 0.01).toFixed(4));
  };

  const refreshAfterTransaction = () => {
    getGoldInvestedSummary();
    if (isDesktopUtils) {
      fetchDesktopGoldOrders();
    }
  };

  const formatOrderDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

  const getOrderMeta = (order) =>
    `${order.orderType === "BUY" ? "Bought" : "Sold"}`;

  return (
    <>
      <Navbar />

      <div className={styles.DigitalGoldDashboardContainer}>
        {/* Header */}
        <header className={styles.DigitalGoldDashboardHeader}>
          <div className={styles.DigitalGoldDashboardTitleGroup} onClick={() => navigate("/dashboard")}>
            <img src={backIcon} alt="back" className={styles.DigitalGoldDashboardBackIcon} />
            <h2 className={styles.DigitalGoldDashboardMainTitle}>Digital gold</h2>
          </div>
          <div className={styles.DigitalGoldDashboardLivePriceBadge}>
            <div className={styles.DigitalGoldDashboardLiveIndicator}>
              <span className={styles.DigitalGoldDashboardPulseDot}></span>
              <span className={styles.DigitalGoldDashboardLiveText}>Live Price:</span>
            </div>
            <span className={styles.DigitalGoldDashboardPriceValue}>
              {loadingLivePrice ? (
                <LoadingDots />
              ) : (
                `${formatINR(livePrice)}/gm`
              )}
            </span>

          </div>
        </header>

        <main className={styles.DigitalGoldDashboardMain}>
          <div className={styles.DigitalGoldDashboardContentLeft}>

            {/* Savings Card */}
            <section className={styles.DigitalGoldDashboardSavingsCard}>
              <div className={styles.DigitalGoldDashboardSavingsTop}>
                <div className={styles.DigitalGoldDashboardSavingsText}>
                  <p className={styles.DigitalGoldDashboardLabel}>Your savings</p>
                  {/* <h1 className={styles.DigitalGoldDashboardBalance}>{formatINR(goldInvestedSummary.totalInvestedAmount)}</h1> */}
                  <h1 className={styles.DigitalGoldDashboardBalance}>
                    {goldInvestedSummary.totalInvestedAmount === null ? (
                      <LoadingDots />
                    ) : (
                      <CountUp
                        start={getCountUpStart(goldInvestedSummary.totalInvestedAmount)}
                        end={goldInvestedSummary.totalInvestedAmount}
                        duration={1.4}
                        separator=","
                        prefix="₹"
                      />
                    )}
                  </h1>
                  {/* <p className={styles.DigitalGoldDashboardWeight}>{goldInvestedSummary.totalGrams} grams</p> */}
                  <p className={styles.DigitalGoldDashboardWeight}>
                    {goldInvestedSummary.totalGrams === null ? (
                      <LoadingDots />
                    ) : (
                      <CountUp
                        start={getGramsStart(goldInvestedSummary.totalGrams)}
                        end={goldInvestedSummary.totalGrams}
                        decimals={4}
                        duration={1.2}
                      />

                    )} grams
                  </p>
                </div>
                <div className={styles.DigitalGoldDashboardSavingsIcon}>
                  <CircleStar size={36} color="#FFD700" fill="#FFD700" fillOpacity={0.3} />
                </div>
              </div>

              <div className={styles.DigitalGoldDashboardSavingsBottom}>
                <a href="#" className={styles.DigitalGoldDashboardViewDetail}>
                  View Detail <ChevronRight size={14} />
                </a>
                <div className={styles.DigitalGoldDashboardSavingsActions}>
                  <button className={styles.DigitalGoldDashboardBtnWithdraw} onClick={() => setSellGoldModal(true)}>Withdraw</button>
                  <button className={styles.DigitalGoldDashboardBtnBuy} onClick={() => setBuyGoldModal(true)}>Buy More</button>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <div className={styles.DigitalGoldDashboardQuickActions}>
              <div className={styles.DigitalGoldDashboardActionBox}>
                <div className={styles.DigitalGoldDashboardIconWrapper}>
                  <Calendar size={18} color="#1565c0" />
                </div>
                <div className={styles.DigitalGoldDashboardActionText}>
                  <h4>Setup monthly SIP</h4>
                  <p>Start your monthly savings now.</p>
                </div>
              </div>

              <div className={`${styles.DigitalGoldDashboardActionBox} ${styles.DigitalGoldDashboardActionDisabled}`}>
                <span className={styles.DigitalGoldDashboardComingSoonBadge}>Coming Soon</span>
                <div className={styles.DigitalGoldDashboardIconWrapper}>
                  <Coins size={18} color="#9e9e9e" />
                </div>
                <div className={styles.DigitalGoldDashboardActionText}>
                  <h4>Lease Gold</h4>
                  <p>Earn yield in form of gold.</p>
                </div>
              </div>
            </div>

            {/* Blogs & Videos */}
            <section className={styles.DigitalGoldDashboardBlogs}>
              <div className={styles.DigitalGoldDashboardSectionHeader}>
                <h3>Blogs & Videos</h3>
                <a href="#" className={styles.DigitalGoldDashboardLink}>View All</a>
              </div>
              <div className={styles.DigitalGoldDashboardVideoGrid}>
                {[1, 2].map((i) => (
                  <div key={i} className={styles.DigitalGoldDashboardVideoCard}>
                    <div className={styles.DigitalGoldDashboardVideoThumb}>
                      <div className={styles.DigitalGoldDashboardPlayOverlay}>
                        <div className={styles.DigitalGoldDashboardPlayCircle}>
                          <Play size={12} fill="white" color="white" />
                        </div>
                      </div>
                      <span className={styles.DigitalGoldDashboardDuration}>3:35</span>
                    </div>
                    <div className={styles.DigitalGoldDashboardVideoContent}>
                      <p className={styles.DigitalGoldDashboardVideoTitle}>How investing in Digital Gold helps you grow wealth?</p>
                      <div className={styles.DigitalGoldDashboardAuthor}>
                        <div className={styles.DigitalGoldDashboardAvatar}>F</div>
                        <span>Finhaat</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>


          <aside className={styles.DigitalGoldDashboardOrderSidebar}>
            <div className={styles.DigitalGoldDashboardSectionHeader}>
              <h3>Order history</h3>
            </div>

            <div className={styles.DigitalGoldDashboardOrderList}>
              {ordersLoading ? (
                 <DesktopOrderSkeleton count={10} />
              ) : orders.length === 0 ? (
                <div className={styles.DigitalGoldDashboardEmptyState}>
                  No orders found
                </div>
              ) : (
                orders.map((order, idx) => (
                  <div key={idx} className={styles.DigitalGoldDashboardOrderItem}>
                    <div className={styles.DigitalGoldDashboardOrderIconBox}>
                      {order.orderType === "BUY" ? (
                        <ArrowDownLeft size={16} color="#2e7d32" />
                      ) : (
                        <ArrowUpRight size={16} color="#ed6c02" />
                      )}
                    </div>

                    <div className={styles.DigitalGoldDashboardOrderDetails}>
                      <p className={styles.DigitalGoldDashboardOrderType}>
                        {getOrderMeta(order)}
                      </p>
                      <p className={styles.DigitalGoldDashboardOrderMeta}>
                        {formatOrderDate(order.transactionDate)}
                      </p>
                    </div>

                    <div className={styles.DigitalGoldDashboardOrderValue}>
                      <p className={styles.DigitalGoldDashboardAmount}>
                        ₹ {order.amountInRupees.toLocaleString("en-IN")}
                      </p>
                      <p className={styles.DigitalGoldDashboardWeightSub}>
                        {order.goldInGrams} gm
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>

        </main>
      </div>


      <BuyGold
        isOpen={showBuyGoldModal}
        onClose={() => {
          setBuyGoldModal(false);
          refreshAfterTransaction();
        }}
        title="Buy Gold"
        setStatusModal={setStatusModal}
      />

      <SellGold
        isOpen={showSellGoldModal}
        onClose={() => {
          setSellGoldModal(false);
          refreshAfterTransaction();
        }}
        title="Sell Gold"
        setStatusModal={setStatusModal}
      />

      <BuyGoldStatusModal
        isOpen={statusModal.open}
        status={statusModal.type}
        details={statusModal.details}
        onClose={() =>
          setStatusModal({ ...statusModal, open: false })
        }
      />

      <SellGoldStatusModal
        isOpen={statusModalSell.open}
        status={statusModalSell.type}
        details={statusModalSell.details}
        onClose={() =>
          setStatusModal({ ...statusModalSell, open: false })
        }
      />

    </>
  );
};

export default DigitalGold;