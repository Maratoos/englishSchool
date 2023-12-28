import { FC } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox,
} from "@mui/material"
import { Typography } from "../../../components/Typography/Typography"
import { getCollection } from "../../../hooks/getCollection"
import { useCollection } from "../../../hooks/useColection"
import { IApplication } from "../../../models/models"
import { formatDate } from "../../../hooks/formatDate"

export const Applications: FC = () => {
  const { documents, error, isPending } = getCollection<IApplication>("applications")
  const { deleteDocument, updateDocument } = useCollection("applications")

  const handleDeleteDocument = async (docId: string): Promise<void> => {
    await deleteDocument(docId)
  }

  return (
    <>
      <Typography text="Все заявки:" margin="0 0 50px 0" />
      <TableContainer sx={{ width: 1200 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="right">Страна</TableCell>
              <TableCell align="right">Номер WhatsApp</TableCell>
              <TableCell align="right">Уровень теста</TableCell>
              <TableCell align="right">Правильные ответы</TableCell>
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
                <TableRow key={doc.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {doc.name}
                  </TableCell>
                  <TableCell align="right">{doc.email}</TableCell>
                  <TableCell align="right">{doc.country}</TableCell>
                  <TableCell align="right">{doc.whatsAppNumber}</TableCell>
                  <TableCell align="right">
                    {doc.currentLevel ? doc.currentLevel : "Не пройден"}
                  </TableCell>
                  <TableCell align="right" width={100}>
                    {doc.correctAnswers ? `${doc.correctAnswers}/30` : "Не пройден"}
                  </TableCell>
                  <TableCell align="right">{formatDate(doc.createdAt)}</TableCell>
                  <TableCell align="right" width={90}>
                    <Checkbox
                      checked={doc.checked}
                      onChange={(e) => updateDocument(doc.id, { checked: e.target.checked })}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleDeleteDocument(doc.id)} variant="contained">
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
