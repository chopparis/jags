import React, { useState, useEffect } from 'react';
import styles from '../style.module.scss';
import PubSub from 'pubsub-js';

const FilterComponent=(props)=>{

    const [listOpenStatus, setListOpenStatus] = useState(false);
    const [filtersList , setFiltersList] = useState([]);
    const filterRef = React.useRef(null);

    const onHandleListopen =()=>{
        setListOpenStatus(!listOpenStatus);
    }

    const oncheckOutSideClick = (msg, data) => {

        if (data.includes(props.filterType)) {
          //
        }else if(data.includes("_pop")) {
           //
        }else{
            setListOpenStatus(false);
        }
    }
 
    PubSub.subscribe("clickedOutSide", oncheckOutSideClick);


    const onDropDownSelection = (filterObj, ind) => (event) => {
        event.preventDefault();
        let tempList = [...filtersList];
        tempList[ind].isSelected = !tempList[ind].isSelected;
        setFiltersList(tempList);

        if (tempList[ind].isSelected) {
           // tempList[ind].isSelected = !tempList[ind].isSelected;
           // setFiltersList(tempList);
           props.updateFiltersTray(tempList[ind]);
        } else {
            //if filter unselected removing chip from tray

            // let tempArr = [...filtersList];
            let obj = tempList.find(o => o.name == filterObj.name);
            let index = tempList.indexOf(obj);
            tempList[index].isSelected = false;
            setFiltersList(tempList);

            props.deleteFilter(tempList[ind]);
        }
    }

    useEffect(() => {
        setFiltersList(props.filters);
    }, [props.filters]);

    // useEffect(()=>{
    //     console.log(props.resetPopUp , "__-----props.resetPopUp")
    //     setListOpenStatus(false);
    // },[props.resetPopUp])

    return(
        <div ref={filterRef} id={props.filterType + "_Temp"} className={styles.filterCom} onClick={onHandleListopen}><span>{props.title}</span>

        {listOpenStatus ? <div className={styles.filterPanel}>

            {filtersList && filtersList.map((obj, indx) =>
                <div id="strip_pop"  key={indx} className={styles.FilterStrip} onClick={onDropDownSelection(obj, indx)}>
                    <div id="strip_c_pop" className={styles.circle_select}>

                        <div id="strip_c_i_pop" className={`${styles.inner_circle_select} ${obj.isSelected ? styles.inner_circle_select_color : styles.inner_circle_unselect_color}  `}></div>
                    </div>
                    <div id="strip_c_t_pop"><span>{obj.name.replace('_', ' ')}</span></div>
                </div>
            )}


        </div> : ""}
    </div>
    )
}
export default FilterComponent;