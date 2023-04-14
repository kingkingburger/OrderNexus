import React, { useState } from "react";
import Select from "react-select";

type OptionType = {
  value: string;
  label: string;
};

const options: OptionType[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

type props = {
  company: number;
};
const MySelectComponent = ({ company }: props) => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div>
      <h1>Select an option:</h1>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
      {selectedOption && <p>You have selected: {selectedOption.label}</p>}
    </div>
  );
};

export default MySelectComponent;
