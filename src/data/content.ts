import { images } from './images'

export const nav = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Cabañas', href: '#cabanas' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Ubicación', href: '#ubicacion' },
  { label: 'Actividades', href: '#actividades' },
]

export const RESERVE_LABEL = 'Reservar tu estadía'

export const heroLayers = {
  kicker: 'DESCONECTÁ. RESPIRÁ. PERTENECÉ.',
  headline: 'Tu refugio en la sierra, a 2200 metros del ruido.',
  blurb:
    'Hospedate en cabañas exclusivas o celebrá momentos inolvidables en un entorno único, sobre el Camino de las Altas Cumbres.',
  reviewText: 'Uno de los alojamientos más elegidos de la sierra.',
}

export const stats = [
  { value: '12+', label: 'años recibiendo viajeros' },
  { value: '4', label: 'cabañas de piedra y madera' },
  { value: '4.9/5', label: 'valoración de huéspedes' },
]

/**
 * Los 3 bloques de la sección "Sobre" (uno por palabra del titular),
 * presentados como tarjetas apiladas que se navegan con flechas o drag.
 */
export const aboutPanels = [
  {
    id: 'piedra',
    index: '01',
    kicker: 'Piedra',
    title: 'Piedra de la sierra',
    text: 'Cuatro cabañas construidas con piedra de la zona, muros gruesos que mantienen la temperatura estable todo el año y grandes ventanales orientados a la sierra.',
    tags: stats.map((s) => `${s.value} ${s.label}`),
    image: images.cumbrecitaHouse,
  },
  {
    id: 'madera',
    index: '02',
    kicker: 'Madera',
    title: 'Madera de ciprés',
    text: 'Interiores revestidos en madera de ciprés, hogar a leña en cada cabaña y ropa de cama de algodón. Calidez de verdad, sin pantallas de por medio.',
    tags: ['Hogar a leña', 'Ropa de cama de algodón', 'Interiores en ciprés'],
    image: images.greenery,
  },
  {
    id: 'silencio',
    index: '03',
    kicker: 'Silencio',
    title: 'Silencio de altura',
    text: 'A 2200 metros, con la ciudad lejos y el cielo cerca. Todo lo que necesitás para desconectar, nada de lo que sobra.',
    tags: ['Wifi en espacios comunes', 'Pet friendly', 'Estacionamiento privado'],
    image: images.skyAtFeet,
  },
]

/**
 * Contenido de referencia (nombres, fotos e descripciones de cabañas
 * inventados) hasta que el cliente entregue la información real de cada
 * unidad.
 */
export const cabins = [
  {
    id: 'condor',
    name: 'Cabaña Cóndor',
    capacity: '2 huéspedes',
    icon: 'Mountains',
    image: images.sierraPanorama,
    description:
      'Ventanales de piso a techo con vista abierta a la Pampa de Achala. La más buscada por parejas.',
  },
  {
    id: 'achala',
    name: 'Cabaña Achala',
    capacity: '4 huéspedes',
    icon: 'Fire',
    image: images.cumbrecitaHouse,
    description:
      'Living con hogar a leña y galería techada hacia el bosque serrano. Ideal para familias.',
  },
  {
    id: 'yuspe',
    name: 'Cabaña Yuspe',
    capacity: '6 huéspedes',
    icon: 'Bathtub',
    image: images.riverYuspe,
    description:
      'Dos plantas y deck exterior con hidromasaje. La más grande del predio, para grupos.',
  },
  {
    id: 'traslasierra',
    name: 'Cabaña Traslasierra',
    capacity: '3 huéspedes',
    icon: 'PawPrint',
    image: images.cumbrecitaStream,
    description:
      'La más íntima, entre pinos, con estufa a leña, balcón al valle y espacio pet friendly.',
  },
]

/**
 * Testimonios de referencia (nombres y citas ficticias) hasta contar con
 * reseñas reales de huéspedes. Divididos en dos filas de 5 para el carrusel
 * infinito doble.
 */
export const testimonialsRow1 = [
  {
    id: 't1',
    name: 'María Laura P.',
    origin: 'Córdoba Capital',
    quote:
      'Nos despertamos con niebla entre las sierras y silencio total. La cabaña Achala superó todo lo que esperábamos.',
  },
  {
    id: 't2',
    name: 'Nicolás R.',
    origin: 'Buenos Aires',
    quote:
      'El camino de acceso ya es un espectáculo. Volvimos con ganas de quedarnos una semana más.',
  },
  {
    id: 't3',
    name: 'Familia Gómez',
    origin: 'Rosario',
    quote:
      'Perfecto para desconectar con los chicos. Hogar a leña, estrellas de noche y cero señal de celular.',
  },
  {
    id: 't4',
    name: 'Julieta M.',
    origin: 'Villa Carlos Paz',
    quote:
      'El hidromasaje exterior con vista a la sierra al atardecer no tiene comparación. Vamos a volver seguro.',
  },
  {
    id: 't5',
    name: 'Rodrigo A.',
    origin: 'Mendoza',
    quote:
      'Cabaña impecable y el dueño nos recomendó cada mirador de la zona. Se nota que conocen el lugar de memoria.',
  },
]

