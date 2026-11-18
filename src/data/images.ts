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

/**
 * Fotos de cabañas (exteriores e interiores). Son imágenes de stock de
 * Unsplash usadas como placeholder hasta que el cliente entregue fotos
 * reales de cada unidad: reemplazar los ids por las fotos propias.
 */
const unsplash = (id: string, alt: string): SiteImage => ({
  id: `u-${id.slice(0, 13)}`,
  src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1400`,
  full: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=85&w=2400`,
  alt,
  credit: 'Unsplash',
})

export const cabinPhotos = {
  condor: [
    unsplash('1542718610-a1d656d1884c', 'Cabaña Cóndor al atardecer, con ventanales hacia el valle'),
    unsplash('1506905925346-21bda4d32df4', 'Vista de las sierras sobre las nubes desde la cabaña'),
    unsplash('1596394516093-501ba68a0ba6', 'Dormitorio con cama frente a la vista de la montaña'),
    unsplash('1611892440504-42a792e24d32', 'Dormitorio en madera con ventanal'),
    unsplash('1620626011761-996317b8d101', 'Baño con bañera exenta'),
    unsplash('1560448204-e02f11c3d0e2', 'Living luminoso con grandes ventanas'),
  ],
  achala: [
    unsplash('1449158743715-0a90ebb6d2d8', 'Cabaña Achala rodeada de bosque serrano'),
    unsplash('1587061949409-02df41d5e562', 'Cabaña entre la niebla del bosque'),
    unsplash('1554995207-c18c203602cb', 'Living con sillones y luz natural'),
    unsplash('1522771739844-6a9f6d5f14af', 'Dormitorio con ropa de cama de algodón'),
    unsplash('1507089947368-19c1da9775ae', 'Cocina equipada con isla'),
    unsplash('1552321554-5fefe8c9ef14', 'Baño completo con bañera'),
  ],
  yuspe: [
    unsplash('1571055107559-3e67626fa8be', 'Cabaña Yuspe, casa de dos plantas en troncos'),
    unsplash('1558036117-15d82a90b9b1', 'Exterior de la cabaña al atardecer'),
    unsplash('1583847268964-b28dc8f51f92', 'Living amplio de la planta baja'),
    unsplash('1540518614846-7eded433c457', 'Suite principal con banquetas'),
    unsplash('1445307806294-bff7f67ff225', 'Hamaca entre los árboles, junto al deck de la cabaña'),
    unsplash('1556912172-45b7abe8b7e1', 'Cocina grande para grupos'),
  ],
  traslasierra: [
    unsplash('1499696010180-025ef6e1a8f9', 'Cabaña Traslasierra entre los pinos'),
    unsplash('1510798831971-661eb04b3739', 'Cabaña iluminada junto al lago'),
    unsplash('1560067174-c5a3a8f37060', 'Dormitorio íntimo con pared verde'),
    unsplash('1600494603989-9650cf6ddd3d', 'Living acogedor con estufa'),
    unsplash('1584622650111-993a426fbf0a', 'Baño luminoso'),
    unsplash('1519681393784-d120267933ba', 'Cielo estrellado sobre las sierras'),
  ],
} as const
