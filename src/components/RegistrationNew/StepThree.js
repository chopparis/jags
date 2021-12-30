import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import styles from './style.module.scss';
import useTranslation from 'next-translate/useTranslation';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber, isPossiblePhoneNumber } from 'react-phone-number-input'

const StepThree = (props) => {
    const { t, lang } = useTranslation('common');
    const allowNumbersOnly = (keyVal) => {
        //console.log(keyVal , "__keyVal---")
        if (keyVal >= 48 && keyVal <= 57) {
            return true
        }
    }


    const [city, setCity] = useState("");
    const [adressOne, setAdressesOne] = useState("");
    const [adressTwo, setAdressesTwo] = useState("");
    const [selectedCountry, setCountrySelection] = useState("");
    // const [country, setCountry] = useState([{ value: "india", lable: "india" }, { value: "USA", lable: "USA" }, { value: "UK", lable: "UK" }]);

    const [zipCode, setZipCode] = useState("");
    const [phoneNum, setPhoneNumber] = useState("")
    const [cCode , setcCode] = useState("");

    const [phoneNumError, setPhoneNumberError] = useState({ error: "", valid: false });
    const [countryError, setCountryError] = useState({ error: "", valid: false });

    const countyError = t("select_country");
    const pError = t("phone_requred");


    const oncityUpdate = (e) => {
        setCity(e.target.value)
    }

    const onAdreesesOneUpdate = (e) => {
        setAdressesOne(e.target.value)
    }
    const onAdreesesTwoUpdate = (e) => {
        setAdressesTwo(e.target.value)
    }

    const oncityZipCode = (e) => {
        setZipCode(e.target.value)
    }


    const onCountrySelection = (e) => {
        //console.log(e.target.value , "___e.target.value")
        
        setCountrySelection(e.target.value)

        
    }
    const onPhoneNUmber = (e) => {
            setPhoneNumber(e.target.value)
    }

    useEffect(() => {
        if (phoneNum.length >0 && selectedCountry == "") {
            setCountryError({ error: countyError, valid: false });
        }

        if (phoneNum.length >0 && selectedCountry != "") {
            if (isValidPhoneNumber(cCode +phoneNum)) {
                setPhoneNumberError({ error: "", valid: true })
            }else{
                setPhoneNumberError({ error: pError, valid: false })
            }
        }
        
        if(selectedCountry != ""){
            let ph = props.cList && props.cList.filter(obj => obj['value'].includes(selectedCountry));
            setcCode(ph[0].phoneCode)
            setCountryError({ error: "", valid: true });
        }

    }, [phoneNum, selectedCountry]);

    const onPrevious = () => {
        props.updatePageStatus({}, 2 , "")
    }
    const onSubmit = () => {
        //  props.updatePageStatus({},3)
        if (phoneNum.length > 0 ) {
            if(phoneNumError.valid && countryError.valid){
               // let ph = props.cList && props.cList.filter(obj => obj['value'].includes(selectedCountry));
               

                let obj = {
                    adressOne: adressOne ? adressOne : null,
                    adressTwo: adressTwo ? adressTwo : null,
                    address:adressOne + "," + adressTwo,
                    city: city ? city : null,
                    country: selectedCountry ? selectedCountry : null,
                    postal_code: zipCode ? zipCode : null,
                    phone: "(" + cCode + ")" + phoneNum.replace(/\s/g,'')
                }
                //console.log(obj , "<<-----------");
                props.updatePageStatus(obj, 3 , "final")
            }
            
        }else{
            let obj = {
                adressOne: adressOne ? adressOne : null,
                adressTwo: adressTwo ? adressTwo : null,
                city: city ? city : null,
                country: selectedCountry ?selectedCountry : null,
                zipCode: zipCode ? zipCode : null,
                phoneNum: phoneNum ? phoneNum.replace(/\s/g,'') : null
            }
            props.updatePageStatus(obj, 3 , "final")
        }
    }
    return (
        <div>


            {/* <Container component="main" maxWidth="sm"> */}
                <div className={styles.stepOnrHolder}>
                <div className={styles.itemsHolder}>
                    <textarea placeholder={t("adrs_1")} name="adressesOne" rows="5" cols="50" style={{ resize: "none" }} value={adressOne} onChange={onAdreesesOneUpdate}></textarea><br />
                    <textarea placeholder={t("adrs_2")} name="adressTwo" rows="5" cols="50" style={{ resize: "none" }} value={adressTwo} onChange={onAdreesesTwoUpdate}></textarea>
                    <input placeholder={t("city_name")} type="text" value={city} onChange={oncityUpdate} />

                    <div>  <span>{countryError.error}</span>
                        {/* {console.log(props.cList)} */}
                        <select value={selectedCountry} onChange={onCountrySelection}>
                            {props.cList && props.cList.map((item, i) => {
                                return (<option key={i} value={item.value}>{item.label + ( item.phoneCode ? " ( " + item.phoneCode + " )" : "" ) }</option>);
                            })}
                        </select>
                        {/* <span>{nationaityError.error}</span>  */}
                    </div>

                    <input placeholder={t("zip_code")} type="text" value={zipCode} onChange={oncityZipCode} />
                    <span>{phoneNumError.error}</span><input
                        onKeyPress={(data) => {
                            if (!allowNumbersOnly(data.charCode)) {
                                data.preventDefault();
                                return false;
                            }

                        }}
                        placeholder={t("phone")} type="tel" maxLength="15" type="text" id="phone" name="phone" value={phoneNum} onChange={onPhoneNUmber} />
                        <div style={{opacity:"0"}} className={styles.checkBoxH}><input type="checkbox" ></input></div>
                    <div className={styles.previousH}><button onClick={onPrevious}>{t("previous")}</button> <button onClick={onSubmit}>{t("submit")}</button></div>
                </div>

            {/* </Container> */}

</div>

        </div>
    )
}
export default StepThree;