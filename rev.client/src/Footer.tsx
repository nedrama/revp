
import { Container, Typography } from "@mui/material";

const FooterComponent = () => {
    return (
        <footer id="footer" role="contentinfo">
            <Container maxWidth="lg">
                <a href="https://www.vecteezy.com/free-vector/logo">Logo Vectors by Vecteezy</a>
                <Typography variant="body2" align="center">
                    © {new Date().getFullYear()} Rev. All rights reserved.
                </Typography>
            </Container>
            </footer>
    );
};

export default FooterComponent;