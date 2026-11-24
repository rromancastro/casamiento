'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { DesignImage } from '@/app/components/DesignImage/DesignImage';
import { Reveal } from '@/app/components/Reveal/Reveal';
import './homeGifts.scss';

const alias = 'ROMANYMICA.BODA';
const reservationKey = 'roman-micaela-microondas';
let sessionChoice = false;
function readChoice() {
  try { return localStorage.getItem(reservationKey) === 'selected'; } catch { return sessionChoice; }
}
function subscribeChoice(callback) {
  window.addEventListener('storage', callback);
  window.addEventListener('gift-selection-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('gift-selection-change', callback);
  };
}
const serverChoice = () => false;

export const HomeGifts = () => {
  const [copyStatus, setCopyStatus] = useState('');
  const selected = useSyncExternalStore(subscribeChoice, readChoice, serverChoice);
  const dialogRef = useRef(null);
  const aliasRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  async function copyAlias() {
    try {
      await navigator.clipboard.writeText(alias);
      setCopyStatus('¡Alias copiado!');
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(aliasRef.current);
      selection.removeAllRanges();
      selection.addRange(range);
      setCopyStatus('Seleccioná y copiá el alias');
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopyStatus(''), 3000);
  }

  function updateSelection() {
    const next = !selected;
    sessionChoice = next;
    try { if (next) localStorage.setItem(reservationKey, 'selected'); else localStorage.removeItem(reservationKey); } catch { /* Estado disponible durante la visita. */ }
    window.dispatchEvent(new Event('gift-selection-change'));
    dialogRef.current.close();
  }

  return <section id="regalos" aria-labelledby="giftsTitle">
    <DesignImage name="gifts-flowers.png" width={180} height={307} className="giftsFlowers ornament" />
    <DesignImage name="gifts-branches.png" width={157} height={252} className="giftsBranches ornament" />
    <Reveal className="giftsContent">
      <h2 id="giftsTitle"><Image src="/home/gift.svg" width={30} height={32} alt="" /><span>Lista de regalos</span></h2>
      <p className="eyebrow giftsIntro">TU PRESENCIA ES NUESTRO MAYOR REGALO,<br />PERO SI DESEÁS HACERNOS UN AGASAJO,<br />PODÉS HACERLO A TRAVÉS DE:</p>
      <div className="aliasCard">
        <div className="mercadoPago"><Image src="/home/handshake.svg" width={43} height={32} alt="" /><span>mercado<br />pago</span></div>
        <div className="aliasDetails"><p>Alias:</p><div className="aliasCopy"><span ref={aliasRef}>{alias}</span><button type="button" onClick={copyAlias} aria-label={`Copiar alias ${alias}`}><Image src="/home/copy.svg" width={20} height={24} alt="" /></button></div></div>
        <span className="copyStatus" role="status" aria-live="polite">{copyStatus}</span>
      </div>
      <div className="giftIdeas">
        <p className="eyebrow">¿QUERÉS REGALARNOS ALGO Y NO SABÉS QUÉ?<br />ACÁ TE DEJAMOS ALGUNAS IDEAS DE COSAS QUE<br />NECESITAMOS Y QUE VAMOS A USAR UN MONTÓN.</p>
        <ul className="giftList">
          <li><span className={`giftCheckbox ${selected ? 'isChecked' : ''}`} aria-hidden="true">{selected && <Image src="/home/check.svg" width={8} height={6} alt="" />}</span><span>MICROONDAS</span><button type="button" className="reserveGift" onClick={() => dialogRef.current.showModal()} aria-haspopup="dialog">{selected ? 'ELEGIDO ✓' : '¡ANOTARME!'}<Image src="/home/hand.svg" width={8} height={10} alt="" /></button></li>
          <li className="giftOccupied"><span className="giftCheckbox isChecked" aria-hidden="true"><Image src="/home/check.svg" width={8} height={6} alt="" /></span><span className="giftName">HELADERA</span><span className="occupiedLabel">OCUPADO</span></li>
        </ul>
      </div>
    </Reveal>
    <dialog className="giftDialog" ref={dialogRef} aria-labelledby="giftDialogTitle" onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
      <form method="dialog"><button className="closeDialog" aria-label="Cerrar">×</button></form>
      <h3 id="giftDialogTitle">{selected ? 'Tu regalo elegido' : 'Un regalo para nuestro hogar'}</h3>
      <p className="dialogGiftName">Microondas</p>
      <p>Coordiná este regalo con Román y Micaela para que puedan reservarlo para vos.</p>
      <p className="selectionNote">Tu elección se recuerda en este dispositivo; no envía una reserva a los novios.</p>
      <button className="dialogAction" type="button" onClick={updateSelection}>{selected ? 'Quitar mi elección' : 'Recordar mi elección'}</button>
    </dialog>
  </section>;
};
