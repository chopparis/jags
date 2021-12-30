import LocationOffIcon from '@material-ui/icons/LocationOff';
import styles from './style.module.scss';
const BlocakedCountry =()=>{
    return(
        <div className={styles.bcWrapper}><LocationOffIcon fontSize="inherit"/><h2>Unfortunately</h2><span>Unavailable in your location.</span><br /> <span>For more information, you can also contact our customer service by sending an email to support@website.com</span></div>
    )
}
export default BlocakedCountry;