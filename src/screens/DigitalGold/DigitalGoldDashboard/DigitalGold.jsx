import React from 'react';
import { MoveLeft, Calendar, Coins, Play, CircleStar, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import styles from './DigitalGold.module.css';
import Navbar from '../../../components/Navbar/Navbar';

const DigitalGold = () => {
  const orders = [
    { type: 'Bought', rate: '7500/gm', tag: 'SIP', date: '10/01/2024', amount: '₹ 1,36,720', weight: '20 gm gold', status: 'success' },
    { type: 'Sold', rate: '7456/gm', tag: '', date: '10/01/2024', amount: '₹ 1,709', weight: '0.250 gm gold', status: 'pending' },
    { type: 'Bought', rate: '7500/gm', tag: 'SIP', date: '20/01/2024', amount: '₹ 3,418', weight: '0.5 gm gold', status: 'success' },
  ];

  return (
    <>
      <Navbar />

      <div className={styles.DigitalGoldDashboardContainer}>
        {/* Header */}
        <header className={styles.DigitalGoldDashboardHeader}>
          <div className={styles.DigitalGoldDashboardTitleGroup}>
            <MoveLeft size={18} className={styles.DigitalGoldDashboardBackIcon} />
            <h2 className={styles.DigitalGoldDashboardMainTitle}>Digital gold</h2>
          </div>
          <div className={styles.DigitalGoldDashboardLivePriceBadge}>
            <div className={styles.DigitalGoldDashboardLiveIndicator}>
              <span className={styles.DigitalGoldDashboardPulseDot}></span>
              <span className={styles.DigitalGoldDashboardLiveText}>Live Price:</span>
            </div>
            <span className={styles.DigitalGoldDashboardPriceValue}>₹ 7,427.94/gm</span>
          </div>
        </header>

        <main className={styles.DigitalGoldDashboardMain}>
          <div className={styles.DigitalGoldDashboardContentLeft}>

            {/* Savings Card */}
            <section className={styles.DigitalGoldDashboardSavingsCard}>
              <div className={styles.DigitalGoldDashboardSavingsTop}>
                <div className={styles.DigitalGoldDashboardSavingsText}>
                  <p className={styles.DigitalGoldDashboardLabel}>Your savings</p>
                  <h1 className={styles.DigitalGoldDashboardBalance}>₹ 1,55,410</h1>
                  <p className={styles.DigitalGoldDashboardWeight}>22.46 grams</p>
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
                  <button className={styles.DigitalGoldDashboardBtnWithdraw}>Withdraw</button>
                  <button className={styles.DigitalGoldDashboardBtnBuy}>Buy More</button>
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

          {/* Sidebar Order History - Fully Styled */}
          <aside className={styles.DigitalGoldDashboardOrderSidebar}>
            <div className={styles.DigitalGoldDashboardSectionHeader}>
              <h3>Order history</h3>
              <a href="#" className={styles.DigitalGoldDashboardLink}>View all</a>
            </div>
            <div className={styles.DigitalGoldDashboardOrderList}>
              {orders.map((order, idx) => (
                <div key={idx} className={styles.DigitalGoldDashboardOrderItem}>
                  <div className={styles.DigitalGoldDashboardOrderIconBox}>
                    {order.status === 'success' ?
                      <CheckCircle2 size={16} color="#2e7d32" /> :
                      <Clock size={16} color="#ed6c02" />
                    }
                  </div>
                  <div className={styles.DigitalGoldDashboardOrderDetails}>
                    <p className={styles.DigitalGoldDashboardOrderType}>
                      {order.type} | {order.rate} {order.tag && `| ${order.tag}`}
                    </p>
                    <p className={styles.DigitalGoldDashboardOrderMeta}>{order.date}</p>
                  </div>
                  <div className={styles.DigitalGoldDashboardOrderValue}>
                    <p className={styles.DigitalGoldDashboardAmount}>{order.amount}</p>
                    <p className={styles.DigitalGoldDashboardWeightSub}>{order.weight}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </main>
      </div>

    </>
  );
};

export default DigitalGold;