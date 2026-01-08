
/**
 * Wix Integration Service - Pro Version
 * Gerencia a comunicação entre o Custom Element (React) e o Wix Host (Velo).
 */

export interface WixDataState {
  listings: any[];
  member: any | null;
  config: any;
}

// Hook de simulação/integração para escutar mudanças vindas do Wix Editor/Velo
export const subscribeToWixData = (callback: (data: Partial<WixDataState>) => void) => {
  // No Wix, os Custom Elements recebem dados via propriedades que acionam attributeChangedCallback
  // Aqui simulamos esse listener
  const handleWixMessage = (event: any) => {
    if (event.detail) callback(event.detail);
  };

  window.addEventListener('wix-data-update', handleWixMessage);
  return () => window.removeEventListener('wix-data-update', handleWixMessage);
};

/**
 * Dispara um evento para o Wix (Velo) processar.
 * Exemplo: Wix capturaria isso com $w('#customElement').on('bookingRequest', (event) => { ... })
 */
export const dispatchWixAction = (actionName: string, payload: any) => {
  const event = new CustomEvent(actionName, {
    detail: payload,
    bubbles: true,
    composed: true // Necessário para atravessar o Shadow DOM do Wix
  });
  window.dispatchEvent(event);
  console.log(`[Wix Bridge] Ação disparada: ${actionName}`, payload);
};

export const createWixBooking = async (listingId: string, details: any) => {
  dispatchWixAction('createBooking', { listingId, ...details });
  return { success: true };
};

export const trackWixAnalytics = (eventName: string, params: any) => {
  dispatchWixAction('trackAnalytics', { eventName, params });
};
