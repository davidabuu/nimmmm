'use client';

import { FiPlus, FiX } from "react-icons/fi";

interface AdditionalData {
  institutions: Array<{ name: string; qualification: string; year: string }>;
  workExp: Array<{ organization: string; address: string; position: string; year: string }>;
  prevWorkExp: Array<{ organization: string; address: string; position: string; year: string }>;
}

interface AdditionalInformationProps {
  data: AdditionalData;
  setData: (data: AdditionalData) => void;
  onSave: () => Promise<void>;
  isLoading: boolean;
  errors: Record<string, string>;
}

export default function AdditionalInformation({
  data,
  setData,
  
  errors,
}: AdditionalInformationProps) {
  const addInstitution = () => {
    setData({
      ...data,
      institutions: [
        ...data.institutions,
        { name: "", qualification: "", year: "" },
      ],
    });
  };

  const removeInstitution = (idx: number) => {
    setData({
      ...data,
      institutions: data.institutions.filter((_, i) => i !== idx),
    });
  };

  const updateInstitution = (
    idx: number,
    field: string,
    value: string
  ) => {
    const updated = [...data.institutions];
    updated[idx] = { ...updated[idx], [field]: value };
    setData({ ...data, institutions: updated });
  };

  const addWorkExp = () => {
    setData({
      ...data,
      workExp: [
        ...data.workExp,
        { organization: "", address: "", position: "", year: "" },
      ],
    });
  };

  const removeWorkExp = (idx: number) => {
    setData({
      ...data,
      workExp: data.workExp.filter((_, i) => i !== idx),
    });
  };

  const updateWorkExp = (idx: number, field: string, value: string) => {
    const updated = [...data.workExp];
    updated[idx] = { ...updated[idx], [field]: value };
    setData({ ...data, workExp: updated });
  };

  const addPrevWorkExp = () => {
    setData({
      ...data,
      prevWorkExp: [
        ...data.prevWorkExp,
        { organization: "", address: "", position: "", year: "" },
      ],
    });
  };

  const removePrevWorkExp = (idx: number) => {
    setData({
      ...data,
      prevWorkExp: data.prevWorkExp.filter((_, i) => i !== idx),
    });
  };

  const updatePrevWorkExp = (idx: number, field: string, value: string) => {
    const updated = [...data.prevWorkExp];
    updated[idx] = { ...updated[idx], [field]: value };
    setData({ ...data, prevWorkExp: updated });
  };

  return (
    <div className="bg-white min-h-screen p-8">
      {/* Error Messages */}
      {errors.institutions && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.institutions}
        </div>
      )}
      {errors.workExp && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.workExp}
        </div>
      )}

      {/* Institutions Attended */}
      <div className="bg-white rounded-lg py-2 mb-8 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Institutions Attended *
        </h3>

        <div className="space-y-4">
          {data.institutions.map((inst, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-gray-200 last:border-b-0"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name of Institution
                </label>
                <input
                  type="text"
                  value={inst.name}
                  onChange={(e) =>
                    updateInstitution(idx, "name", e.target.value)
                  }
                  placeholder="Enter institution name"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qualification Obtained
                </label>
                <input
                  type="text"
                  value={inst.qualification}
                  onChange={(e) =>
                    updateInstitution(idx, "qualification", e.target.value)
                  }
                  placeholder="Enter qualification"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year Obtained
                  </label>
                  <input
                    type="text"
                    value={inst.year}
                    onChange={(e) =>
                      updateInstitution(idx, "year", e.target.value)
                    }
                    placeholder="Year"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                {data.institutions.length > 1 && (
                  <button
                    onClick={() => removeInstitution(idx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addInstitution}
          className="mt-6 flex items-center justify-center gap-2 mx-auto py-2 px-4 rounded-full bg-primary text-white hover:opacity-90 transition-opacity font-medium"
        >
          <FiPlus className="w-5 h-5" />
          <span>Insert new block here</span>
        </button>
      </div>

      {/* Current Work Experience */}
      <div className="bg-white rounded-lg p-8 mb-8 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Current Work Experience *
        </h3>

        <div className="space-y-4">
          {data.workExp.map((exp, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4 border-b border-gray-200 last:border-b-0"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name of Organization
                </label>
                <input
                  type="text"
                  value={exp.organization}
                  onChange={(e) =>
                    updateWorkExp(idx, "organization", e.target.value)
                  }
                  placeholder="Organization name"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address of Organization
                </label>
                <input
                  type="text"
                  value={exp.address}
                  onChange={(e) =>
                    updateWorkExp(idx, "address", e.target.value)
                  }
                  placeholder="Address"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position held
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) =>
                    updateWorkExp(idx, "position", e.target.value)
                  }
                  placeholder="Position"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <input
                    type="text"
                    value={exp.year}
                    onChange={(e) =>
                      updateWorkExp(idx, "year", e.target.value)
                    }
                    placeholder="Year"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                {data.workExp.length > 1 && (
                  <button
                    onClick={() => removeWorkExp(idx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addWorkExp}
          className="mt-6 flex items-center justify-center gap-2 mx-auto py-2 px-4 rounded-full bg-primary text-white hover:opacity-90 transition-opacity font-medium"
        >
          <FiPlus className="w-5 h-5" />
          <span>Insert new block here</span>
        </button>
      </div>

      {/* Previous Work Experience */}
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Previous Work Experience
        </h3>

        <div className="space-y-4">
          {data.prevWorkExp.map((exp, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4 border-b border-gray-200 last:border-b-0"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name of Organization
                </label>
                <input
                  type="text"
                  value={exp.organization}
                  onChange={(e) =>
                    updatePrevWorkExp(idx, "organization", e.target.value)
                  }
                  placeholder="Organization name"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address of Organization
                </label>
                <input
                  type="text"
                  value={exp.address}
                  onChange={(e) =>
                    updatePrevWorkExp(idx, "address", e.target.value)
                  }
                  placeholder="Address"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position held
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) =>
                    updatePrevWorkExp(idx, "position", e.target.value)
                  }
                  placeholder="Position"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <input
                    type="text"
                    value={exp.year}
                    onChange={(e) =>
                      updatePrevWorkExp(idx, "year", e.target.value)
                    }
                    placeholder="Year"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                {data.prevWorkExp.length > 1 && (
                  <button
                    onClick={() => removePrevWorkExp(idx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addPrevWorkExp}
          className="mt-6 flex items-center justify-center gap-2 mx-auto py-2 px-4 rounded-full bg-primary text-white hover:opacity-90 transition-opacity font-medium"
        >
          <FiPlus className="w-5 h-5" />
          <span>Insert new block here</span>
        </button>
      </div>
    </div>
  );
}