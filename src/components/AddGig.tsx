"use client";

import React, { useState } from "react";
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { ModalProvider, useModal } from "providers/ModalProvider";

import { api } from "~/trpc/react";
import { Session } from "next-auth";
import { Gig } from "@prisma/client";
import { useRouter } from "next/navigation";

interface AddGigProps {
  session: Session | null;
}

export const AddGig: React.FC<AddGigProps> = ({ session }) => {
  const { showModal, dismissModal } = useModal();

  const onShowAddGigModal = () => {
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
  const router = useRouter();
  const { mutate, isPending } = api.gig.create.useMutation({
    onSuccess: async () => {
      router.refresh();
      dismissModal?.();
    },
    onError: (e) => {
      console.log("this is the error", e);
      alert("error occured");
    },
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        mutate({
          name: formData.get("name") as Gig["name"],
          description: formData?.get("description") as Gig["description"],
          performers: formData?.get("performers") as Gig["performers"],
        });
      }}
    >
      <FieldRow label="Name" name="name" />
      <FieldRow label="Description" name="description" />
      <FieldRow label="Performers" name="performers" />
      <Button
        color="blue"
        pill
        type="submit"
        className="mt-10"
        isProcessing={isPending}
        disabled={isPending}
      >
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
