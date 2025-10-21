/**
 * Header component with language switcher
 */

import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t('common.appName', 'Social Support Portal')}
        </Typography>
        <Box>
          <IconButton
            color="inherit"
            onClick={toggleLanguage}
            aria-label="Toggle language"
          >
            <LanguageIcon />
          </IconButton>
          <Typography variant="caption" sx={{ ml: 1 }}>
            {i18n.language === 'en' ? 'العربية' : 'English'}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
