// Facebook SDK integration

export function initFacebookSDK() {
  if (typeof window === 'undefined') return;

  window.fbAsyncInit = function () {
    FB.init({
      appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
      xfbml: true,
      version: 'v18.0',
    });
  };
}

export function shareToFacebook({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  if (!window.FB) {
    console.error('Facebook SDK not loaded');
    return;
  }

  FB.ui(
    {
      method: 'share',
      href: url,
      hashtag: '#SNAFUClips',
      quote: description,
      display: 'popup',
    },
    function (response: any) {
      console.log('Share response:', response);
    }
  );
}

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}