export const paymentMethods = [
  { id: 'visa', name: 'Visa', category: 'Card payments', description: 'Use your Visa card through the funding options in your ByteFX account. Review the amount and payment details before confirming.' },
  { id: 'mastercard', name: 'Mastercard', category: 'Card payments', description: 'Choose Mastercard in your account funding options and follow the card verification steps shown at checkout.' },
  { id: 'applepay', name: 'Apple Pay', category: 'Digital wallet', description: 'Choose Apple Pay where it is available in your funding flow, then confirm using your compatible device.' },
  { id: 'bitcoin', name: 'Bitcoin', category: 'Crypto payments', description: 'Find Bitcoin funding instructions in your account. Always check the destination address and the network before sending.' },
  { id: 'tether', name: 'USDT', category: 'Stablecoin payments', description: 'Choose USDT in your account and follow the displayed network and address instructions. The sending and receiving networks must match.' },
  { id: 'bank', name: 'Bank wire', category: 'Bank transfers', description: 'Use the bank details and payment reference provided in your account to arrange a transfer from your bank.' },
  { id: 'upi', name: 'UPI', category: 'Local payments', description: 'Choose UPI in your account funding options and complete the payment through your supported UPI app.' },
];
