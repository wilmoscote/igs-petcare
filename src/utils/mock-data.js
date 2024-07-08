// third-party
import { sub } from 'date-fns';
import { Chance } from 'chance';
import lodash from 'lodash';

const chance = new Chance();

export const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i += 1) {
    arr.push(i);
  }
  return arr;
};

const skills = [
  'UI Design',
  'Mobile App',
  'Web App',
  'UX',
  'Wireframing',
  'Prototyping',
  'Backend',
  'React',
  'Angular',
  'Javascript',
  'HTML',
  'ES6',
  'Figma',
  'Codeigniter'
];

const time = ['just now', '1 day ago', '2 min ago', '2 days ago', '1 week ago', '1 year ago', '5 months ago', '3 hours ago', '1 hour ago'];

// ==============================|| CUSTOM FUNCTION - TABLE DATA ||============================== //

function mockData() {
  return {
    id: (index) => `${chance.bb_pin()}${index}`,
    email: chance.email({ domain: 'gmail.com' }),
    contact: chance.phone(),
    datetime: sub(new Date(), {
      days: chance.integer({ min: 0, max: 30 }),
      hours: chance.integer({ min: 0, max: 23 }),
      minutes: chance.integer({ min: 0, max: 59 })
    }),
    boolean: chance.bool(),
    role: chance.profession(),
    company: chance.company(),
    address: {
      full: `${chance.address()}, ${chance.city()}, ${chance.country({ full: true })} - ${chance.zip()}`,
      country: chance.country({ full: true })
    },
    name: {
      first: chance.first(),
      last: chance.last(),
      full: chance.name()
    },
    text: {
      title: chance.sentence({ words: chance.integer({ min: 4, max: 12 }) }),
      sentence: chance.sentence(),
      description: chance.paragraph
    },
    number: {
      percentage: chance.integer({ min: 0, max: 100 }),
      rating: chance.floating({ min: 0, max: 5, fixed: 2 }),
      status: (min, max) => chance.integer({ min, max }),
      age: chance.age(),
      amount: chance.integer({ min: 1, max: 10000 })
    },
    image: {
      product: (index) => `product_${index}`,
      avatar: (index) => `avatar_${index}`
    },
    skill: lodash.sampleSize(skills, chance.integer({ min: 2, max: 6 })),
    time: lodash.sampleSize(time)
  };
}

