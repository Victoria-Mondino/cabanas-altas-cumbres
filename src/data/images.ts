/**
 * Fotos de referencia reales (Wikimedia Commons, dominio público / CC) de las
 * Sierras de Córdoba y el Camino de las Altas Cumbres. Son placeholders de
 * alta calidad hasta que el cliente entregue material fotográfico propio.
 */
const wm = (filename: string, width = 1600) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=${width}`

export interface SiteImage {
  id: string
  src: string
  full: string
  alt: string
  credit: string
}

const image = (id: string, filename: string, alt: string, credit: string): SiteImage => ({
  id,
  src: wm(filename, 1400),
  full: wm(filename, 2200),
  alt,
  credit,
})

export const images = {
  heroRoad: image(
    'hero-road',
    '2238 MSNM. Camino de las Altas Cumbres.jpg',
    'Camino de las Altas Cumbres a 2238 metros sobre el nivel del mar',
    'Wikimedia Commons',
  ),
  sierraFire: image(
    'sierra-fire',
    'Arden las Sierras de Córdoba.jpg',
    'Atardecer sobre las Sierras de Córdoba',
    'Wikimedia Commons',
  ),
  skyAtFeet: image(
    'sky-at-feet',
    'El cielo a tus pies.jpg',
    'Vista elevada de las sierras cordobesas',
    'Wikimedia Commons',
  ),
  riverYuspe: image(
    'river-yuspe',
    'Rio Yuspe en Los Gigantes.JPG',
    'Río Yuspe en la zona de Los Gigantes',
    'Wikimedia Commons',
  ),
  achalaWaterfall: image(
    'achala-waterfall',
    'Achala cascada.jpg',
    'Cascada en la Pampa de Achala',
    'Wikimedia Commons',
  ),
  cumbrecitaHouse: image(
    'cumbrecita-house',
    'Casa en la colina - La Cumbrecita.JPG',
    'Casa de estilo alpino sobre la colina, La Cumbrecita',
    'Wikimedia Commons',
  ),
  cumbrecitaStream: image(
    'cumbrecita-stream',
    'La Cumbrecita Almbach stream.jpg',
    'Arroyo entre construcciones de piedra y madera, La Cumbrecita',
    'Wikimedia Commons',
  ),
  greenery: image(
    'greenery',
    'Frescura y verdor.JPG',
    'Bosque serrano en la Pampa de Achala',
    'Wikimedia Commons',
  ),
  nonoView: image(
    'nono-view',
    'Sierras de Córdoba cerca de Nono 2009-11.jpg',
    'Sierras de Córdoba cerca de Nono',
    'Wikimedia Commons',
  ),
  horseRider: image(
    'horse-rider',
    'Jinete en la inmensidad.JPG',
    'Cabalgata en la inmensidad de la Pampa de Achala',
    'Wikimedia Commons',
  ),
  condor: image(
    'condor',
    'Cóndor sobrevolando la Pampa de Achala.jpg',
    'Cóndor andino sobrevolando la Pampa de Achala',
    'Wikimedia Commons',
  ),
  sierraPanorama: image(
    'sierra-panorama',
    'Sierras de la Provincia de Córdoba (Argentina) 2008-09-20.jpg',
    'Panorama de las Sierras de Córdoba',
    'Wikimedia Commons',
  ),
} as const
