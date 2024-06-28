"use client";

import { Card } from "flowbite-react";
import React from "react";
import { api } from "~/trpc/react";
interface GigListProps {}

export const GigList: React.FC<GigListProps> = () => {
  const gigList = api.gig.getAll.useQuery();

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-orange-50 p-10 align-middle">
      {gigList?.data?.map((item) => (
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
