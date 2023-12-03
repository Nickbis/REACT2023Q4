import { TypesForm } from '../shared/validation';

export interface UpdatedForm extends Omit<TypesForm, 'image'> {
  image: string | null;
}

export interface FormSliceState {
  forms: UpdatedForm[];
}
