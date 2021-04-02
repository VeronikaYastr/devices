import "./Spinner.css";

export const Spinner = (props: any) => {
  const inline = props.inline ? " inline" : "";
  return (
    <div className={`Spinner${inline}`}>
      <img src={`${process.env.PUBLIC_URL}/loading.gif`} alt="loading" />
    </div>
  );
};