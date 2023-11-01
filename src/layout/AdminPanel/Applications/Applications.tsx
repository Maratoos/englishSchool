import { FC } from "react";
import "./index.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import Button from "@mui/material/Button/Button";
import { Typography } from "../../../components/Typography/Typography";
import { getCollection } from "../../../hooks/getCollection";
import { useCollection } from "../../../hooks/useColection";
import { Timestamp } from "firebase/firestore";

function formatDate(timestamp: Timestamp): string {
  const date = timestamp.toDate();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}.${month} ${hours}:${minutes}`;
}

export const Applications: FC = () => {
  const { documents, error, isPending } = getCollection("applications");
  const { deleteDocument, updateDocument } = useCollection("applications");

  return (
    <section className="applications">
      <Typography text="Все заявки:" margin="0 0 50px 0" />
      <TableContainer sx={{ width: 1500 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Страна</TableCell>
              <TableCell align="right">Номер WhatsApp</TableCell>
              <TableCell align="right">Дата заявки</TableCell>
              <TableCell align="right">Заявка обслужена</TableCell>
              <TableCell align="right">Удалить заявку</TableCell>
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
                  <TableCell align="right">{doc.email}</TableCell>
                  <TableCell align="right">{doc.country}</TableCell>
                  <TableCell align="right">{doc.whatsAppNumber}</TableCell>
                  <TableCell align="right">
                    {formatDate(doc.createdAt)}
                  </TableCell>
                  <TableCell align="right">
                    <Checkbox
                      defaultChecked={doc.checked}
                      onChange={(e) =>
                        updateDocument(doc.id, { checked: e.target.checked })
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => deleteDocument(doc.id)}
                      variant="contained"
                    >
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};
