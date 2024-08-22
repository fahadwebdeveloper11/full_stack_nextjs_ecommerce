import { aboutServicesData } from "@/constant/servicesData";
import { memo } from "react";

const OurServices = () => {
  return (
    <div>
      <div className="px-[10px] md:px-10 flex-wrap flex mx-auto justify-center sm:justify-between sm:flex-row flex-col items-center gap-8 py-8 md:py-16">
        {aboutServicesData.map((data, index) => (
          <AboutServicesCard key={index} datas={data} />
        ))}
      </div>
    </div>
  );
};

memo(function AboutServicesCard({ datas }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-14 mb-5">{datas.icon}</div>
      <h1 className="mb-3 text-xl font-medium text-[#2B2B2B] capitalize dark:text-gray-200">
        {datas.title}
      </h1>
      <p className="text-[#57667e] dark:text-gray-500 text-lg">
        {datas.shortDesc}
      </p>
    </div>
  );
});

export default OurServices;
