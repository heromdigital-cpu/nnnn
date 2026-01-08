
# 🚀 Guia de Deploy e Integração Wix - MyListing Pro

Este guia explica como tirar este projeto do ambiente de desenvolvimento e colocá-lo no ar usando Wix Studio e Velo.

## 1. Preparação Local (Build)
Se você estiver movendo este código para o seu computador, siga estes passos:

1. Instale as dependências: `npm install`
2. Gere o pacote de produção: `npm run build`
3. O arquivo final estará em `/dist/assets/index-XXXX.js`.

## 2. Hospedagem do Script
O Wix precisa acessar o arquivo compilado via HTTPS.
- Recomendado: **Vercel** ou **Netlify**.
- Após o deploy, você terá uma URL como: `https://seu-app.vercel.app/main.js`.

## 3. Configuração no Wix Studio
1. Ative o **Dev Mode** (Velo).
2. Adicione um **Custom Element** na página desejada.
3. Nas configurações do elemento:
   - **Source:** Server URL
   - **URL:** A URL do seu script hospedado.
   - **Tag Name:** `mylisting-component`

## 4. Conectando ao Wix CMS (Velo)
Para usar os dados reais do seu banco de dados Wix dentro do React, use este snippet no código da página (Page Code):

```javascript
import wixData from 'wix-data';

$w.onReady(async function () {
    // Busca dados do CMS
    const results = await wixData.query("Listings").find();
    
    // Envia para o componente React
    $w("#customElement1").setAttribute('data', JSON.stringify(results.items));
});
```

## 5. Próximos Passos Sugeridos
1. **Wix Bookings:** Configurar o calendário no painel do Wix para que o ID da reserva funcione no checkout.
2. **Wix Members:** Ativar a área de membros para que o Dashboard exiba apenas os anúncios do usuário logado.
