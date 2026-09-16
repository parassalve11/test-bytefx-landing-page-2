import { site } from './content';

export const atlasWelcome = {
  role: 'assistant',
  text: 'Hi, I’m Atlas, your ByteFX website assistant. I can help you find the app, explore platforms or reach our support team. What would you like to do?',
};

export function getAtlasReply(message) {
  const text = message.toLowerCase().trim();
  if (/\b(human|agent|support|contact|helpdesk|email|phone|complaint)\b/.test(text)) {
    return { text: `You can reach the ByteFX team at ${site.email} or ${site.phone}. For account-specific questions, contact the team directly.`, links: [{ label: 'Email support', href: `mailto:${site.email}` }, { label: 'Call ByteFX', href: `tel:${site.phoneHref}` }] };
  }
  if (/\b(app|android|mobile|qr|download|install|google|play store)\b/.test(text)) {
    return { text: 'ByteFX is available on Google Play for Android. Use the link below to install it, or scan the QR code in the mobile section.', links: [{ label: 'Get ByteFX on Google Play', href: site.mobileAppUrl }, { label: 'See the app & QR', href: '#mobile-app' }] };
  }
  if (/\b(ios|iphone|ipad|apple)\b/.test(text)) {
    return { text: 'The current ByteFX app download link is for Android. Contact support for information about iPhone or iPad availability.', links: [{ label: 'Ask about iOS', href: `mailto:${site.email}?subject=ByteFX%20iOS%20app` }] };
  }
  if (/\b(mt4|mt5|metatrader|tradingview|trading view|platform|platforms)\b/.test(text)) {
    return { text: 'You can explore MetaTrader 4, MetaTrader 5 and TradingView in our platform guide. Select a platform to see its tools and official website. For availability with your ByteFX account, check with support.', links: [{ label: 'Explore platforms', href: '#platform-guide' }, { label: 'Check account compatibility', href: `mailto:${site.email}` }] };
  }
  if (/\b(deposit|withdraw|withdrawal|withdrawals|funding|transfer|payment|payments|transaction|balance|upi|visa|mastercard|usdt)\b/.test(text)) {
    return { text: 'The ByteFX app brings account actions and transaction history together. Download the app from our mobile section. Contact support to check funding methods, processing times or an individual transaction.', links: [{ label: 'Explore payment methods', href: '#payments' }, { label: 'Ask about a transaction', href: `mailto:${site.email}` }] };
  }
  if (/\b(account|accounts|register|registration|sign up|signup|demo|start|open)\b/.test(text)) {
    return { text: 'Start with the ByteFX app or contact our team for help with a live or demo account. I can guide you around the website, but I can’t open or access an account in this chat.', links: [{ label: 'Download ByteFX', href: site.mobileAppUrl }, { label: 'Get account help', href: `mailto:${site.email}` }] };
  }
  if (/\b(markets|market|forex|instruments|crypto|commodities|indices|shares|gold)\b/.test(text)) {
    return { text: 'The markets section introduces Forex, Indices, Crypto, Commodities and Shares. Explore the available categories, then check the app or support team for the instruments available to your account.', links: [{ label: 'Explore markets', href: '#markets' }] };
  }
  if (/\b(password|login|log in|reset|locked)\b/.test(text)) {
    return { text: 'Please use the recovery options in the ByteFX app or contact support for sign-in help. Don’t share your password or verification codes here.', links: [{ label: 'Contact support', href: `mailto:${site.email}` }] };
  }
  if (/\b(hi|hello|hey|atlas|thanks|thank you)\b/.test(text)) {
    return { text: 'I’m here to help. Ask me about downloading the ByteFX app, exploring platforms, finding markets or contacting support.' };
  }
  return { text: 'I can help with the ByteFX app, platforms, markets and support contacts. I don’t have access to your account or live market data. For anything more specific, our support team can help.', links: [{ label: 'Contact ByteFX support', href: `mailto:${site.email}` }] };
}
