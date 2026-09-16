'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { paymentMethods } from '@/lib/payments';
import Reveal from './reveal';

export default function PaymentsSection() {
  const [selected,setSelected] = useState(0);
  const tabs = useRef([]);
  const method = paymentMethods[selected];
  const selectWithKey = (event,index) => {
    const last = paymentMethods.length-1;
    const keys = {ArrowRight:(index+1)%paymentMethods.length,ArrowLeft:(index+last)%paymentMethods.length,Home:0,End:last};
    if (!(event.key in keys)) return;
    event.preventDefault();setSelected(keys[event.key]);tabs.current[keys[event.key]]?.focus();
  };
  return (
    <section className="payments-section band" id="payments" aria-labelledby="payments-title">
      <div className="shell">
        <Reveal className="payments-card">
          <div className="payments-heading"><p className="eyebrow">Payments, your way</p><h2 className="h-lg" id="payments-title">A world of <span className="tint">ways to pay.</span></h2><p className="lede">Choose your preferred payment method.</p></div>
          <div className="payment-methods" role="tablist" aria-label="Payment methods">
            {paymentMethods.map((item,index)=>{const logo=`/assets/payments/${item.id==='mastercard'?'mastercard-color':item.id}.svg`;return <button type="button" role="tab" key={item.id} id={`payment-tab-${item.id}`} aria-controls="payment-details" aria-selected={index===selected} tabIndex={index===selected?0:-1} ref={el=>{tabs.current[index]=el;}} onClick={()=>setSelected(index)} onKeyDown={event=>selectWithKey(event,index)}><span className={`payment-art payment-art--${item.id}`}><Image className="payment-art__glass" src="/assets/payments/chrome-glass.png" alt="" width={1254} height={1254} sizes="160px" /><Image className="payment-art__brand" src={logo} alt="" width={80} height={50} /><Image className="payment-art__reflection" src={logo} alt="" aria-hidden="true" width={80} height={50} /></span><b>{item.name}</b><span className="payment-selected" aria-hidden="true" /></button>;})}
          </div>
          <div className="payment-details" id="payment-details" role="tabpanel" aria-labelledby={`payment-tab-${method.id}`} tabIndex={0}><p key={method.id}>{method.description}</p></div>
          <p className="payments-note">Availability and third-party fees may vary by region and provider.</p>
        </Reveal>
      </div>
    </section>
  );
}
