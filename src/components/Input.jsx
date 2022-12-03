export const Input = (props) => {
  return (
    <label>
      {props.label}
      <input {...props} />
    </label>
  );
};
