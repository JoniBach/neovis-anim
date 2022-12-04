export const Input = (props) => {
  return (
    <div className="font-bold m-1 rounded bg-primary-1 text-white shadow-lg">
      <label>
        <span className="mx-4">{props.label}</span>
        <input {...props} />
      </label>
    </div>
  );
};
