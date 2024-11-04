import { Typography, Grid2 } from "@mui/material";

const Footer = () => {

    return (
        <Grid2 container sx={{ justifyContent: 'center', textAlign: 'center', }}>
            <Grid2 size={{ xs: 8 }}>
                <Typography variant="subtitle2" sx={{mt: 3, color: 'primary.dark'}}>
                    Copyright &copy; SM 2024
                </Typography>
            </Grid2>
        </Grid2>
    )
};

export default Footer;