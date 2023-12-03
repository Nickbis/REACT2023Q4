import * as yup from 'yup';

export interface TypesForm extends yup.InferType<typeof schemaValidate> {}
export const schemaValidate = yup.object().shape({

  name: yup
    .string()
    .required('Enter your name')
    .matches(/^[A-ZА-Я][a-zа-я]*$/, 'Name start with an uppercase letter'),

  age: yup
    .number()
    .required('Enter your age')
    .positive('Age is only positive number')
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable(),

  email: yup
    .string()
    .required('Enter your email')
    .email('Invalid email format'),

  password: yup
    .string()
    .required('Enter your password')
    .matches(
      /^(?=.*\d)(?=.*[A-ZА-Я])(?=.*[a-zа-я])(?=.*[^a-zа-яA-ZА-Я\d])/,
      'Password is very simple'
    ),
  confirmpassword: yup
    .string()
    .required('Retry password')
    .oneOf([yup.ref('password')], 'Passwords are different'),

  checkbox: yup.boolean().oneOf([true], 'You must accept the T&C'),

  gender: yup.string().default('male'),

  image: yup
    .mixed()
    .test('fileSize', 'File size limit (1 MB)', (value) => {
      const fileList = value as FileList;
      return fileList && fileList[0] && fileList[0].size <= 1024 * 1024;
    })
    .test(
      'fileType',
      'Invalid file type. Only PNG and JPEG are allowed',
      (value) => {
        const fileList = value as FileList;
        return (
          fileList &&
          fileList[0] &&
          ['image/png', 'image/jpeg'].includes(fileList[0].type)
        );
      }
    ),
});
