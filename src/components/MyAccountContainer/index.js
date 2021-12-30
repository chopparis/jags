
import React, { useState, useEffect } from 'react';
// import myaccountStyles from '../../../styles/Myaccount.module.scss';
import styles from './style.module.scss';
import MyAccountMenu from './MyAccountMenu/';
import MyDetails from './MyDetails/';
import ChangePSW from './ChangePSW/';
import AddNewCard from './AddNewCard/';
import Deposit from './Deposit/';
import Withdraw from './Withdraw/';
import DepositLimit from './DepositLimit/';
import MyBonus from './MyBonus/';
import MyHistory from './MyHistory/';
import MyFiles from './MyFiles/';
import Inbox from './Inbox/';
import OverView from './OverView/'

import { useRouter } from "next/router";


const MyAccountContainer = () => {

    const router = useRouter();

    const [isShowDetails, setDetailsPage] = useState(false);
    const [isShowChangePSW, setChangePassword] = useState(false);
    const [isAddCard, setAddCard] = useState(false);
    const [isDeposit, setDeposit] = useState(false);
    const [isWithDraw, setWithDraw] = useState(false);
    const [isDepositLimit, setDepositLimit] = useState(false);
    const [isMyHistory, setMyhistory] = useState(false);
    const [isMyBonus, setMyBonus] = useState(false);
    const [isMyFiles, setMyFiles] = useState(false);
    const [isInbox, setInox] = useState(false);
    const [isOverView, setOverView] = useState(false);


    const resetAllPages = () => {
        setDetailsPage(false);
        setChangePassword(false);
        setAddCard(false);
        setDeposit(false);
        setWithDraw(false);
        setDepositLimit(false);
        setMyBonus(false);
        setMyFiles(false);
        setMyhistory(false);
        setInox(false);
        setOverView(false);

    }
    useEffect(() => {
        resetAllPages()

        switch (router.query.index[0]) {
            case "overview":
                setOverView(true);
                break;
            case "my-details":
                setDetailsPage(true);
                break;
            case "change-password":
                setChangePassword(true);
                break;
            case "add-card":
                setAddCard(true);
                break;
            case "deposit":
                setDeposit(true);
                break;
            case "withdraw":
                setWithDraw(true);
                break;
            case "deposit-limit":
                setDepositLimit(true);
                break;
            case "my-bonus":
                setMyBonus(true);
                break;
            case "my-history":
                setMyhistory(true);
                break;
            case "my-files":
                setMyFiles(true);
                break;
            case "inbox":
                setInox(true);
                break;
            default:
                setOverView(true);
        }


    }, [router]);




    return (
        <div className={styles.myAcctContainer}>
            <div></div>
            <MyAccountMenu></MyAccountMenu>
            {isShowDetails ? <MyDetails></MyDetails> : ""}
            {isShowChangePSW ? <ChangePSW></ChangePSW> : ""}
            {isAddCard ? <AddNewCard></AddNewCard> : ""}
            {isDeposit ? <Deposit></Deposit> : ""}
            {isDeposit ? <Deposit></Deposit> : ""}
            {isWithDraw ? <Withdraw></Withdraw> : ""}
            {isDepositLimit ? <DepositLimit></DepositLimit> : ""}
            {isMyBonus ? <MyBonus></MyBonus> : ""}
            {isMyHistory ? <MyHistory></MyHistory> : ""}
            {isMyFiles ? <MyFiles></MyFiles> : ""}
            {isInbox ? <Inbox></Inbox> : ""}
            {isOverView ? <OverView></OverView> : ""}

        </div>
    )
}

export default MyAccountContainer;