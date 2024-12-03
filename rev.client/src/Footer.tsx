
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledFooter = styled(Box)(() => ({
    backgroundColor: "#1a237e",
    color: "#ffffff",
    padding: "16px 0",
    position: "fixed",
    bottom: 0,
    width: "100%",
    zIndex: 1000
}));

const FooterComponent = () => {
    return (
        <StyledFooter className="footer" role="contentinfo">
            <Container maxWidth="lg">
                <Typography variant="body2" align="center">
                    © {new Date().getFullYear()} Rev. All rights reserved.
                </Typography>
            </Container>
        </StyledFooter>
    );
};

export default FooterComponent;