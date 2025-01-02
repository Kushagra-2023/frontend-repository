import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb"; // Use locale for DD/MM/YYYY format

export default function BasicDatePicker({ setDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DatePicker
        label="Select Date"
        format="DD/MM/YYYY" // Ensures correct format in display/input
        onChange={(newValue) => {
          if (newValue) {
            // Format date to DD/MM/YYYY
            setDate(String(dayjs(newValue).format("DD/MM/YYYY")));
          }
        }}
      />
    </LocalizationProvider>
  );
}
