import { useState } from "react";
import { Tab } from "@headlessui/react";

const TabsDemo = () => {
  interface Icategories {
    [keyName: string]: any;
    상세정보: JSX.Element;
    금리및이율: JSX.Element;
    유의사항: JSX.Element;
    label?: "상세정보" | "금리및이율" | "유의사항";
  }
  let [categories] = useState<Icategories>({
    상세정보: <div>상세정보</div>,
    금리및이율: <div>금리 및 이율</div>,
    유의사항: <div>유의사항</div>,
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">HeadlessUI</h1>
      <Tab.Group>
        <Tab.List>
          {Object.keys(categories).map((label) => (
            <Tab key={label}>{label}</Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {Object.keys(categories).map((label) => (
            <Tab.Panel key={label}>{categories[label]}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabsDemo;
