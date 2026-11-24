import Image from 'next/image';
import { DesignImage } from '@/app/components/DesignImage/DesignImage';
import { SectionHeading } from '@/app/components/SectionHeading/SectionHeading';
import { Reveal } from '@/app/components/Reveal/Reveal';
import './homeDressCode.scss';

const colors = [['Verde oscuro', '#282B1E'], ['Terracota', '#853021'], ['Marrón', '#45280F'], ['Arena', '#B79673'], ['Oliva', '#5B4E2D']];

export const HomeDressCode = () => <section id="dressCode" aria-labelledby="dressCodeTitle">
  <DesignImage name="draped-fabric.png" width={225} height={275} className="drapedFabric ornament" />
  <DesignImage name="pampas.png" width={122} height={234} className="dressPampas ornament" />
  <Reveal className="dressContent">
    <SectionHeading initial="D" id="dressCodeTitle">ress Code</SectionHeading>
    <p className="eyebrow dressSubtitle">BOHEMIO</p>
    <span className="fineRule" />
    <p className="dressDescription">Un estilo relajado, natural y con esencia bohemia.<br />Te invitamos a usar colores oscuros y tonos tierra.</p>
    <div className="outfitExamples" aria-label="Vestido y camisa de estilo bohemio"><Image src="/home/dress.svg" width={49} height={86} alt="Vestido bohemio" /><Image src="/home/shirt.svg" width={59} height={60} alt="Camisa bohemia" /></div>
    <ul className="dressPalette" aria-label="Colores sugeridos">{colors.map(([name, color]) => <li key={name} style={{ '--swatch': color }} title={name}><span className="srOnly">{name}</span></li>)}</ul>
    <div className="reservedColors"><p>Colores <strong>RESERVADOS</strong></p><ul className="dressPalette" aria-label="Colores reservados para los novios"><li style={{ '--swatch': '#FFFFFF' }}><span className="srOnly">Blanco reservado</span></li><li style={{ '--swatch': '#FEE4C2' }}><span className="srOnly">Crema reservado</span></li></ul></div>
  </Reveal>
</section>;
