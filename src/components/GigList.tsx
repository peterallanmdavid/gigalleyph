import { Card } from "flowbite-react";
import React from "react";
import { api } from "~/trpc/server";

interface GigListProps {}

export const GigList: React.FC<GigListProps> = async () => {
  const data = await api.gig.getAll();

  return (
    <div className="flex flex-1 flex-col items-center justify-center  p-10 align-middle">
      {data?.map((item) => (
        <Card href="#" className="mb-5 flex max-w-sm" key={item.id}>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item.name}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {item.description}
          </p>
        </Card>
      ))}
    </div>
  );
};
