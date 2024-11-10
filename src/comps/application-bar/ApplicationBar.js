import { AppBar,Toolbar } from "@mui/material"
import {HorrizontalLogo} from '../logo/logo'

const ApplicationBar = () => {
    console.log('Rendering ApplicationBar');
    return (
        <>
            <AppBar position="sticky" >
                <Toolbar className="bg-custom-c1 border-custom-c3 shadow-lg shadow-custom-c3">
                    <HorrizontalLogo />
                </Toolbar>
            </AppBar>
        </>
    )

}

export default ApplicationBar;