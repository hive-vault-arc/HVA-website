import {FaAws} from 'react-icons/fa';
import {SiDigitalocean, SiDocker, SiGooglecloud, SiKubernetes} from 'react-icons/si';
import {VscAzure} from 'react-icons/vsc';

const CLOUD_ECOSYSTEM = [
  {name: 'AWS', Icon: FaAws},
  {name: 'Microsoft Azure', Icon: VscAzure},
  {name: 'Google Cloud', Icon: SiGooglecloud},
  {name: 'DigitalOcean', Icon: SiDigitalocean},
  {name: 'Docker', Icon: SiDocker},
  {name: 'Kubernetes', Icon: SiKubernetes},
] as const;

export default function CloudEcosystemRail({ariaLabel}: {ariaLabel: string}) {
  return (
    <ul className="cloud-ecosystem-rail" aria-label={ariaLabel}>
      {CLOUD_ECOSYSTEM.map(({name, Icon}) => (
        <li key={name}>
          <span role="img" aria-label={name} title={name}>
            <Icon aria-hidden="true" focusable="false" />
          </span>
        </li>
      ))}
    </ul>
  );
}

