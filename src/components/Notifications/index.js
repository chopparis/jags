import React from 'react';
import styles from './style.module.scss';

const Notifications = () => {
    
    return (
        <div className={styles.notificationWrap}>
            <div className={styles.notifHeader}></div>
            <div className={styles.notifLogo}> <img src="images/logo.svg"></img> </div>
        </div>
    )
}

export default Notifications;



{/* <div className={styles.notifLogo} > <img src="images/logo.svg"> </div>

<div className={styles.close} ><i aria-hidden="true"></i></div>
<h4>Notifications</h4>
<div >You have <span className={styles.status}>2 unread</span>notification. </div>
</div>
<ul className={styles.notifBody}>
<li className={styles.unread}>
    <div className={styles.title}>
        <dt>Subject</dt>
        <dd>Notification.</dd>
    </div>
    <div className={styles.arrow} ><i  aria-hidden="true"></i></div>
    <div  className={styles.description} >Lorem ipsum dolor sit amet,
        consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
</li>


</ul>
<div className={styles.notifFooter}>
<div className={styles.btn}>Load More</div>
</div> */}