import Section from "./Section";

const InstitutionsAdded = () => {
  return (
    <div className=" mx-auto p-4">
      {/* Education Section */}
      <Section
        title="Education"
        inputs={["Name of Institution", "Qualification Obtained", "Year Obtained"]}
      />

      {/* Current Work Experience Section */}
      <Section
        title="Current Work Experience"
        inputs={["Name of Organization", "Address of Organization", "Position held", "Year"]}
      />

      {/* Previous Work Experience Section */}
      <Section
        title="Previous Work Experience"
        inputs={["Name of Organization", "Address of Organization", "Position held", "Year"]}
      />
    </div>
  );
};

export default InstitutionsAdded;
