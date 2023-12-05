import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { convertJpegPng } from '../../shared/base64';
import { TypesForm, schemaValidate } from '../../shared/validation';
import { useAppDispatch } from '../../store/hooks';
import { addFormData } from '../../store/dataSlice';

const Form1 = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TypesForm>({
    mode: 'onChange',
    resolver: yupResolver(schemaValidate),
  });

  const onSubmit = async (data: TypesForm) => {
    if (data.image !== undefined) {
      const image = data.image as FileList;
      const image64 = await convertJpegPng(image[0]);
      const result = { ...data, image: image64 };
      dispatch(addFormData(result));
      navigate('/');
    }
  };

  return (
    <div className="flex justify-center items-center h-4 ">
      <form
        className="border-4 rounded-xl p-3 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="font-bold">Form 1 Controlled:</p>

        <div className="relative">
          <label htmlFor="name" className=" block font-medium mb-1">
            Name:
          </label>
          <input
            id="name"
            autoComplete="on"
            className="mb-1 border-2 w-full"
            {...register('name')}
          />
          {errors.name && (
            <p className="font-thin  text-red-500 mt-1 text-sm">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label htmlFor="age" className="block font-medium mb-1">
            Age:
          </label>
          <input
            id="age"
            type="number"
            min={0}
            className="mb-1 border-2 w-full"
            {...register('age')}
          />
          {errors.age && (
            <p className="font-thin  text-red-500 mt-1 text-sm">
              {errors.age.message}
            </p>
          )}
        </div>

        <div className="relative">
          <div className="mb-3">
            <label htmlFor="email" className="block font-medium mb-1">
              Email:
            </label>
            <input
              id="email"
              autoComplete="on"
              className="mb-1 border-2 w-full"
              {...register('email')}
            />
            {errors.email && (
              <p className="font-thin  text-red-500 mt-1 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="mb-3">
            <label htmlFor="password" className="block font-medium mb-1">
              Password:
            </label>
            <input
              id="password"
              className="mb-1 border-2 w-full"
              {...register('password')}
            />
            {errors.password && (
              <p className="font-thin  text-red-500 mt-1 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmpassword" className="block font-medium mb-1">
              Confirm password:
            </label>
            <input
              id="confirmpassword"
              className="mb-1 border-2 w-full"
              {...register('confirmpassword')}
            />
            {errors.confirmpassword && (
              <p className=" font-thin  text-red-500 mt-1 text-sm">
                {errors.confirmpassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="mb-3">
            <div className="block font-medium mb-1">Gender:</div>
            <div>
              <input
                type="radio"
                id="male"
                value="male"
                {...register('gender')}
              />
              <label className="cursor-pointer px-1" htmlFor="male">
                Male
              </label>

              <input
                type="radio"
                id="female"
                value="female"
                {...register('gender')}
              />
              <label className="cursor-pointer px-1" htmlFor="female">
                Female
              </label>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="mb-3">
            <label htmlFor="picture" className="block font-medium mb-1">
              Upload Picture:
            </label>
            <input
              id="picture"
              className="mb-1 border-2 w-full"
              {...register('image', { required: 'Picture is required' })}
              type="file"
            />
            {errors.image && (
              <p className="font-thin  text-red-500 mt-1 text-sm">
                {errors.image.message}
              </p>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="mb-3 font-medium">
            <input
              id="forms-checkbox"
              className=" cursor-pointer"
              {...register('checkbox')}
              type="checkbox"
            />
            <label htmlFor="forms-checkbox" className="cursor-pointer px-2 ">
              Accept T&C
            </label>
          </div>
        </div>

        <input
          className={`cursor-pointer text-green-500 font-extrabold ${
            !isValid ? 'cursor-not-allowed text-blue-500 font-light' : ''
          }`}
          type="submit"
          value="SUBMIT"
          disabled={!isValid}
        />
      </form>
    </div>
  );
};

export default Form1;
