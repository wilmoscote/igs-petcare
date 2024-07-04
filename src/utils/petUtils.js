import { differenceInYears, differenceInMonths, differenceInDays, parseISO } from 'date-fns';
import es from 'date-fns/locale/es';

export const formatAge = (birthday_date) => {
    const now = new Date();
    const birthDate = parseISO(birthday_date);
    const years = differenceInYears(now, birthDate);
    const months = differenceInMonths(now, birthDate) % 12;
    const days = differenceInDays(now, birthDate) % 30;

    let ageString = '';

    if (years > 0) {
      ageString += `${years} año${years > 1 ? 's' : ''}`;
    }
    if (months > 0) {
      if (ageString) ageString += ' y ';
      ageString += `${months} mes${months > 1 ? 'es' : ''}`;
    }
    if (!years && !months && days > 0) {
      ageString += `${days} día${days > 1 ? 's' : ''}`;
    }

    return ageString;
  };