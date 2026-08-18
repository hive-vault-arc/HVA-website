import {useTranslations} from 'next-intl';
import { WorldMap } from "./ui/world-map";
import { WORLD_MAP_DOTS } from "../data/worldMapDots";

export function WorldMapDemo() {
  const t = useTranslations('Home');

  return (
    <div className="home-global-reach">
      <div className="home-global-reach__header">
        <p className="home-global-reach__eyebrow">{t('globalReachEyebrow')}</p>
        <h2>
          {t('globalReachTitle')}
        </h2>
        <p>
          {t('globalReachDescription')}
        </p>
        <small>
          {t('globalReachLocation')}
        </small>
      </div>
      <div className="home-global-reach__map">
        <WorldMap dots={WORLD_MAP_DOTS} lineColor="#E8A838" />
      </div>
    </div>
  );
}
