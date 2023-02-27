export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: ["dd.MM.yyyy", "dd/MM/yyyy", "dd,MM,yyyy"], // to accept different input styles from user
  },
  display: {
    dateInput: "dd.MM.yyyy", // display format in input field
    monthYearLabel: 'yyyy MMMM',
    dateA11yLabel: 'MMMM d, y',//'LL',
    monthYearA11yLabel: 'MMMM yyyy'
  },
};
