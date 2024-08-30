const IFrame = (props: {
  data: {
    url: string;
  };
}) => {
  return <iframe src={props.data.url} className="h-full w-full"></iframe>;
};

export default IFrame;
