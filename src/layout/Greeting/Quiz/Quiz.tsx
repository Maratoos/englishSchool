import React, { ChangeEvent, FC, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./index.css";
import { Button } from "@mui/material";

export const Quiz: FC = () => {
  // const [userAnswers, setUserAnswers] = useState<Array<string>>([]);
  const [currentAnswerId, setCurrentAnswerId] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentAnswerId(+e.target.id)
    console.log(currentAnswerId);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="quiz">
      <FormControl>
        <FormLabel>John __ American.</FormLabel>
        <RadioGroup value={currentAnswerId} row onChange={handleChange}>
          <FormControlLabel value="0" control={<Radio />} label="Female" />
          <FormControlLabel value="1" control={<Radio />} label="Male" />
          <FormControlLabel value="2" control={<Radio />} label="asdada" />
          <FormControlLabel value="3" control={<Radio />} label="Madasle" />
        </RadioGroup>
        <Button variant="contained" type="submit">
          Следующий вопрос
        </Button>
      </FormControl>
    </form>
  );
};