export const testimonialsRow2 = [
  {
    id: 't6',
    name: 'Camila S.',
    origin: 'Santa Fe',
    quote:
      'Llegamos de noche y despertar con esa vista a la sierra fue de otro planeta. Ya reservamos para el año que viene.',
  },
  {
    id: 't7',
    name: 'Fam. Ibáñez',
    origin: 'Río Cuarto',
    quote:
      'La cabaña Traslasierra es perfecta para desconectar en pareja. Volvimos renovados.',
  },
  {
    id: 't8',
    name: 'Tomás D.',
    origin: 'La Plata',
    quote:
      'El trekking a la cascada que nos recomendaron valió cada minuto de caminata. Un lugar con anfitriones que se nota que aman lo que hacen.',
  },
  {
    id: 't9',
    name: 'Valentina G.',
    origin: 'Córdoba Capital',
    quote:
      'Hogar a leña, mate y cero señal. Exactamente lo que buscábamos después de un año agotador.',
  },
  {
    id: 't10',
    name: 'Fam. Torres',
    origin: 'Buenos Aires',
    quote:
      'Con chicos chicos no es fácil encontrar un lugar así de tranquilo y a la vez con tanto para explorar cerca.',
  },
]

export const galleryImages = [
  images.heroRoad,
  images.sierraFire,
  images.cumbrecitaHouse,
  images.skyAtFeet,
  images.riverYuspe,
  images.achalaWaterfall,
  images.cumbrecitaStream,
  images.greenery,
  images.nonoView,
  images.sierraPanorama,
]

export const activities = [
  {
    title: 'Avistaje de cóndores',
    place: 'Pampa de Achala',
    distance: '18 km',
    description:
      'El mirador natural de la Pampa de Achala es uno de los pocos lugares del país donde se puede ver volar al cóndor andino de cerca.',
    image: images.condor,
  },
  {
    title: 'Cabalgatas serranas',
    place: 'Camino de las Altas Cumbres',
    distance: '5 km',
    description:
      'Recorridos a caballo por los pastizales de altura, con guías locales que conocen cada quebrada del camino.',
    image: images.horseRider,
  },
  {
    title: 'Trekking a la cascada',
    place: 'Achala',
    distance: '12 km',
    description:
      'Una caminata de dificultad media entre roquedales de granito hasta una cascada escondida en la pampa alta.',
    image: images.achalaWaterfall,
  },
  {
    title: 'Pueblo alpino de La Cumbrecita',
    place: 'La Cumbrecita',
    distance: '46 km',
    description:
      'Un pueblo peatonal de arquitectura centroeuropea entre arroyos y bosques, ideal para una escapada de un día.',
    image: images.cumbrecitaStream,
  },
  {
    title: 'Pesca en el Río Yuspe',
    place: 'Los Gigantes',
    distance: '31 km',
    description:
      'Aguas frías de montaña rodeadas de paredones de granito, un clásico para quienes buscan pesca con mosca.',
    image: images.riverYuspe,
  },
  {
    title: 'Miradores de altura',
    place: 'Camino de las Altas Cumbres',
    distance: '3 km',
    description:
      'A pocos minutos de las cabañas, el camino asciende a más de 2200 metros con vistas abiertas al valle de Traslasierra.',
    image: images.skyAtFeet,
  },
]

export const location = {
  address: 'Camino de las Altas Cumbres, Sierras de Córdoba, Argentina',
  elevation: '2238 msnm',
  mapEmbedSrc:
    'https://www.google.com/maps?q=Camino+de+las+Altas+Cumbres,+C%C3%B3rdoba,+Argentina&output=embed',
  mapLinkHref:
    'https://www.google.com/maps/search/?api=1&query=Camino+de+las+Altas+Cumbres%2C+C%C3%B3rdoba%2C+Argentina',
}

export const contact = {
  phone: '+54 351 555 0142',
  whatsapp: 'https://wa.me/5493515550142',
  email: 'reservas@altascumbrescabanas.com.ar',
  instagram: 'https://instagram.com',
}
