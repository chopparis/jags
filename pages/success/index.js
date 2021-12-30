import React from 'react';
import Button from '@material-ui/core/Button';
import { useRouter } from "next/router";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
const success = () => {
    const router = useRouter();
    let queryParam = "";
    let infoObj = {
        "se":"Internal server error , Server need to restart",
        "r":"Registration has been completed",
        "f":"Verification email has been sent to your email",
        "rp":"Your password has been reset , Click login to continue"
    }

    if(router.query && router.query.s !=undefined){
        queryParam = router.query.s;
	//	console.log( queryParam , "____FROM SUCC__- router.query.id")
	}

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Typography component="h1"  variant="h6">{infoObj[queryParam]}</Typography>
            <Button onClick={() => router.push("/login")} locale="fr" variant="contained" color="primary" >Login</Button>
        </Container>

    )
}
export default success;