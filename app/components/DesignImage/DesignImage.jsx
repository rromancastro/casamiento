import Image from 'next/image';

export const DesignImage = ({ name, width, height, className = '', priority = false, alt = '' }) => (
  <Image src={`/home/${name}`} width={width} height={height} alt={alt} className={className} priority={priority} />
);
