'use client';

import { useEffect, useRef, useState } from 'react';
import { atlasWelcome, getAtlasReply } from '@/lib/atlas';
import Icon from './icon';

const suggestions = ['Get the app', 'Explore platforms', 'Contact support'];

export default function AtlasChat() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([atlasWelcome]);
  const launcher = useRef(null);
  const input = useRef(null);
  const conversation = useRef(null);

  useEffect(() => { if (open) input.current?.focus({ preventScroll: true }); }, [open]);
  useEffect(() => {
    if (open && conversation.current) conversation.current.scrollTop = conversation.current.scrollHeight;
  }, [messages, open]);

  const close = () => { setOpen(false); launcher.current?.focus({ preventScroll: true }); };
  const send = (value) => {
    const text = value.trim().slice(0, 500);
    if (!text) return;
    const reply = getAtlasReply(text);
    setMessages(current => [...current, { role: 'user', text }, { role: 'assistant', ...reply }]);
    setDraft('');
    input.current?.focus({ preventScroll: true });
  };

  return (
    <div className="atlas-widget">
      {open && (
        <section className="atlas-panel" id="atlas-chat" role="dialog" aria-modal="false" aria-labelledby="atlas-title" onKeyDown={event=>{if(event.key==='Escape'){event.stopPropagation();close();}}}>
          <header className="atlas-header">
            <span className="atlas-avatar"><Icon name="spark" size={26} /></span>
            <div><h2 id="atlas-title">Atlas</h2><p>ByteFX website assistant</p></div>
            <button type="button" className="atlas-icon" aria-label="Start a new Atlas conversation" title="Start over" onClick={()=>{setMessages([atlasWelcome]);setDraft('');input.current?.focus();}}><Icon name="refresh" size={17} /></button>
            <button type="button" className="atlas-icon" aria-label="Close Atlas chat" onClick={close}><Icon name="close" size={19} /></button>
          </header>
          <div className="atlas-conversation" ref={conversation} role="log" aria-label="Conversation with Atlas" aria-live="polite" aria-relevant="additions">
            {messages.map((message,index)=>(
              <div key={index} className={`atlas-message atlas-message--${message.role}`}>
                <span className="atlas-message__author">{message.role==='assistant'?'Atlas':'You'}</span>
                <p>{message.text}</p>
                {message.links && <div className="atlas-message__links">{message.links.map(link=><a key={link.label} href={link.href} {...(link.href.startsWith('https://')?{target:'_blank',rel:'noopener noreferrer'}:{})} onClick={()=>{if(link.href.startsWith('#'))close();}}>{link.label}<Icon name="arrow" size={13} /></a>)}</div>}
              </div>
            ))}
          </div>
          <div className="atlas-suggestions" aria-label="Suggested questions">{suggestions.map(text=><button type="button" key={text} onClick={()=>send(text)}>{text}</button>)}</div>
          <form className="atlas-form" onSubmit={event=>{event.preventDefault();send(draft);}}>
            <label htmlFor="atlas-message" className="sr-only">Message Atlas</label>
            <input ref={input} id="atlas-message" type="text" value={draft} onChange={event=>setDraft(event.target.value)} maxLength={500} autoComplete="off" placeholder="Ask Atlas a question…" />
            <button type="submit" aria-label="Send message to Atlas" disabled={!draft.trim()}><Icon name="send" size={19} /></button>
          </form>
          <p className="atlas-note">Website guidance · For account help, contact support</p>
        </section>
      )}
      <button ref={launcher} type="button" className="atlas-launcher" aria-expanded={open} aria-controls="atlas-chat" aria-label={open?'Close Atlas chat':'Chat with Atlas'} onClick={()=>{if(open)close();else setOpen(true);}}><Icon name={open?'close':'chat'} size={23} /><span>Atlas</span></button>
    </div>
  );
}
