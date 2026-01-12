export default function CriteriaInstructions() {
    const criteria = [
      {
        title: "Upgrade from GRADUATE TO ASSOCIATE GRADE",
        points: [
          "Must have spent 3 years on the grade of Graduate",
          "Be financially up to date (paid up all outstanding subscription)",
          "Must have 15 credit points which can be gotten from:",
          "- Mandatory Continuing Professional Education Programme (MCPEP) - 5 credit points",
          "- Annual National Management Conference (ANMC) - 10 credit points",
        ],
        fee: "N50,000",
      },
      {
        title: "Upgrade from ASSOCIATE TO MEMBER GRADE",
        points: [
          "Must have spent 3 years on the grade of ASSOCIATE",
          "Be financially up to date (paid up all outstanding subscription)",
          "Must have 15 credit points which can be gotten from:",
          "- Mandatory Continuing Professional Education Programme (MCPEP) - 5 credit points",
          "- Annual National Management Conference (ANMC) - 10 credit points",
        ],
        fee: "N50,000",
      },
      {
        title: "Upgrade from MEMBER TO FELLOW GRADE",
        points: [
          "Must have spent 10 years on the grade of MEMBER",
          "Be financially up to date (paid up all outstanding subscription)",
          "Must have 100 credit points which can be gotten from:",
          "- Continuing Learning and Development (CLAD) programme",
          "- Annual National Management Conference (ANMC)",
          "- Women in Management and Leadership (WIMLEAD)",
          "Fill the Fellowship Application form",
          "Submit a comprehensive CV",
        ],
        fee: "N300,000",
      },
    ];
  
    return (
      <div className="p-4  bg-white space-y-6">
        {criteria.map((item, index) => (
          <div
            key={index}
            className="border border-[#010056] rounded-md p-6 shadow-lg bg-blue-50 max-w-4xl mx-auto"
          >
            <h3 className="text-xl font-semibold text-primary mb-4">
              {item.title}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-primary">
              {item.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <p className="mt-4 font-bold text-gray-900">
              Upgrade Fee: <span className="text-primary">{item.fee}</span>
            </p>
          </div>
        ))}
      </div>
    );
  } 