import React from 'react';
import Button from '@material-ui/core/Button';
import { useRouter } from "next/router";
import Typography from '@material-ui/core/Typography';

const error = () => {
    const router = useRouter();
    return (
        <div>
            <Typography component="h1" variant="h5">ERRROR CODE</Typography>
            {/* <Button onClick={() => router.push("/login")} locale="fr" variant="contained" color="primary" >Login</Button> */}
        </div>

    )
}
export default error;