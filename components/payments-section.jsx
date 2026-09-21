'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { paymentMethods } from '@/lib/payments';
import Reveal from './reveal';

export default function PaymentsSection() {
  const [selected,setSelected] = useState(0);
  const buttons = useRef([]);
  const moveFocus = (event,index) => {
    const count=paymentMethods.length;
    const keys={ArrowDown:(index+1)%count,ArrowUp:(index+count-1)%count,Home:0,End:count-1};
    if (!(event.key in keys)) return;
    event.preventDefault();buttons.current[keys[event.key]]?.focus();
  };
  return (
    <section className="payments-section band" id="payments" aria-labelledby="payments-title">
      <div className="shell">
        <Reveal className="payments-layout">
          <div className="payments-story">
            <p className="eyebrow">Move money your way</p>
            <h2 className="h-lg" id="payments-title">One account.<br /><span className="tint">More possibilities.</span></h2>
            <p className="lede">From familiar cards to digital currencies.<br />Find the payment method that fits your day.</p>
            <div className="payment-scene">
              <Image className="payment-scene__wallet" src="/assets/generated/payment-wallet.webp" alt="A graphite and lime wallet with Visa, Mastercard, Google Pay, Apple Pay, UPI, bank, Bitcoin and USDT coins rising out of it" width={1019} height={1057} sizes="(max-width: 760px) 86vw, 480px" />
            </div>
          </div>
          <div className="payments-options">
            <div className="payments-options__heading"><h3>Choose how you pay</h3><span>07 methods</span></div>
            <div className="payment-list">
              {paymentMethods.map((item,index)=>{const active=selected===index;return <div key={item.id} className="payment-option" data-open={active}>
                <h4><button type="button" id={`payment-trigger-${item.id}`} aria-expanded={active} aria-controls={`payment-panel-${item.id}`} ref={el=>{buttons.current[index]=el;}} onClick={()=>setSelected(active?null:index)} onKeyDown={event=>moveFocus(event,index)}>
                  <span className={`payment-mark payment-mark--${item.id}`}><Image src={`/assets/payments/${item.id==='mastercard'?'mastercard-color':item.id}.svg`} alt="" width={72} height={44} /></span>
                  <span className="payment-option__name">{item.name}</span><span className="payment-option__category">{item.category}</span><span className="payment-option__toggle" aria-hidden="true">{active?'−':'+'}</span>
                </button></h4>
                <div id={`payment-panel-${item.id}`} role="region" aria-labelledby={`payment-trigger-${item.id}`} hidden={!active} className="payment-option__details"><p>{item.description}</p></div>
              </div>;})}
            </div>
            <p className="payments-note">Availability and third-party fees may vary by region and provider. Review the details in your account before making a payment.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
