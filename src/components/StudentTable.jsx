/* eslint-disable react/prop-types */
import { memo } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Class</th>
            <th className="py-3 px-6 text-left">Section</th>
            <th className="py-3 px-6 text-left">Roll Number</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {students.map((student) => (
            <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{student.id}</td>
              <td className="py-3 px-6 text-left">{student.name}</td>
              <td className="py-3 px-6 text-left">{student.class}</td>
              <td className="py-3 px-6 text-left">{student.section}</td>
              <td className="py-3 px-6 text-left">{student.rollNumber}</td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                    <FaEye />
                  </button>
                  <button
                    className="w-4 mr-2 transform hover:text-yellow-500 hover:scale-110"
                    onClick={() => onEdit(student)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                    onClick={() => onDelete(student.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(StudentTable); 
