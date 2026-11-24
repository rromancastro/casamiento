import { HomeHeader, HomeCelebration, HomeDressCode, HomeGifts, HomeClosing } from './home';

export default function Home() {
  return <>
    <a className="skipLink" href="#celebracion">Ir a los detalles de la celebración</a>
    <HomeHeader />
    <main id="invitacion"><HomeCelebration /><HomeDressCode /><HomeGifts /></main>
    <HomeClosing />
  </>;
}
