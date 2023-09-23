import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchCourse() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return null;
}
