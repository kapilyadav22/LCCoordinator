
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MediumIcon from '@mui/icons-material/Book';
import TelegramIcon from '@mui/icons-material/Telegram';
import DiscordIcon from '@mui/icons-material/Groups';
import YouTubeIcon from '@mui/icons-material/YouTube';

// export const SERVERURL = "http://localhost:8080"
export const SERVERURL = "http://165.22.223.85:8080"

export const V1 = SERVERURL + "/api/v1";
export const PUBLIC =  V1 + "/public";
export const PRIVATE =  V1 + "/private";

const  SocialMediaLinks = {
    LinkedIn :'https://www.linkedin.com/in/kapilyadav22/',
    GitHub : 'https://github.com/kapilyadav22',
    Medium :'https://kapilyadav22.medium.com/',
    YouTube : 'https://www.youtube.com/@kapilyadav0180',
    Telegram : 'https://t.me/LCCoordinator',
    Discord :'https://discord.gg/sPdtSpKk',
  }

  export const socialMediaData = [
    {
      href: SocialMediaLinks.LinkedIn,
      icon: <LinkedInIcon fontSize="large" />,
    },
    {
      href: SocialMediaLinks.GitHub,
      icon: <GitHubIcon fontSize="large" />,
    },
    {
      href: SocialMediaLinks.Medium,
      icon: <MediumIcon fontSize="large" />,
    },
    {
      href: SocialMediaLinks.YouTube,
      icon: <YouTubeIcon fontSize="large" />,
    },
    {
      href: SocialMediaLinks.Telegram,
      icon: <TelegramIcon fontSize="large" />,
    },
    {
      href: SocialMediaLinks.Discord,
      icon: <DiscordIcon fontSize="large" />,
    },
  ];