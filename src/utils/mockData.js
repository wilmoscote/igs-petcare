import dogMemoji from 'assets/images/pets/dogMemoji.webp'
import catMemoji from 'assets/images/pets/catMemoji.webp'
import catMemoji1 from 'assets/images/pets/catMemoji1.webp'
import { Health, Briefcase, Worm, ShieldTick, Microchip, Scissors, Scissor, SearchNormal1 } from 'iconsax-react';

export const mockServicesData = [
  {
    id: 1,
    name: 'Examen de Bienestar',
    icon: <Health size="32" variant="Bulk" />,
    description: 'Un examen completo para asegurar el bienestar de tu mascota.'
  },
  {
    id: 2,
    name: 'Vacunas',
    icon: <Briefcase size="32" variant="Bulk" />,
    description: 'Vacunas esenciales para mantener a tu mascota saludable.'
  },
  {
    id: 3,
    name: 'Desparasitación',
    icon: <Briefcase size="32" variant="Bulk" />,
    description: 'Eliminación de parásitos internos y externos.'
  },
  {
    id: 4,
    name: 'Prevención de Pulgas y Garrapatas',
    icon: <Briefcase size="32" variant="Bulk" />,
    description: 'Prevención de infestaciones de pulgas y garrapatas.'
  },
  {
    id: 5,
    name: 'Microchip ID',
    icon: <Briefcase size="32" variant="Bulk" />,
    description: 'Identificación permanente para tu mascota con microchip.'
  },
  {
    id: 6,
    name: 'Esterilización/Castración',
    icon: <Scissor size="32" variant="Bulk" />,
    description: 'Procedimiento quirúrgico para esterilizar o castrar a tu mascota.'
  }
];

export const mockClinicsData = [
  { id: 1, name: 'Clínica Veterinaria Centro' },
  { id: 2, name: 'Clínica Veterinaria Norte' },
  { id: 3, name: 'Clínica Veterinaria Sur' }
];

export const mockPetsData = [
  {
    id: 1,
    name: 'Roku',
    species: 'Perro',
    breed: 'Labrador',
    sex: 'Macho',
    dateOfBirth: '01/01/2020',
    avatar: dogMemoji
  },
  {
    id: 2,
    name: 'Max',
    species: 'Perro',
    breed: 'Golden Retriever',
    sex: 'Macho',
    dateOfBirth: '02/15/2018',
    avatar: dogMemoji
  },
  {
    id: 3,
    name: 'Venus',
    species: 'Perro',
    breed: 'Poodle',
    sex: 'Hembra',
    dateOfBirth: '11/11/2018',
    avatar: dogMemoji
  },
  {
    id: 4,
    name: 'Luna',
    species: 'Gato',
    breed: 'Persian',
    sex: 'Hembra',
    dateOfBirth: '05/10/2019',
    avatar: catMemoji1
  }
];