import { TextField as MuiTextField, FormControl as MuiFormControl, styled } from "@mui/material";

export const TextField = styled(MuiTextField)(() => ({
  "& .MuiFormLabel-asterisk": {
    color: "red"
  }
}));

export const FormControl = styled(MuiFormControl)(() => ({
  "& .MuiFormLabel-asterisk": {
    color: "red"
  }
}));
