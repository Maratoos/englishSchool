import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Typography } from "../../../../components/Typography/Typography";
import { getCollection } from "../../../../hooks/getCollection";
import { useCollection } from "../../../../hooks/useColection";
import { IReview } from "../../../../models/models";
import { formatDate } from "../../../../hooks/formatDate";
import { ChangeReview } from "../ChangeReview";

export const ReceivedReviews: FC = () => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [docToChange, setDocToChange] = useState<IReview | null>(null);
  const { documents, error, isPending } =
    getCollection<IReview>("recievedReviews");
  const { deleteDocument } = useCollection("recievedReviews");
  const { addDocument } = useCollection("confirmedReviews");

  const handleDeleteDocument = async (docId: string): Promise<void> => {
    await deleteDocument(docId);
  };

  const handleModal = (doc: IReview): void => {
    setModalActive(true);
    setDocToChange(doc);
  };

  const handleAddReview = async (doc: IReview): Promise<void> => {
    const { id, ...reviewWithoutId } = doc;

    await addDocument<IReview>(reviewWithoutId)
    await deleteDocument(id)
  };

  return (
    <>
      <Typography text="Отзывы от пользователей:" margin="50px 0 50px 0" />
      <TableContainer sx={{ width: 1500, marginBottom: "50px" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell align="right">Instagram</TableCell>
              <TableCell align="right">Дата создания</TableCell>
              <TableCell align="right">Отзыв</TableCell>
              <TableCell align="right">Удалить отзыв</TableCell>
              <TableCell align="right">Изменить отзыв</TableCell>
              <TableCell align="right">Добавить на страницу</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isPending &&
              !error &&
              Array.isArray(documents) &&
              documents.length > 0 &&
              documents.map((doc) => (
                <TableRow
                  key={doc.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {doc.name}
                  </TableCell>
                  <TableCell align="right">
                    {doc.instName ? doc.instName : "Нет"}
                  </TableCell>
                  <TableCell align="right">
                    {formatDate(doc.createdAt)}
                  </TableCell>
                  <TableCell align="right" width={500}>
                    {doc.review}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleDeleteDocument(doc.id)}
                      variant="contained"
                    >
                      Удалить
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleModal(doc)}
                      variant="contained"
                    >
                      Изменить
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleAddReview(doc)}
                      variant="contained"
                    >
                      Добавить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {docToChange && (
        <ChangeReview
          key={docToChange.id}
          collectionName="recievedReviews"
          active={modalActive}
          setActive={setModalActive}
          document={docToChange}
        />
      )}
    </>
  );
};
