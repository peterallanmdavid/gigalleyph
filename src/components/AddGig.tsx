"use client";

import React, { useState } from "react";
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { ModalProvider, useModal } from "providers/ModalProvider";

import { api } from "~/trpc/react";
import { Session } from "next-auth";
import Link from "next/link";
import { QueryClient } from "@tanstack/react-query";
interface AddGigProps {
  session: Session | null;
}

export const AddGig: React.FC<AddGigProps> = ({ session }) => {
  const { showModal, dismissModal } = useModal();

  const onShowAddGigModal = () => {
    console.log("show modal was called", showModal);
    showModal({
      title: "Add Gig",
      renderCustomBody: () => <AddGigModal dismissModal={dismissModal} />,
    });
  };
  return (
    <div className="flex justify-center align-middle">
      {session ? (
        <Button color="blue" pill onClick={onShowAddGigModal}>
          Add New Gig
        </Button>
      ) : (
        <Button
          color="blue"
          pill
          type="submit"
          className="mt-10"
          href={"/api/auth/signin"}
        >
          Sign in
        </Button>
      )}
    </div>
  );
};

const AddGigModal = ({ dismissModal }: { dismissModal: () => void }) => {
  const { mutate, error } = api.gig.create.useMutation({
    onSuccess: async () => {
      await {
        queryKey: ["gig.getAll"],
      };
      dismissModal?.();
    },
    onError: () => {
      alert("error occured");
    },
  });
  console.log("dismissModal", dismissModal);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        mutate({
          name: formData.get("name"),
          description: formData?.get("description"),
          performers: formData?.get("performers"),
        });
      }}
    >
      <FieldRow label="Name" name="name" />
      <FieldRow label="Description" name="description" />
      <FieldRow label="Performers" name="performers" />
      <Button color="blue" pill type="submit" className="mt-10">
        Submit
      </Button>
    </form>
  );
};

const FieldRow = ({
  label,
  isTextArea,
  placeholder,

  name,
}: {
  name: string;
  label: string;
  isTextArea?: boolean;
  placeholder?: string;
}) => {
  return (
    <>
      <div className="mb-2 block">
        <Label htmlFor="comment" value={label} />
      </div>
      {isTextArea ? (
        <Textarea
          id="comment"
          placeholder={placeholder}
          required
          rows={4}
          name={name}
        />
      ) : (
        <TextInput
          type="text"
          id="disabledInput1"
          placeholder={placeholder}
          name={name}
        />
      )}
    </>
  );
};
