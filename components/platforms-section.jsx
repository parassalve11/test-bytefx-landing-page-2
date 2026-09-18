'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { platformOptions } from '@/lib/platforms';
import Reveal from './reveal';
import PlatformLights from './platform-lights';

export default function PlatformsSection() {
  const [selected,setSelected] = useState(1);
  const tabs = useRef([]);
  const platform = platformOptions[selected];
  const onKey = (event,index) => {
    const keys={ArrowRight:(index+1)%3,ArrowLeft:(index+2)%3,Home:0,End:2};
    if (!(event.key in keys)) return;
    event.preventDefault();setSelected(keys[event.key]);tabs.current[keys[event.key]]?.focus();
  };
  return (
    <section className="platform-guide band" id="platform-guide" aria-labelledby="platform-guide-title">
      <PlatformLights />
      <div className="shell">
        <Reveal className="platform-guide__heading">
          <p className="eyebrow">Your trading setup</p>
          <h2 className="h-lg" id="platform-guide-title">Find your platform.<br /><span className="tint">Make it your own.</span></h2>
          <p className="lede">A bigger picture at your desk. A closer connection on the move. Explore the tools that fit the way you trade.</p>
        </Reveal>
        <Reveal className="platform-stage">
          <Image src="/assets/platforms/bytefx-device-setup.webp" alt="ByteFX trading charts on a laptop, withdrawals on a tablet, and the mobile trading app on a phone" width={1536} height={1024} sizes="(max-width: 760px) 100vw, (max-width: 1148px) 96vw, 1100px" />
        </Reveal>
        <Reveal className="platform-guide__selector">
          <div className="platform-tabs" role="tablist" aria-label="Trading platforms">
            {platformOptions.map((item,index)=><button type="button" role="tab" key={item.id} id={`platform-tab-${item.id}`} ref={el=>{tabs.current[index]=el;}} aria-controls="platform-details" aria-selected={index===selected} tabIndex={index===selected?0:-1} onClick={()=>setSelected(index)} onKeyDown={event=>onKey(event,index)} aria-label={item.name}><span className={`platform-logo platform-logo--${item.id}`}><Image src={item.logo} alt="" width={80} height={80} /></span><span>{item.name}</span></button>)}
          </div>
          <div id="platform-details" role="tabpanel" aria-labelledby={`platform-tab-${platform.id}`} tabIndex={0} className="platform-detail">
            <p className="platform-detail__copy lede" key={platform.id}>{platform.body}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
