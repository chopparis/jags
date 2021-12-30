import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useTheme } from 'next-themes';

const PurpleSwitch = withStyles({
  switchBase: {
    color: '#00B9FF',
    '&$checked': {
      color: '#00B9FF',
    },
    '&$checked + $track': {
      backgroundColor: '#CCCCFF',
    },
  },
  checked: {},
  track: {},
})(Switch);

const BlueSwitch = withStyles({
  switchBase: {
    color: '#C368FF',
    '&$checked': {
      color: '#C368FF',
    },
    '&$checked + $track': {
      backgroundColor: '#CCCCFF',
    },
  },
  checked: {},
  track: {},
})(Switch);


export default function CustomizedSwitches(props) {

  const { theme, setTheme } = useTheme()

  const [state, setState] = React.useState({
    checkedA: true
  });

  const handleChange = (event) => {
    props.customMethod();
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup>
      {/* {console.log(theme , "--theme from switcher")} */}

      {theme == "pink" ?
        <FormControlLabel
          control={<PurpleSwitch  color="primary" checked={state.checkedA} onChange={handleChange} name="checkedA" />}
        /> :
        <FormControlLabel
          control={<BlueSwitch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
        />
      }

    </FormGroup>
  );
}
