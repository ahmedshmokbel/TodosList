import * as yup from 'yup';
 import { I18nManager } from 'react-native';

const {isRTL} = I18nManager;

 


export const validateTodoData = yup.object().shape({
 
  Description: yup
  .string()
  .required("Enter the book description"),

 
});
 