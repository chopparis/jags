import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffSharpIcon from '@material-ui/icons/VisibilityOffSharp';
import styles from './style.module.scss';
import DropDown from '../widgets/DropDown/';

import useTranslation from 'next-translate/useTranslation';
const StepOne = (props) => {
    const { t, lang } = useTranslation('common');

    const restrictedKeyList = [32, 33, 34, 35, 36, 37, 38, 40, 41, 42, 43, 58, 60, 62, 63, 64, 94, 123, 125, 126];

    const getAllowStatus = (data) => {
        var x = data.which || data.keyCode;
        // console.log(x , "+++data")
        //userFous = "username"
        return restrictedKeyList.includes(x);
    }

    const [isShow, setShowPassWord] = useState("");
    const [isShowCpsw, setShowCPassWord] = useState("");


    const [userName, setUserName] = useState("");
    const [email, setEmal] = useState("");
    const [passWord, setPassWord] = useState("");
    const [cpassword, setcPassWord] = useState("");
    const [secureQ, setSecureQ] = useState("");
    const [answer, setAnswer] = useState("");
    const [isCheck, setCheckbox] = useState(false)

    //const [sqList, setSQList] = useState([{ value: "india", lable: "india" }, { value: "USA", lable: "USA" }, { value: "UK", lable: "UK" }]);


    const [userNameError, setUserNameError] = useState({ error: "", valid: false });
    const [emailError, setEmalError] = useState({ error: "", valid: false });
    const [passWordError, setPassWordError] = useState({ error: "", valid: false });
    const [cpasswordError, setcPassWordError] = useState({ error: "", valid: false });
    const [secureQError, setSecureQError] = useState({ error: "", valid: false });
    const [isCheckError, setCheckboxError] = useState({ error: "", valid: false });
    const [seqAnswerError, setSeqAnswerError] = useState({ error: "", valid: false });

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const userNameRequired = t("username_required");
    const userNError = t("username_length_errror"); 
    const uExistError = t("username_exist");

    const eRequired = t("email_required");
    const eValidError = t("email_error");
    const eExistError = t("email_exist");

    const pswRequired = t("psw_required");
    const pswError = t("psw_contain_error");
    const pswStrengthError = t("psw_error");

    const cpswRequired = t("confirm_psw_required"); 
    const cpswError = t("confirm_psw_error"); 

    const sqError = "";
    const sAnsError = t("answer_required"); 
    const checkError = t("agree"); 



    useEffect(() => {
        validateCheckbox();
    }, [isCheck, secureQ, passWord]);


    useEffect(() => {
        if (email.length > 0) {
            setTimeout(() => {
                checkEmailValidation();
            }, 1000)

        }

    }, [email]);

    useEffect(() => {
        if (userName.length > 0) {
            setTimeout(() => {
                onUserNameValidation();
            }, 1000)
        }
    }, [userName]);


    useEffect(() => {
        if (passWord.length > 0) {
            setTimeout(() => {
                validatePassWord();
                validateConfirmPassWord()
            }, 500)
        }
    }, [passWord]);

    useEffect(() => {
        if (cpassword.length > 0) {
            setTimeout(() => {
                validateConfirmPassWord();
            }, 500)
        }
    }, [cpassword]);

    useEffect(() => {
        if (answer.length > 0) {
            setTimeout(() => {
                validateSqAnswer();
            }, 500)
        }
    }, [answer]);

    const onUsername = (e) => {
        setUserName(e.target.value);
        if (e.target.value.length <= 6 || e.target.value.length >= 13) {
            setUserNameError({ error: userNError, valid: false });
        } else if (e.target.value.length <= 0) {
            setUserNameError({ error: userNameRequired, valid: false });
        } else {
            setUserNameError({ error: "", valid: false });
        }
    }

    const onUsernameBlur = (e) => {
        onUserNameValidation();
    }

    const onUserNameValidation = () => {
        if (userName.length <= 0) {
            setUserNameError({ error: userNameRequired, valid: false });
            return;
        }
        if (userName && (userName.length >= 6 && userName.length <= 13)) {

            userNameValidationApi(userName).then(function (isExist) {
                if (isExist) {
                    setUserNameError({ error: uExistError, valid: false });
                } else {
                    setUserNameError({ error: "", valid: true });
                }
            });


        } else {
            setUserNameError({ error: userNError, valid: false });
        }
    }

    async function emailValidationApi(value) {
        //  var timer = null;
        if (validateEmail(value)) {
            //if(previous_email !=value){

            // let obj = { "jsonrpc": "2.0", "id": 0, method: "is_account_available", params: { "email": value, "site_code": process.env.NEXT_PUBLIC_SITE_CODE, } }
            let obj = {params: { "email": value, "site_code": process.env.NEXT_PUBLIC_SITE_CODE, } }
            const res = await fetch(`/api/isUser`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                // "access-control-allow-origin" : "*",
                body: JSON.stringify(obj)
            })

            if(res.status == 500){
                return false;
            }
            const apidata = await res.json()

            return apidata.result


            // }

        }

    }

    const onEmail = (e) => {
        setEmal(e.target.value);
    }
    const onEmailBlur = () => {
        checkEmailValidation();
    }


    const onPassWord = (e) => {
        setPassWord(e.target.value);
    }
    const onPassWordBlur = (e) => {
        validatePassWord();
        validateConfirmPassWord()
    }

    const checkEmailValidation = () => {
        if (email.length <= 0) {
            setEmalError({ error: eRequired, valid: false });
            return;
        }

        // console.log(!validateEmail(email) , "____________EEE")
        if (!validateEmail(email)) {
            setEmalError({ error: eValidError, valid: false })
        } else {
            // setEmalError({error:"",valid:true})
            emailValidationApi(email).then(function (isExist) {
                if (isExist) {
                    setEmalError({ error: eExistError, valid: false })
                } else {
                    setEmalError({ error: "", valid: true });
                }
            });

        }

    }

    const validatePassWord = () => {

        if (passWord.length <= 1) {
            setPassWordError({ error: pswRequired, valid: false });
            return;
        }

        if (passWord.length >= 8) {
            if (email.includes(passWord) || userName.includes(passWord)) {
                setPassWordError({ error: pswError, valid: false })
            } else {
                setPassWordError({ error: "", valid: true })
            }
        } else {
            setPassWordError({ error: pswStrengthError, valid: false });
        }

    }

    const validateConfirmPassWord = () => {
        if (cpassword.length <= 1) {
            setcPassWordError({ error: cpswRequired, valid: false });
            return;
        }
        if (cpassword != passWord) {
            setcPassWordError({ error: cpswError, valid: false })
        } else {
            setcPassWordError({ error: "", valid: true })
        }
    }

    const onConfirmPassWord = (e) => {
        setcPassWord(e.target.value);
    }
    const onCPassWordBlur = () => { validateConfirmPassWord(); }

    const onPswEyeClick = () => {
        //  console.log(isShow , "__sdsdd_")
        setShowPassWord(!isShow)
    }

    const onCPswEyeClick = () => {
        setShowCPassWord(!isShowCpsw)
    }

    const onSubmit = async () => {

        onUserNameValidation();
        checkEmailValidation();
        validatePassWord();
        validateConfirmPassWord();
        validateCheckbox();
        validateSecureQ();
        validateSqAnswer();
        if (userNameError.valid && emailError.valid && passWordError.valid && cpasswordError.valid && isCheckError.valid && seqAnswerError.valid) {
            let obj = {
                username: userName,
                email: email,
                password: passWord,
                //  cpsw: cpassword,
                security_question: secureQ,
                security_answer: answer,
                checked: true
            }
            props.updatePageStatus(obj, 2, "")
            //  console.log(obj, "_____--userNuserNuserN");
        }

    }


    async function userNameValidationApi(value, t) {
        // globalUseName = value;

        if (value && (value.length >= 6 && value.length <= 13)) {
            //console.log(userFous , "__________CCC______" , value)

            //  if(previous_userVal !=value){
            // console.log(value, "--usernmae")
            // if(userFous == "username"){
            // let sendObj = {
            //     "jsonrpc": "2.0",
            //     "id": 0,
            //     method: "is_account_available",
            //     params: {
            //         "username": value,
            //         "site_code": process.env.NEXT_PUBLIC_SITE_CODE,
            //     }
            // }

            let obj = {
                params: {
                    "username": value,
                    "site_code": process.env.NEXT_PUBLIC_SITE_CODE,
                }
            }

            const res = await fetch(`/api/isUser`,
                {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(obj)
                })
            const apidata = await res.json();
            // previous_userVal = value;
            return apidata.result
            // }



            //}


        }
    }

    const onSelectChange = (event) => {
        // console.log(event.target.value, "__event.target.value")
        setSecureQ(event.target.value);

    }
    const validateSecureQ = () => {
        if (secureQ != "") {
            setSecureQError({ error: "", valid: true })
        } else {
            setSecureQError({ error: sqError, valid: true })
        }
    }

    const onCheckBoxSelection = () => {
        setCheckbox(!isCheck);

    }
    const validateCheckbox = () => {
        if (isCheck) {
            setCheckboxError({ error: checkError, valid: true })
        } else {
            setCheckboxError({ error: checkError, valid: false })
        }
    }

    const onAnswer = (e) => {
        setAnswer(e.target.value);
        //  validateSqAnswer();
    }

    const validateSqAnswer = () => {
        if (answer == "") {
            setSeqAnswerError({ error: sAnsError, valid: false })
        } else {
            setSeqAnswerError({ error: "", valid: true })
        }

    }

    const getStatusGlipiCon = () => {

        // if (emailError.error.length > 0) {
        //     return < HighlightOffIcon className={styles.tickError} />

        // } else if (emailError.error.length == 0 && emailError.valid) {
        //     return < CheckCircleOutlineIcon className={styles.tickSucss} />
        // }else{
        //     return "";
        // }

    }
    return (
        <div>


            {/* <Container component="main" maxWidth="lg"> */}
            <div className={styles.stepOnrHolder}>
                <div className={styles.itemsHolder}>
                    <div className={styles.promotionWindow}>

                        <Image
                            src={"/images/" + process.env.NEXT_PUBLIC_SITE_CODE + "/"+ "welcomebonus.jpg" + "?v=" + props.versionNum}
                            alt={"welcomebonus"}
                            quality={100}
                            layout="fill"
                        //objectFit="cover"
                        // objectFit="contain"
                        />
                    </div>

                    <span>{userNameError.error} <input onKeyPress={(data) => {
                        if (getAllowStatus(data)) {
                            data.preventDefault();
                            return false;
                        }
                    }} placeholder={"*" + t("user_name")} maxLength="15" type="text" value={userName} onChange={onUsername} onBlur={onUsernameBlur} /></span>
                    <span>{emailError.error} <div><input onKeyPress={(data) => {

                        if (data.charCode === 32) {
                            // console.log("Space touched")
                            data.preventDefault();
                            return false;
                        }
                    }} placeholder={"*" + t("email")} type="email" pattern=".+@globex\.com" required value={email} onChange={onEmail} onBlur={onEmailBlur} /> {getStatusGlipiCon()}  </div></span>

                    <div className={styles.pswHolder}>
                        <span>{passWordError.error}    </span> <div>

                            <input onKeyPress={(data) => {
// console.log(data.charCode , "_______-ata.charCode")
                                if (data.charCode === 32 || data.charCode == 46 || data.charCode == 47 || data.charCode == 124) {
                                    //    console.log("Space touched")
                                    data.preventDefault();
                                    return false;
                                }
                            }} placeholder={"*" + t("pass_word")} minLength="6" maxLength="32" type={isShow ? "text" : "password"} value={passWord} onChange={onPassWord} onBlur={onPassWordBlur} />     <span className={styles.eyeIcon} onClick={onPswEyeClick}>{isShow ? <VisibilityIcon /> : <VisibilityOffSharpIcon />}</span>  </div>
                    </div>

                    <div className={styles.pswHolder}>
                        <span>{cpasswordError.error} </span><div><input onKeyPress={(data) => {

                        if (data.charCode === 32 || data.charCode == 46 || data.charCode == 47 || data.charCode == 124) {
                                //    console.log("Space touched")
                                data.preventDefault();
                                return false;
                            }
                        }} placeholder={"*" + t("confirm_psw")} minLength="6" maxLength="32" type={isShowCpsw ? "text" : "password"} value={cpassword} onChange={onConfirmPassWord} onBlur={onCPassWordBlur} /><span className={styles.eyeIcon} onClick={onCPswEyeClick}>{isShowCpsw ? <VisibilityIcon /> : <VisibilityOffSharpIcon />}</span></div></div>

                    <span> <span>{secureQError.error}</span>

                        {/* <select value={selectedNation} onChange={onNationalityChange}>
                                {nationaity.map(item => {
                                    return (<option key={item.value} value={item.value}>{item.lable}</option>);
                                })}
                            </select> */}
                             {/* <DropDown questionsLit={props.qList}/> */}

                             <div className={styles.dropDownWraper}> <select className={styles.minimal} value={secureQ} onChange={onSelectChange}>
                            {/* {console.log(props.qList , "______________",sqList)} */}
                            {props.qList && props.qList.map((item, i) => {
                                return (<option key={i} value={item.value}>{item.label}</option>);
                            })}
                        </select>  </div> </span>

                    <span>{seqAnswerError.error} <input placeholder={"*" + t("secu_answer")} value={answer} onChange={onAnswer}></input></span>
                    <div className={styles.checkBoxH}><input type="checkbox" checked={isCheck} onChange={onCheckBoxSelection}></input><span className={isCheck ? styles.checkBColor : styles.checkerrorColor}>{isCheckError.error} </span></div>


                    <button type="button" onClick={onSubmit}>{t("continue")}</button></div>

            </div>
            {/* </Container> */}



        </div>
    )
}
export default StepOne;