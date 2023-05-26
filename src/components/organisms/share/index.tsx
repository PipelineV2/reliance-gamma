import { useState } from "react";
import { MdContentCopy, MdShare } from "react-icons/md";
import SocialMediaShare from "../socialMedia";

type shareProps = {
  onCopy: () => any;
};
function Share({ onCopy }: shareProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isShare, setIsShare] = useState<boolean>(false);

  const handleCopy = () => {
    setIsCopied(true);
    onCopy();
    navigator.clipboard.writeText(onCopy());
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <>
      <div className={`grid ${isShare ? "grid-cols-4": "grid-cols-2"} place-items-center items-center h-[40px]  relative`}>
        {isCopied && (
          <p className="absolute top-[-2rem] left-0 bg-black text-xs py-1 px-2 font-bold text-white w-[150px] text-center ml-[-50px]">
            Shared link copied!
          </p>
        )}
        <span className="p-2 bg-gray-200 w-[35px] rounded-md cursor-pointer" onClick={handleCopy} >
          <MdContentCopy className="cursor-pointer" onClick={handleCopy} />
        </span>
        <span className="p-2 bg-gray-200 w-[35px] rounded-md cursor-pointer" onClick={() => setIsShare(!isShare)}>
          <MdShare
            className="cursor-pointer"
            onClick={() => setIsShare(!isShare)}
          />
        </span>
        {isShare && (
          <SocialMediaShare
            title="Reliance HMO Partners Search Result"
            url={onCopy()}
          />
        )}
      </div>
    </>
  );
}

export default Share;
