import * as React from "react";
import {
  Box,
  Grid,
  Link,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import { GitHub, Instagram, LinkedIn } from "@mui/icons-material";
import AdbIcon from "@mui/icons-material/Adb";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { ReduxStates } from "@/types/auth";

const socialMediaLinks = {
  github: "https://www.github.com/malikozturkk",
  linkedin: "https://www.linkedin.com/in/malikozturk/",
  instagram: "https://www.instagram.com/malikozturkk/",
};

const Footer: React.FC = () => {
  const { user, userName } = useSelector((state: ReduxStates) => state.auth);
  return (
    <Box
      sx={{
        py: 3,
      }}
      className="bg-mui-blue text-white"
    >
      <Container maxWidth={false}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={2}>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SETSIS
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              KATEGORİLER
            </Typography>
            <Link href="#" color="inherit" display="block">
              Kategori 1
            </Link>
            <Link href="#" color="inherit" display="block">
              Kategori 2
            </Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              ÜRÜNLER
            </Typography>
            <Link href="#" color="inherit" display="block">
              About Us
            </Link>
          </Grid>
          <Grid item xs={6} sm={3} md={3}>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              ÜYELİK İŞLEMLERİ
            </Typography>
            {user ? (
              <div className="flex items-center gap-2">
                <IconButton className="p-0">
                  <Avatar alt={userName} src="/static/images/avatar/2.jpg" />
                </IconButton>
                {userName.toLowerCase()}
              </div>
            ) : (
              <>
                <Link href="/login" color="inherit" display="block">
                  GİRİŞ YAP
                </Link>
                <Link href="/register" color="inherit" display="block">
                  ÜYE OL
                </Link>
              </>
            )}
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              SOSYAL MEDYA
            </Typography>
            <IconButton
              aria-label="GitHub"
              color="inherit"
              component="a"
              target="_blank"
              href={socialMediaLinks.github}
            >
              <GitHub />
            </IconButton>
            <IconButton
              aria-label="Linkedin"
              color="inherit"
              component="a"
              target="_blank"
              href={socialMediaLinks.linkedin}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              aria-label="Instagram"
              color="inherit"
              component="a"
              target="_blank"
              href={socialMediaLinks.instagram}
            >
              <Instagram />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ pt: 4 }}>
          © 2024 Company Co. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
