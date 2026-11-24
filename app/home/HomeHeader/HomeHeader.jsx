'use client';

import { useState } from 'react';
import Image from 'next/image';
import { DesignImage } from '@/app/components/DesignImage/DesignImage';
import './homeHeader.scss';

export const HomeHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return <header id="homeHeader">
    <picture className="heroPhoto">
      <source media="(min-width: 768px)" srcSet="/home/hero-desktop.jpg" />
      {/* El recorte de la foto sigue las medidas exportadas de Figma. */}
      <img src="/home/hero-mobile.jpg" alt="Román y Micaela mirándose en el bosque" fetchPriority="high" />
    </picture>
    <DesignImage name="cover-flowers.png" width={233} height={254} className="coverFlowers ornament" priority />
    <button className="menuToggle" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="invitationNavigation" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
    {menuOpen && <nav id="invitationNavigation" className="invitationNavigation" aria-label="Secciones">
      {[['celebracion', 'La celebración'], ['dressCode', 'Dress code'], ['regalos', 'Lista de regalos']].map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
    </nav>}
    <div className="heroCopy">
      <p className="eyebrow">NOS CASAMOS</p>
      <span className="fineRule" />
      <h1>ROMÁN &amp;<br />MICAELA</h1>
      <p className="heroVerse">Porque Él nos amó primero</p>
      <a href="#celebracion" className="scrollInvitation" aria-label="Ver los detalles de la celebración"><Image src="/home/arrow.svg" width={22} height={12} alt="" /></a>
    </div>
  </header>;
};
