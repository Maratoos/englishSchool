import React, { FC, useState } from "react";
import { IReview } from "../../../models/models";
import { Modal } from "../../../components/Modal/Modal";
import { TextField, Button } from "@mui/material";
import { useCollection } from "../../../hooks/useColection";

interface Props {
  active: boolean;
  document: IReview;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  collectionName: string;
}

export const ChangeReview: FC<Props> = ({
  active,
  setActive,
  document,
  collectionName,
}) => {
  const [newData, setNewData] = useState<Omit<IReview, "id" | "createdAt">>({
    name: document.name,
    instName: document.instName,
    review: document.review,
  });
  const [isPending, setIsPending] = useState<boolean>(false);
  const { updateDocument } = useCollection(collectionName);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    await updateDocument(document.id, newData);
    setIsPending(false);
    setActive(false);
  };

  return (
    <>
      <Modal width="500px" active={active} setActive={setActive}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            label="Имя"
            onChange={handleChange}
            value={newData.name}
            name="name"
            variant="filled"
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            label="Instagram"
            onChange={handleChange}
            value={newData.instName}
            name="instName"
            variant="filled"
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            label="Отзыв"
            onChange={handleChange}
            value={newData.review}
            name="review"
            variant="filled"
            multiline
            rows={5}
            sx={{ marginBottom: "20px" }}
          />
          <Button disabled={isPending} type="submit" variant="contained">
            Подтвердить изменения
          </Button>
        </form>
      </Modal>
    </>
  );
};
