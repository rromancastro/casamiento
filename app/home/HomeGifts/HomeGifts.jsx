'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { DesignImage } from '@/app/components/DesignImage/DesignImage';
import { Reveal } from '@/app/components/Reveal/Reveal';
import './homeGifts.scss';

const alias = 'ROMANYMICA.BODA';

export const HomeGifts = () => {
  const [copyStatus, setCopyStatus] = useState('');
  const [selected, setSelected] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dialogRef = useRef(null);
  const aliasRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/regalos', { cache: 'no-store', signal: controller.signal })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        setSelected(data.reserved);
      })
      .catch(error => { if (error.name !== 'AbortError') setError('No pudimos cargar los regalos. Recargá la página para reintentar.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
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

  async function reserveGift(event) {
    event.preventDefault();
    if (saving || !name.trim()) return;
    setSaving(true);
    setError('');
    try {
      const response = await fetch('/api/regalos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gift: 'microondas', name: name.trim() }),
      });
      const data = await response.json();
      if (data.reserved) setSelected(true);
      if (!response.ok) throw new Error(data.error);
      setSuccess('¡Gracias! Tu reserva quedó guardada.');
      dialogRef.current.close();
    } catch (error) {
      setError(error.message || 'No pudimos guardar tu reserva. Intentá nuevamente.');
    } finally {
      setSaving(false);
    }
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
          <li><span className={`giftCheckbox ${selected ? 'isChecked' : ''}`} aria-hidden="true">{selected && <Image src="/home/check.svg" width={8} height={6} alt="" />}</span><span>MICROONDAS</span><button type="button" className="reserveGift" disabled={loading || selected || Boolean(error && !name)} onClick={() => dialogRef.current.showModal()} aria-haspopup="dialog">{loading ? 'CARGANDO…' : selected ? 'OCUPADO' : '¡ANOTARME!'}<Image src="/home/hand.svg" width={8} height={10} alt="" /></button></li>
          <li className="giftOccupied"><span className="giftCheckbox isChecked" aria-hidden="true"><Image src="/home/check.svg" width={8} height={6} alt="" /></span><span className="giftName">HELADERA</span><span className="occupiedLabel">OCUPADO</span></li>
        </ul>
        <p className="reservationStatus" role="status">{success}</p>
        {error && <p className="reservationStatus" role="alert">{error}</p>}
      </div>
    </Reveal>
    <dialog className="giftDialog" ref={dialogRef} aria-labelledby="giftDialogTitle" onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
      <form method="dialog"><button className="closeDialog" aria-label="Cerrar">×</button></form>
      <h3 id="giftDialogTitle">Un regalo para nuestro hogar</h3>
      <p className="dialogGiftName">Microondas</p>
      <form onSubmit={reserveGift}>
        <label htmlFor="giftReservationName">Tu nombre y apellido</label>
        <input id="giftReservationName" name="name" autoComplete="name" required maxLength={100} value={name} onChange={event => setName(event.target.value)} disabled={saving || selected} />
        {error && <p className="selectionNote" role="alert">{error}</p>}
        <button className="dialogAction" type="submit" disabled={saving || selected || !name.trim()}>{saving ? 'Guardando…' : selected ? 'Regalo reservado' : 'Anotarme'}</button>
      </form>
    </dialog>
  </section>;
};
