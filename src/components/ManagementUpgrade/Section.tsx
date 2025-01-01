import React, { FC } from "react";

interface SectionProps {
  title: string;
  inputs: string[];
  addBlock?: () => void; // Optional callback prop if needed
}

const Section: FC<SectionProps> = ({ title, inputs }) => {
  const [rows, setRows] = React.useState<Array<Record<string, unknown>>>([{}]); // Explicit type for rows

  const handleAddRow = () => setRows([...rows, {}]);

  const AddBlockButton: FC<{ onClick: () => void }> = ({ onClick }) => (
    <div className="flex justify-center my-3">
      <button
        onClick={onClick}
        className="flex items-center gap-2  text-primary px-6 py-2 rounded hover:bg-blue-400 hover:text-white transition duration-300"
      >
        <span className="text-lg">+</span>
        Insert new block here
      </button>
    </div>
  );

  const BlockInputRow: FC<{ inputs: string[] }> = ({ inputs }) => (
    <div className="flex flex-wrap gap-4 mb-3">
      {inputs.map((placeholder, index) => (
        <input
          key={index}
          type="text"
          className="flex-1 min-w-[200px] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder={placeholder}
        />
      ))}
    </div>
  );

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {rows.map((_, index) => (
        <BlockInputRow
          key={index}
          inputs={inputs}
        />
      ))}
      <AddBlockButton onClick={handleAddRow} />
    </div>
  );
};

export default Section;
