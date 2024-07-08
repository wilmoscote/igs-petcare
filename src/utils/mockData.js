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

// export const petDataResponse = {
//   "message": "List",
//   "data": [
//       {
//           "id": 2,
//           "uuid": "01907a32-290a-71d7-b58d-3a3a8334054c",
//           "name": "V\u00e9nus",
//           "img_profile": "https:\/\/apiveterinary.3fixesdev.com\/storage\/images\/pet\/profile\/6685bbedc80af.webp",
//           "specie_id": 2,
//           "breed_id": 9,
//           "user_id": 3,
//           "gender": "female",
//           "birthday_date": "2018-09-11",
//           "deleted_at": null,
//           "created_at": "2024-07-03T20:03:46.000000Z",
//           "updated_at": "2024-07-03T21:00:29.000000Z",
//           "specie": {
//               "id": 2,
//               "name": "Perro",
//               "uuid": "0190797f-6809-71c0-a233-70cfdec4a054",
//               "name_alias": "perro",
//               "deleted_at": null,
//               "created_at": "2024-07-03T16:48:31.000000Z",
//               "updated_at": "2024-07-03T16:48:31.000000Z"
//           },
//           "breed": {
//               "id": 9,
//               "name": "Beagle",
//               "uuid": "0190797f-680e-70a1-a639-ba9607c61a72",
//               "name_alias": "beagle",
//               "specie_id": 2,
//               "deleted_at": null,
//               "created_at": "2024-07-03T16:48:31.000000Z",
//               "updated_at": "2024-07-03T16:48:31.000000Z"
//           }
//       },
//       {
//           "id": 4,
//           "uuid": "01907a66-ae00-705a-8453-4b4687f1b8e8",
//           "name": "Ori\u00f3n",
//           "img_profile": "https:\/\/apiveterinary.3fixesdev.com\/storage\/images\/pet\/profile\/6685bc13e99d9.jpg",
//           "specie_id": 1,
//           "breed_id": 4,
//           "user_id": 3,
//           "gender": "male",
//           "birthday_date": "2024-04-30",
//           "deleted_at": null,
//           "created_at": "2024-07-03T21:01:07.000000Z",
//           "updated_at": "2024-07-03T21:01:07.000000Z",
//           "specie": {
//               "id": 1,
//               "name": "Gato",
//               "uuid": "0190797f-6806-721d-aa99-e5b27bde3184",
//               "name_alias": "gato",
//               "deleted_at": null,
//               "created_at": "2024-07-03T16:48:31.000000Z",
//               "updated_at": "2024-07-03T16:48:31.000000Z"
//           },
//           "breed": {
//               "id": 4,
//               "name": "Com\u00fan",
//               "uuid": "0190797f-680c-7281-a788-7da3df0ff10d",
//               "name_alias": "com\u00fan",
//               "specie_id": 1,
//               "deleted_at": null,
//               "created_at": "2024-07-03T16:48:31.000000Z",
//               "updated_at": "2024-07-03T16:48:31.000000Z"
//           }
//       },
//       {
//           "id": 7,
//           "uuid": "01907a72-9be2-7375-9000-6a6e04a032d5",
//           "name": "Pedro",
//           "img_profile": "https:\/\/apiveterinary.3fixesdev.com\/storage\/images\/pet\/profile\/6685bf21b9322.webp",
//           "specie_id": 2,
//           "breed_id": 7,
//           "user_id": 3,
//           "gender": "male",
//           "birthday_date": "2024-05-01",
//           "deleted_at": null,
//           "created_at": "2024-07-03T21:14:09.000000Z",
//           "updated_at": "2024-07-03T21:14:27.000000Z",
//           "specie": {
//               "id": 2,
//               "name": "Perro",
//               "uuid": "0190797f-6809-71c0-a233-70cfdec4a054",
//               "name_alias": "perro",
//               "deleted_at": null,
//               "created_at": "2024-07-03T16:48:31.000000Z",
//               "updated_at": "2024-07-03T16:48:31.000000Z"
//           },
//           "breed": {
//               "id": 7,
//               "name": "Bulldog franc\u00e9s",
//               "uuid": "0190797f-680d-7389-a735-6aad5b340288",
//               "name_alias": "bulldogfrances",
//               "specie_id": 2,
//               "deleted_at": null,
//               "created_at": "2024-07-03T16:48:31.000000Z",
//               "updated_at": "2024-07-03T16:48:31.000000Z"
//           }
//       }
//   ],
//   "success": true
// }


// export const ownerData = {
//   "id": 3,
//   "name": "Owner Test",
//   "uuid": "0190759a-e37b-7262-99f4-3cbd5789",
//   "email": "owner@test.com",
//   "email_verified_at": null,
//   "status": "ACTIVE",
//   "dni": "987654321",
//   "otp_code": null,
//   "phone": "3214569874",
//   "address": "Calle 3 No 3-33",
//   "user_type_id": 1,
//   "deleted_at": null,
//   "created_at": "2024-07-02T22:40:03.000000Z",
//   "updated_at": "2024-07-08T17:20:11.000000Z",
//   "rol": [],
//   "roles": []
// }