export const mockAppoinmentData =  [
  {
    id: 1,
    uuid: '01908434-af02-707b-914f-0f783226e8ce',
    booking_code: 'VET66883EA38F510',
    additional_info: 'Tener en cuenta lo siguiente...',
    additional_contact: '3013163207',
    user_id: 3,
    service_id: 3,
    pet_id: 2,
    clinic_id: 1,
    date: '2024-07-30 07:00:00',
    deleted_at: null,
    created_at: '2024-07-05T18:42:43.000000Z',
    updated_at: '2024-07-05T18:42:43.000000Z',
    status: 'active',
    pets: {
      id: 2,
      uuid: '01907a32-290a-71d7-b58d-3a3a8334054c',
      name: 'Vénus',
      img_profile: 
        'https://apiveterinary.3fixesdev.com/storage/images/pet/profile/6685bbedc80af.webp',
      specie_id: 2,
      breed_id: 9,
      user_id: 3,
      gender: 'female',
      birthday_date: '2018-09-11',
      deleted_at: null,
      created_at: '2024-07-03T20:03:46.000000Z',
      updated_at: '2024-07-03T21:00:29.000000Z'
    },
    service: {
      id: 3,
      name: 'AUXILIO Y COORDINACIÓN PARA CASTRACIÓN',
      uuid: '01907f98-8de0-7102-9866-10177d093da8',
      name_alias: 'CASTRACIÓN',
      description: null,
      description_time: '1 hora / 2 horas',
      img: null,
      deleted_at: null,
      created_at: '2024-07-04T21:13:42.000000Z',
      updated_at: '2024-07-04T21:13:42.000000Z'
    },
    clinic: {
      id: 1,
      name: 'Animal Clinic Hospital Veterinario',
      name_alias: 'AnimalClinicHospitalVeterinario',
      uuid: '01907e64-305c-72ab-af76-325b5e3d3fd1',
      logo: null,
      phone: null,
      address: 'C. Mustafá Kemal Ataturk 41, Santo Domingo 10121',
      status: 'active',
      time_start: '07:00:00',
      time_end: '19:00:00',
      number_booking_hour: 5,
      deleted_at: null,
      created_at: '2024-07-04T15:36:53.000000Z',
      updated_at: '2024-07-04T15:36:53.000000Z',
      number_booking_enabled: 5
    }
  },
  {
    id: 3,
    uuid: '01908495-f19c-71d6-a8dd-63fc50153a09',
    booking_code: 'VET6688578999BAE',
    additional_info: null,
    additional_contact: '3214569874',
    user_id: 3,
    service_id: 1,
    pet_id: 2,
    clinic_id: 2,
    date: '2024-07-31 15:00:00',
    deleted_at: null,
    created_at: '2024-07-05T20:28:57.000000Z',
    updated_at: '2024-07-05T20:28:57.000000Z',
    status: 'active',
    pets: {
      id: 2,
      uuid: '01907a32-290a-71d7-b58d-3a3a8334054c',
      name: 'Vénus',
      img_profile: 
        'https://apiveterinary.3fixesdev.com/storage/images/pet/profile/6685bbedc80af.webp',
      specie_id: 2,
      breed_id: 9,
      user_id: 3,
      gender: 'female',
      birthday_date: '2018-09-11',
      deleted_at: null,
      created_at: '2024-07-03T20:03:46.000000Z',
      updated_at: '2024-07-03T21:00:29.000000Z'
    },
    service: {
      id: 1,
      name: 'TELECONSULTA (ORIENTACIÓN MÉDICA VETERINARIA TELEFÓNICA)',
      uuid: '01907f98-8ddc-720c-918d-60dbb8947fc1',
      name_alias: 'TELECONSULTA',
      description: null,
      description_time: '15 minutos',
      img: null,
      deleted_at: null,
      created_at: '2024-07-04T21:13:42.000000Z',
      updated_at: '2024-07-04T21:13:42.000000Z'
    },
    clinic: {
      id: 2,
      name: 'Aqua Vet',
      name_alias: 'AquaVet',
      uuid: '01907e64-3061-73b2-9d40-a7250a9dc7dd',
      logo: null,
      phone: null,
      address: 'C. Clara Pardo 36, Santo Domingo 10134',
      status: 'active',
      time_start: '07:00:00',
      time_end: '19:00:00',
      number_booking_hour: 7,
      deleted_at: null,
      created_at: '2024-07-04T15:36:53.000000Z',
      updated_at: '2024-07-04T15:36:53.000000Z',
      number_booking_enabled: 7
    }
  },
  {
    id: 4,
    uuid: '019084bc-33bd-73b3-9839-4cd9b729d4f8',
    booking_code: 'VET66886154E2352',
    additional_info: 'Solo es una prueba...',
    additional_contact: '3214569874',
    user_id: 3,
    service_id: 10,
    pet_id: 7,
    clinic_id: 3,
    date: '2024-07-31 16:00:00',
    deleted_at: null,
    created_at: '2024-07-05T21:10:44.000000Z',
    updated_at: '2024-07-05T21:10:44.000000Z',
    status: 'active',
    pets: {
      id: 7,
      uuid: '01907a72-9be2-7375-9000-6a6e04a032d5',
      name: 'Pedro',
      img_profile: 
        'https://apiveterinary.3fixesdev.com/storage/images/pet/profile/6685bf21b9322.webp',
      specie_id: 2,
      breed_id: 7,
      user_id: 3,
      gender: 'male',
      birthday_date: '2024-05-01',
      deleted_at: null,
      created_at: '2024-07-03T21:14:09.000000Z',
      updated_at: '2024-07-03T21:14:27.000000Z'
    },
    service: {
      id: 10,
      name: 'PIPETA ANTIPULGAS',
      uuid: '01907f98-8de2-70b8-821b-940d61d357c9',
      name_alias: 'PIPETAANTIPULGAS',
      description: null,
      description_time: '30 minutos/ 48 horas',
      img: null,
      deleted_at: null,
      created_at: '2024-07-04T21:13:42.000000Z',
      updated_at: '2024-07-04T21:13:42.000000Z'
    },
    clinic: {
      id: 3,
      name: 'Vet Metro',
      name_alias: 'VetMetro1',
      uuid: '01907e64-3061-73b2-9d40-a7250aae2b27',
      logo: null,
      phone: null,
      address: 'C Manuel de Jesús Troncoso 61, Santo Domingo 11005',
      status: 'active',
      time_start: '07:00:00',
      time_end: '19:00:00',
      number_booking_hour: 5,
      deleted_at: null,
      created_at: '2024-07-04T15:36:53.000000Z',
      updated_at: '2024-07-04T15:36:53.000000Z',
      number_booking_enabled: 5
    }
  },
  {
    id: 5,
    uuid: '019084d8-f53e-7210-8d6a-0cba555028c1',
    booking_code: 'VET668868B173114',
    additional_info: 'Test agenda mascota...',
    additional_contact: '3013163200',
    user_id: 3,
    service_id: 6,
    pet_id: 4,
    clinic_id: 4,
    date: '2024-07-30 08:30:00',
    deleted_at: null,
    created_at: '2024-07-05T21:42:09.000000Z',
    updated_at: '2024-07-05T21:42:09.000000Z',
    status: 'active',
    pets: {
      id: 4,
      uuid: '01907a66-ae00-705a-8453-4b4687f1b8e8',
      name: 'Orión',
      img_profile: 
        'https://apiveterinary.3fixesdev.com/storage/images/pet/profile/6685bc13e99d9.jpg',
      specie_id: 1,
      breed_id: 4,
      user_id: 3,
      gender: 'male',
      birthday_date: '2024-04-30',
      deleted_at: null,
      created_at: '2024-07-03T21:01:07.000000Z',
      updated_at: '2024-07-03T21:01:07.000000Z'
    },
    service: {
      id: 6,
      name: 'AUXILIO POR HOSPITALIZACIÓN',
      uuid: '01907f98-8de1-73ac-9e2b-df1ea2bc3328',
      name_alias: 'HOSPITALIZACIÓN',
      description: null,
      description_time: null,
      img: null,
      deleted_at: null,
      created_at: '2024-07-04T21:13:42.000000Z',
      updated_at: '2024-07-04T21:13:42.000000Z'
    },
    clinic: {
      id: 4,
      name: 'Vet Plaza',
      name_alias: 'VetMetro2',
      uuid: '01907e64-3062-71b2-b50c-f50e2808a104',
      logo: null,
      phone: null,
      address: 'C. Benito Monción 202, Santo Domingo 10205',
      status: 'active',
      time_start: '07:00:00',
      time_end: '19:00:00',
      number_booking_hour: 4,
      deleted_at: null,
      created_at: '2024-07-04T15:36:53.000000Z',
      updated_at: '2024-07-04T15:36:53.000000Z',
      number_booking_enabled: 4
    }
  },


  {
    id: 10,
    uuid: '01908434-af02-707b-914f-0f7832266e8ce',
    booking_code: 'VET66883EA38F510',
    additional_info: 'Tener en cuenta lo siguiente...',
    additional_contact: '3013163207',
    user_id: 3,
    service_id: 3,
    pet_id: 2,
    clinic_id: 1,
    date: '2024-07-30 07:00:00',
    deleted_at: null,
    created_at: '2024-07-05T18:42:43.000000Z',
    updated_at: '2024-07-05T18:42:43.000000Z',
    status: 'active',
    pets: {
      id: 2,
      uuid: '01907a32-290a-71d7-b58d-3a3a8334054c',
      name: 'Vénus',
      img_profile: 
        'https://apiveterinary.3fixesdev.com/storage/images/pet/profile/6685bbedc80af.webp',
      specie_id: 2,
      breed_id: 9,
      user_id: 3,
      gender: 'female',
      birthday_date: '2018-09-11',
      deleted_at: null,
      created_at: '2024-07-03T20:03:46.000000Z',
      updated_at: '2024-07-03T21:00:29.000000Z'
    },
    service: {
      id: 3,
      name: 'AUXILIO Y COORDINACIÓN PARA CASTRACIÓN',
      uuid: '01907f98-8de0-7102-9866-10177d093da8',
      name_alias: 'CASTRACIÓN',
      description: null,
      description_time: '1 hora / 2 horas',
      img: null,
      deleted_at: null,
      created_at: '2024-07-04T21:13:42.000000Z',
      updated_at: '2024-07-04T21:13:42.000000Z'
    },
    clinic: {
      id: 1,
      name: 'Animal Clinic Hospital Veterinario',
      name_alias: 'AnimalClinicHospitalVeterinario',
      uuid: '01907e64-305c-72ab-af76-325b5e3d3fd1',
      logo: null,
      phone: null,
      address: 'C. Mustafá Kemal Ataturk 41, Santo Domingo 10121',
      status: 'active',
      time_start: '07:00:00',
      time_end: '19:00:00',
      number_booking_hour: 5,
      deleted_at: null,
      created_at: '2024-07-04T15:36:53.000000Z',
      updated_at: '2024-07-04T15:36:53.000000Z',
      number_booking_enabled: 5
    }
  },
  {
    id: 21,
    uuid: '01908434-af02-707b-914f-0f7832265e8ce',
    booking_code: 'VET66883EA38F510',
    additional_info: 'Tener en cuenta lo siguiente...',
    additional_contact: '3013163207',
    user_id: 3,
    service_id: 3,
    pet_id: 2,
    clinic_id: 1,
    date: '2024-07-30 07:00:00',
    deleted_at: null,
    created_at: '2024-07-05T18:42:43.000000Z',
    updated_at: '2024-07-05T18:42:43.000000Z',
    status: 'active',
    pets: {
      id: 2,
      uuid: '01907a32-290a-71d7-b58d-3a3a8334054c',
      name: 'Vénus',
      img_profile: 
        'https://apiveterinary.3fixesdev.com/storage/images/pet/profile/6685bbedc80af.webp',
      specie_id: 2,
      breed_id: 9,
      user_id: 3,
      gender: 'female',
      birthday_date: '2018-09-11',
      deleted_at: null,
      created_at: '2024-07-03T20:03:46.000000Z',
      updated_at: '2024-07-03T21:00:29.000000Z'
    },
    service: {
      id: 3,
      name: 'AUXILIO Y COORDINACIÓN PARA CASTRACIÓN',
      uuid: '01907f98-8de0-7102-9866-10177d093da8',
      name_alias: 'CASTRACIÓN',
      description: null,
      description_time: '1 hora / 2 horas',
      img: null,
      deleted_at: null,
      created_at: '2024-07-04T21:13:42.000000Z',
      updated_at: '2024-07-04T21:13:42.000000Z'
    },
    clinic: {
      id: 1,
      name: 'Animal Clinic Hospital Veterinario',
      name_alias: 'AnimalClinicHospitalVeterinario',
      uuid: '01907e64-305c-72ab-af76-325b5e3d3fd1',
      logo: null,
      phone: null,
      address: 'C. Mustafá Kemal Ataturk 41, Santo Domingo 10121',
      status: 'active',
      time_start: '07:00:00',
      time_end: '19:00:00',
      number_booking_hour: 5,
      deleted_at: null,
      created_at: '2024-07-04T15:36:53.000000Z',
      updated_at: '2024-07-04T15:36:53.000000Z',
      number_booking_enabled: 5
    }
  },
  {
    id: 31,
    uuid: '01908434-af02-707b-914f-0f7832246e8ce',
    booking_code: 'VET66883EA38F510',
    additional_info: 'Tener en cuenta lo siguiente...',
    additional_contact: '3013163207',
    user_id: 3,
    service_id: 3,
    pet_id: 2,
    clinic_id: 1,
    date: '2024-07-30 07:00:00',
    deleted_at: null,
    created_at: '2024-07-05T18:42:43.000000Z',
    updated_at: '2024-07-05T18:42:43.000000Z',
    status: 'active',
    pets: {
      id: 2,
      uuid: '01907a32-290a-71d7-b58d-3a3a8334054c',
      name: 'Vénus',
      img_profile: 
        'https://apiveterinary.3fixesdev.com/storage/images/pet/profile/6685bbedc80af.webp',
      specie_id: 2,
      breed_id: 9,
      user_id: 3,
      gender: 'female',
      birthday_date: '2018-09-11',
      deleted_at: null,
      created_at: '2024-07-03T20:03:46.000000Z',
      updated_at: '2024-07-03T21:00:29.000000Z'
    },
    service: {
      id: 3,
      name: 'AUXILIO Y COORDINACIÓN PARA CASTRACIÓN',
      uuid: '01907f98-8de0-7102-9866-10177d093da8',
      name_alias: 'CASTRACIÓN',
      description: null,
      description_time: '1 hora / 2 horas',
      img: null,
      deleted_at: null,
      created_at: '2024-07-04T21:13:42.000000Z',
      updated_at: '2024-07-04T21:13:42.000000Z'
    },
    clinic: {
      id: 1,
      name: 'Animal Clinic Hospital Veterinario',
      name_alias: 'AnimalClinicHospitalVeterinario',
      uuid: '01907e64-305c-72ab-af76-325b5e3d3fd1',
      logo: null,
      phone: null,
      address: 'C. Mustafá Kemal Ataturk 41, Santo Domingo 10121',
      status: 'active',
      time_start: '07:00:00',
      time_end: '19:00:00',
      number_booking_hour: 5,
      deleted_at: null,
      created_at: '2024-07-04T15:36:53.000000Z',
      updated_at: '2024-07-04T15:36:53.000000Z',
      number_booking_enabled: 5
    }
  },
  {
    id: 41,
    uuid: '01908434-af02-707b-914f-0f783226e38ce',
    booking_code: 'VET66883EA38F510',
    additional_info: 'Tener en cuenta lo siguiente...',
    additional_contact: '3013163207',
    user_id: 3,
    service_id: 3,
    pet_id: 2,
    clinic_id: 1,
    date: '2024-07-30 07:00:00',
    deleted_at: null,
    created_at: '2024-07-05T18:42:43.000000Z',
    updated_at: '2024-07-05T18:42:43.000000Z',
    status: 'active',
    pets: {
      id: 2,
      uuid: '01907a32-290a-71d7-b58d-3a3a8334054c',
      name: 'Vénus',
      img_profile: 
        'https://apiveterinary.3fixesdev.com/storage/images/pet/profile/6685bbedc80af.webp',
      specie_id: 2,
      breed_id: 9,
      user_id: 3,
      gender: 'female',
      birthday_date: '2018-09-11',
      deleted_at: null,
      created_at: '2024-07-03T20:03:46.000000Z',
      updated_at: '2024-07-03T21:00:29.000000Z'
    },
    service: {
      id: 3,
      name: 'AUXILIO Y COORDINACIÓN PARA CASTRACIÓN',
      uuid: '01907f98-8de0-7102-9866-10177d093da8',
      name_alias: 'CASTRACIÓN',
      description: null,
      description_time: '1 hora / 2 horas',
      img: null,
      deleted_at: null,
      created_at: '2024-07-04T21:13:42.000000Z',
      updated_at: '2024-07-04T21:13:42.000000Z'
    },
    clinic: {
      id: 1,
      name: 'Animal Clinic Hospital Veterinario',
      name_alias: 'AnimalClinicHospitalVeterinario',
      uuid: '01907e64-305c-72ab-af76-325b5e3d3fd1',
      logo: null,
      phone: null,
      address: 'C. Mustafá Kemal Ataturk 41, Santo Domingo 10121',
      status: 'active',
      time_start: '07:00:00',
      time_end: '19:00:00',
      number_booking_hour: 5,
      deleted_at: null,
      created_at: '2024-07-04T15:36:53.000000Z',
      updated_at: '2024-07-04T15:36:53.000000Z',
      number_booking_enabled: 5
    }
  },
  {
    id: 51,
    uuid: '01908434-af02-707b-914f-0f783226e8c2e',
    booking_code: 'VET66883EA38F510',
    additional_info: 'Tener en cuenta lo siguiente...',
    additional_contact: '3013163207',
    user_id: 3,
    service_id: 3,
    pet_id: 2,
    clinic_id: 1,
    date: '2024-07-30 07:00:00',
    deleted_at: null,
    created_at: '2024-07-05T18:42:43.000000Z',
    updated_at: '2024-07-05T18:42:43.000000Z',
    status: 'active',
    pets: {
      id: 2,
      uuid: '01907a32-290a-71d7-b58d-3a3a8334054c',
      name: 'Vénus',
      img_profile: 
        'https://apiveterinary.3fixesdev.com/storage/images/pet/profile/6685bbedc80af.webp',
      specie_id: 2,
      breed_id: 9,
      user_id: 3,
      gender: 'female',
      birthday_date: '2018-09-11',
      deleted_at: null,
      created_at: '2024-07-03T20:03:46.000000Z',
      updated_at: '2024-07-03T21:00:29.000000Z'
    },
    service: {
      id: 3,
      name: 'AUXILIO Y COORDINACIÓN PARA CASTRACIÓN',
      uuid: '01907f98-8de0-7102-9866-10177d093da8',
      name_alias: 'CASTRACIÓN',
      description: null,
      description_time: '1 hora / 2 horas',
      img: null,
      deleted_at: null,
      created_at: '2024-07-04T21:13:42.000000Z',
      updated_at: '2024-07-04T21:13:42.000000Z'
    },
    clinic: {
      id: 1,
      name: 'Animal Clinic Hospital Veterinario',
      name_alias: 'AnimalClinicHospitalVeterinario',
      uuid: '01907e64-305c-72ab-af76-325b5e3d3fd1',
      logo: null,
      phone: null,
      address: 'C. Mustafá Kemal Ataturk 41, Santo Domingo 10121',
      status: 'active',
      time_start: '07:00:00',
      time_end: '19:00:00',
      number_booking_hour: 5,
      deleted_at: null,
      created_at: '2024-07-04T15:36:53.000000Z',
      updated_at: '2024-07-04T15:36:53.000000Z',
      number_booking_enabled: 5
    }
  },
]

export default mockData;
