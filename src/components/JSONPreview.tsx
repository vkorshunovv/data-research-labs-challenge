import { JSONPreviewProps } from "../types/types";

const JSONPreview = ({ data }: any) => {
  return (
    <div className="bg-slate-100 min-h-min h-1/2 flex flex-col justify-center items-center px-4">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default JSONPreview;
