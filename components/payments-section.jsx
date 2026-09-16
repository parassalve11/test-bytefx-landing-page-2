'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { paymentMethods } from '@/lib/payments';
import { site } from '@/lib/content';
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
          <div className="payments-heading"><div><p className="eyebrow">Fund your next move</p><h2 className="h-lg" id="payments-title">More ways to pay.<br /><span className="tint">More choice for you.</span></h2><p className="lede">Cards, digital wallets, crypto and bank transfers.<br />Choose the way that works for you.</p></div><a href={site.mobileAppUrl} target="_blank" rel="noopener noreferrer" className="btn btn--solid">Get the ByteFX app <span aria-hidden="true">↗</span></a></div>
          <div className="payment-methods" role="tablist" aria-label="Payment methods">
            {paymentMethods.map((item,index)=><button type="button" role="tab" key={item.id} id={`payment-tab-${item.id}`} aria-controls="payment-details" aria-selected={index===selected} tabIndex={index===selected?0:-1} ref={el=>{tabs.current[index]=el;}} onClick={()=>setSelected(index)} onKeyDown={event=>selectWithKey(event,index)}><span className={`payment-logo payment-logo--${item.id}`}><Image src={`/assets/payments/${item.id}.svg`} alt="" width={80} height={50} /></span><b>{item.name}</b><span className="payment-methods__arrow" aria-hidden="true">↗</span></button>)}
          </div>
          <div className="payment-details" id="payment-details" role="tabpanel" aria-labelledby={`payment-tab-${method.id}`} tabIndex={0}><div><p className="eyebrow">{method.category}</p><h3>{method.name}</h3></div><p>{method.description}</p><a href={`mailto:${site.email}?subject=${encodeURIComponent(`${method.name} funding enquiry`)}`}>Ask about {method.name}<span aria-hidden="true">↗</span></a></div>
          <p className="payments-note">Method availability and third-party fees may vary by region and provider. Review the details shown in your account before making a payment.</p>
        </Reveal>
      </div>
    </section>
  );
}
