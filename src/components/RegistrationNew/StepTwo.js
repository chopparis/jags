import React, { useState, useEffect } from 'react';
import * as moment from "moment";
import styles from './style.module.scss';
import useTranslation from 'next-translate/useTranslation';

const StepTwo = (props) => {
    const { t, lang } = useTranslation('common');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [Fgender, setFGender] = useState(false);
    const [Mgender, setMGender] = useState(false);

    const [dob, setDOB] = useState("");
   // const [nationaity, setNationaity] = useState([{ value: "india", lable: "india" }, { value: "USA", lable: "USA" }, { value: "UK", lable: "UK" }]);
   // const [currency, setCurrency] = useState([{ value: "india", lable: "INR" }, { value: "USA", lable: "DOLLER" }, { value: "UK", lable: "DHNAR" }]);

    const [selectedNation, setNation] = useState("");
   // const [selectedCurrency, onSelectedCurrency] = useState("");


    const [dobError, setDobError] = useState({ error: "", valid: false });
    const [currencyError, setCurrencyError] = useState({ error: "", valid: false });

    const countrError = t("currency_select_required");
    const dobSError = t("dob_error");
    const dobInfo = t("dob_required");

    const verifyKey = (key) =>{
        if( ( key >= 97 && key <=122 ) || ( key >= 65 && key <=90 ) || key == 32 || key == 45){
            return true;
        }else{
            return false;
        }
    }

 
    const validateCurrency = () => {
        if (selectedNation == "" || selectedNation.includes("none")) {
            setCurrencyError({ error: countrError, valid: false })
        } else {
            setCurrencyError({ error: "", valid: true })
        }
    }

    const onFirstName = (e) => {
        setFirstName(e.target.value)
    }
    const onLast = (e) => {
        setLastName(e.target.value)
    }
    const setgendervalF = () => {
        setFGender(true)
        setMGender(false)
    }
    const setgendervalM = () => {
        setMGender(true)
        setFGender(false)
    }

    const onDOBSelection = (e) => {
        setDOB(e.target.value);
    }

    const validateDOB = () => {
        if (dob == "") {
            setDobError({ error: dobInfo, valid: false })
            return;
        }

        if( moment().diff(moment(dob),'days') >= 6570){
            setDobError({ error: "", valid: true })
        }else{
            setDobError({ error: dobSError, valid: false })
        }
    }


    const onNationalityChange = (e) => {
        let temp = props.cList && props.cList.filter(obj => obj['country'].includes(e.target.value));
  
        if(temp[0].value == "none"){
            setNation("none")
        }else{
            setNation(e.target.value)
        }
       
    }

    const getGender =()=>{
        if(Mgender == false && Fgender == false){
            return null
        }else if(Mgender == true){
            return "male"
        }else if(Fgender == true){
            return "female"
        }else{
            return null        }
    }

    const onPrevious =()=>{
        props.updatePageStatus({},1,"")
    }
    const onSubmit = () => {
       
        validateDOB();
        validateCurrency();

        if (dobError.valid && currencyError.valid) {

           let currencyCjeck =  props.cList && props.cList.filter(obj => obj['country'].includes(selectedNation));

            let obj = {
                first_name: firstName ? firstName : null,
                last_name: lastName ? lastName : null,
                gender:getGender(),
                dob: dob,
                nationality: selectedNation,
                currency: currencyCjeck[0].value
            }

           props.updatePageStatus(obj,3,"")
        }


    }

    useEffect(() => {
        validateDOB();
        validateCurrency();
    }, [dob,selectedNation]);

    return (
        <div>


            {/* <Container component="main" maxWidth="sm"> */}
                <div className={styles.stepOnrHolder}>
                <div className={styles.itemsHolder}>

                    <input onKeyPress={(data) => {

                      //  if (data.charCode === 32) {
                          if(!verifyKey(data.charCode)){
                          //  console.log("Space touched")
                            data.preventDefault();
                            return false;
                        }
                    }} placeholder={t("first_name")} type="text" value={firstName} onChange={onFirstName} />

                    <input onKeyPress={(data) => {

                       // if (data.charCode === 32) {
                        if(!verifyKey(data.charCode)){
                           // console.log("Space touched")
                            data.preventDefault();
                            return false;
                        }
                    }} placeholder={t("last_name")} type="text" value={lastName} onChange={onLast} />

                    <div>

                        <div className={styles.radioGrp}><label>{t("male") + ""}</label><input type="radio" checked={Mgender} onChange={setgendervalM} />
                            <label>{t("female") + ""} </label> <input type="radio" checked={Fgender} onChange={setgendervalF} /></div>

                        <label>{t("dob") + " " }</label><span>{dobError.error} <input type="date" value={dob} onChange={onDOBSelection} /></span>


                        <div>  <label>{t("nationality") + ""}</label>
                        {/* {console.log(props.cShip , "__________>" , props.cList)} */}
                            <select value={selectedNation} onChange={onNationalityChange}>
                                {props.cList && props.cList.map(item => {
                                    return (<option key={item.country} value={item.country}>{item.country}</option>);
                                })}
                            </select>
                            {/* <span>{nationaityError.error}</span>  */}
                        </div>

                        <div>  <label>{t("currency") + " "} </label><span>{currencyError.error}</span> 
                            <select value={selectedNation} onChange={onNationalityChange}>
                                {props.cList && props.cList.map(item => {
                                    return (<option key={item.label} value={item.country}>{item.label}</option>);
                                })}
                            </select>
                            </div>

                            <div style={{opacity:"0"}} className={styles.checkBoxH}><input type="checkbox" ></input></div>

                        <div className={styles.previousH}><button onClick={onPrevious}>{t("previous")}</button><button onClick={onSubmit}>{t("continue")}</button></div>

                    </div></div>
                </div>
            {/* </Container> */}



        </div>
    )
}
export default StepTwo;