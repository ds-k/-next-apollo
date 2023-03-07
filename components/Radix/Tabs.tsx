import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";

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
      <h1 className="text-2xl font-bold">Radix</h1>
      <Tabs.Root defaultValue="tab1" orientation="vertical">
        <Tabs.List aria-label="tabs example">
          {Object.keys(categories).map((label, idx) => (
            <Tabs.Trigger key={label} value={`tab${idx}`}>
              {label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {Object.keys(categories).map((label, idx) => (
          <Tabs.Content key={label} value={`tab${idx}`}>
            {categories[label]}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
};

export default TabsDemo;
