// Déclaration de type pour gtag
declare global {
  interface Window {
    gtag: (command: string, action: string, params?: Record<string, any>) => void;
  }
}

// Types d'événements Google Analytics
export const GA_EVENTS = {
  FORM_SUBMIT: 'form_submit',
  RESULTS_DISPLAY: 'results_display',
  PURCHASE_CLICK: 'purchase_click'
} as const;

// Vérifier si l'utilisateur a donné son consentement
const hasConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('cookieConsent') === 'true';
};

// Fonction pour envoyer un événement à Google Analytics
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag && hasConsent()) {
    window.gtag('event', eventName, eventParams);
  }
};

// Fonction pour suivre la soumission du formulaire
export const trackFormSubmit = (description: string) => {
  trackEvent(GA_EVENTS.FORM_SUBMIT, {
    description_length: description.length,
    timestamp: new Date().toISOString()
  });
};

// Fonction pour suivre l'affichage des résultats
export const trackResultsDisplay = (recommendationsCount: number) => {
  trackEvent(GA_EVENTS.RESULTS_DISPLAY, {
    recommendations_count: recommendationsCount,
    timestamp: new Date().toISOString()
  });
};

// Fonction pour suivre les clics sur les boutons d'achat
export const trackPurchaseClick = (gameName: string, storeName: string) => {
  trackEvent(GA_EVENTS.PURCHASE_CLICK, {
    game_name: gameName,
    store_name: storeName,
    timestamp: new Date().toISOString()
  });
}; 