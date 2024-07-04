import { Link } from "react-router-dom";
import FAQData from "../data/FAQData";
import { useMemo } from "react";

export default function Answers() {
  const faqData = useMemo(() => FAQData(), []);

  return (
    <>
      <h2 className="flex w-full justify-center font-nunito text-3xl text-defaultblue">
        Frequently Asked Questions & User Guide
      </h2>
      {faqData.map((data) => (
        <div
          key={data.id}
          className="flex w-full flex-col gap-6 text-slate-800"
        >
          <h2 className="font-lora text-2xl">{data?.sectionTitle}</h2>
          <ul className="flex list-disc flex-col gap-4 pl-10 font-lato text-xl">
            {data?.questionLinks?.map((linkData) => (
              <li
                key={linkData.id}
                className=" mr-auto cursor-pointer py-2 hover:text-sky-600"
              >
                <Link to={linkData?.url}>{linkData?.question}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
