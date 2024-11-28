import { JSONPreviewProps } from "../types/types";

const JSONPreview = ({ data }: JSONPreviewProps) => {
  return (
    //TODO set fixed list order
    <div className="w-full flex flex-col justify-center items-center p-4 border-t">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default JSONPreview;
