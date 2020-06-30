export default function Button({ children, ...otherProps }) {
  return (
    <>
      <button {...otherProps}>{children}</button>
      <style jsx>{`
        button {
          background-color: #0090ff;
          padding: 16px 16px;
          border-radius: 4px;
          font-size: 22px;
          color: white;
          line-height: 22px;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
