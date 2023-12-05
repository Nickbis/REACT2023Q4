import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertJpegPng } from '../../shared/base64';
import { schemaValidate } from '../../shared/validation';
import { useAppDispatch } from '../../store/hooks';
import { addFormData } from '../../store/dataSlice';
import { ValidationError } from 'yup';

const Form2 = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const appRef = useRef(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const dataForm = appRef.current;
    if (!dataForm) {
      return;
    }

    const formData = new FormData(dataForm);

    try {
      const data = {
        name: formData.get('name'),
        age: Number(formData.get('age')),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmpassword: formData.get('confirmpassword'),
        checkbox: !!formData.get('checkbox'),
        gender: formData.get('gender'),
        image: [formData.get('image') as File],
      };
      
      const validateData = await schemaValidate.validate(data, {
        abortEarly: false,
      });
      const pictureFile = formData.get('image') as File;
      const image64 = pictureFile ? await convertJpegPng(pictureFile) : null;
      const result = { ...validateData, image: image64 };
      dispatch(addFormData(result));
      navigate('/');
    } catch (error) {
      const validationErrors: Record<string, string> = {};
      if (error instanceof ValidationError) {
        error.inner.forEach((e) => {
          if (e.path) validationErrors[e.path] = e.message;
        });
      }
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex justify-center items-center h-4 ">
      <form
        className="border-4 rounded-xl p-3 "
        onSubmit={handleSubmit}
        ref={appRef}
      >
        <p className="font-bold">Form 2 Uncontrolled:</p>

        <div className="relative">
          <label htmlFor="name" className=" block font-medium mb-1">
            Name:
          </label>
          <input
            id="name"
            name="name"
            autoComplete="on"
            className="mb-1 border-2 w-full"
          />
          {errors.name && (
            <p className="font-thin  text-red-500 mt-1 text-sm">
              {errors.name}
            </p>
          )}
        </div>

        <div className="relative">
          <label htmlFor="age" className="block font-medium mb-1">
            Age:
          </label>
          <input
            id="age"
            name="age"
            type="number"
            min={0}
            className="mb-1 border-2 w-full"
          />
          {errors.age && (
            <p className="font-thin  text-red-500 mt-1 text-sm">{errors.age}</p>
          )}
        </div>

        <div className="relative">
          <div className="mb-3">
            <label htmlFor="email" className="block font-medium mb-1">
              Email:
            </label>
            <input
              id="email"
              name="email"
              autoComplete="on"
              className="mb-1 border-2 w-full"
            />
            {errors.email && (
              <p className="font-thin  text-red-500 mt-1 text-sm">
                {errors.email}
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
              name="password"
              className="mb-1 border-2 w-full"
            />
            {errors.password && (
              <p className="font-thin  text-red-500 mt-1 text-sm">
                {errors.password}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmpassword" className="block font-medium mb-1">
              Confirm password:
            </label>
            <input
              id="confirmpassword"
              name="confirmpassword"
              className="mb-1 border-2 w-full"
            />
            {errors.confirmpassword && (
              <p className=" font-thin  text-red-500 mt-1 text-sm">
                {errors.confirmpassword}
              </p>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="mb-3">
            <div className="block font-medium mb-1">Gender:</div>
            <div>
              <input type="radio" id="male" name="gender" value="male" />
              <label className="cursor-pointer px-1" htmlFor="male">
                Male
              </label>

              <input type="radio" id="female" name="gender" value="female" />
              <label className="cursor-pointer px-1" htmlFor="female">
                Female
              </label>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="mb-3">
            <label htmlFor="picture" className="block font-medium mb-1">
              Upload Image:
            </label>
            <input
              id="picture"
              name="image"
              className="mb-1 border-2 w-full"
              type="file"
            />
            {errors.image && (
              <p className="font-thin  text-red-500 mt-1 text-sm">
                {errors.image}
              </p>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="mb-3 font-medium">
            <input
              id="forms-checkbox"
              name="checkbox"
              className=" cursor-pointer"
              type="checkbox"
            />
            <label htmlFor="forms-checkbox" className="cursor-pointer px-2 ">
              Accept T&C
            </label>
          </div>
          {errors.checkbox && (
            <p className="font-thin  text-red-500 mt-1 text-sm">
              {errors.checkbox}
            </p>
          )}
        </div>

        <input
          className="cursor-pointer text-green-500 font-extrabold"
          type="submit"
          value="SUBMIT"
        />
      </form>
    </div>
  );
};

export default Form2;
