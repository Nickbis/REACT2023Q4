import { useAppSelector } from '../store/hooks';

const Cards = () => {
  const formDataList = useAppSelector((state) => state.dataForm.forms);

  return (
    <div className="flex flex-wrap gap-6 top-3 font-normal ">
      {formDataList.map((formData) => (
        <div
          className="w-56 border-b-blue-950 block text-sm mb-2 cursor-pointer border-2"
          key={formData.password}
        >
          <p>Name: {formData.name}</p>
          <p>Age: {formData.age}</p>
          <p>Email: {formData.email}</p>
          <p>Password: {formData.password}</p>
          <p>Gender: {formData.gender}</p>
          <p>__</p>
          <img
            className=" mt-2 rounded max-w-full h-auto "
            src={formData.image ? formData.image : ''}
            alt={formData.name}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
