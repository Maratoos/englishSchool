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

export const ConfirmedReviews: FC = () => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [docToChange, setDocToChange] = useState<IReview | null>(null);
  const { documents, error, isPending } =
    getCollection<IReview>("confirmedReviews");
  const { deleteDocument } = useCollection("confirmedReviews");

  const handleDeleteDocument = async (docId: string): Promise<void> => {
    await deleteDocument(docId);
  };

  const handleModal = (doc: IReview): void => {
    setModalActive(true);
    setDocToChange(doc);
  };

  return (
    <>
      <Typography
        text="Отзывы показанные на странице:"
        margin="50px 0 50px 0"
      />
      <TableContainer sx={{ width: 1200 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{padding: "8px"}}>Имя</TableCell>
              <TableCell sx={{padding: "8px"}} align="right">Instagram</TableCell>
              <TableCell sx={{padding: "8px"}} align="right">Дата создания</TableCell>
              <TableCell sx={{padding: "8px"}} align="right">Отзыв</TableCell>
              <TableCell sx={{padding: "8px"}} align="right">Удалить отзыв</TableCell>
              <TableCell sx={{padding: "8px"}} align="right">Изменить отзыв</TableCell>
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
                  <TableCell sx={{padding: "8px"}} component="th" scope="row" width={125}>
                    {doc.name}
                  </TableCell>
                  <TableCell sx={{padding: "8px"}} align="right" width={150}>
                    {doc.instName ? doc.instName : "Нет"}
                  </TableCell>
                  <TableCell sx={{padding: "8px"}} align="right" width={100}>
                    {formatDate(doc.createdAt)}
                  </TableCell>
                  <TableCell sx={{padding: "8px"}} align="right" width={300}>
                    {doc.review.slice(0, 50)}...
                  </TableCell>
                  <TableCell sx={{padding: "8px"}} align="right" width={150}>
                    <Button
                      onClick={() => handleDeleteDocument(doc.id)}
                      variant="contained"
                    >
                      Удалить
                    </Button>
                  </TableCell>
                  <TableCell sx={{padding: "8px"}} align="right" width={150}>
                    <Button
                      onClick={() => handleModal(doc)}
                      variant="contained"
                    >
                      Изменить
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
          collectionName="confirmedReviews"
          active={modalActive}
          setActive={setModalActive}
          document={docToChange}
        />
      )}
    </>
  );
};
