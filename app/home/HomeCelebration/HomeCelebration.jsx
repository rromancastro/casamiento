import Image from 'next/image';
import { DesignImage } from '@/app/components/DesignImage/DesignImage';
import { SectionHeading } from '@/app/components/SectionHeading/SectionHeading';
import { Reveal } from '@/app/components/Reveal/Reveal';
import './homeCelebration.scss';

export const HomeCelebration = () => <section id="celebracion" aria-labelledby="celebrationTitle">
  <DesignImage name="celebration-flowers-top.png" width={205} height={150} className="celebrationFlowersTop ornament" />
  <DesignImage name="celebration-flowers-bottom.png" width={201} height={172} className="celebrationFlowersBottom ornament" />
  <Reveal className="celebrationContent">
    <SectionHeading initial="L" id="celebrationTitle">a celebración</SectionHeading>
    <p className="eyebrow celebrationIntro">TE ESPERAMOS PARA COMPARTIR<br />ESTE DÍA TAN ESPECIAL</p>
    <div className="eventDetails">
      <div className="eventDate"><Image src="/home/calendar.svg" width={30} height={31} alt="" /><time dateTime="2027-02-05">05 de<br />Febrero<br />2027</time></div>
      <div className="eventTime"><Image src="/home/clock.svg" width={30.312} height={30.312} alt="" /><time dateTime="2027-02-05T20:00:00-03:00">20:00 HS</time></div>
      <a className="eventLocation" href="https://www.google.com/maps/search/?api=1&query=M%C3%A1s+Jard%C3%ADn+Rest%C3%B3+Caf%C3%A9+Av.+Aguada+de+Pueyrred%C3%B3n+Juana+Koslay" target="_blank" rel="noreferrer" aria-label="Ver Más Jardín Restó Café en Google Maps">
        <Image src="/home/location.svg" width={26} height={33} alt="" />
        <span className="venueName">Más Jardín<br />Restó | Café</span>
        <span className="venueAddress">Av. Aguada de Pueyrredón,<br />Juana Koslay</span>
      </a>
    </div>
    <p className="entryPrice"><Image src="/home/ticket.svg" width={28} height={24} alt="" /><span>Valor: $59.000 c/u</span></p>
    <p className="entryAlias">Alias: ROMANYMICA.BODA</p>
  </Reveal>
</section>;
