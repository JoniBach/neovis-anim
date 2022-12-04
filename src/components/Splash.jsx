export const Splash = ({ children }) => {
  return (
    <div className="flex w-screen h-screen justify-center bg-primary-1 shadow-inner">
      <div className="shadow-2xl rounded-xl self-center bg-primary-3 p-10">
        {children}
      </div>
    </div>
  );
};
