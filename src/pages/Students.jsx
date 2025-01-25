import { useState, useEffect, useMemo, useCallback } from "react"
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"
import StudentTable from "../components/StudentTable"
import AddStudentModal from "../components/AddStudentModal"

const Students = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "students"))
    const studentsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    setStudents(studentsData)
  }, [])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  const handleAddStudent = useCallback(
    async (studentData) => {
      await addDoc(collection(db, "students"), studentData)
      fetchStudents()
      setIsModalOpen(false)
    },
    [fetchStudents],
  )

  const handleEditStudent = useCallback(
    async (studentData) => {
      await updateDoc(doc(db, "students", studentData.id), studentData)
      fetchStudents()
      setIsModalOpen(false)
      setEditingStudent(null)
    },
    [fetchStudents],
  )

  const handleDeleteStudent = useCallback(
    async (id) => {
      await deleteDoc(doc(db, "students", id))
      fetchStudents()
    },
    [fetchStudents],
  )

  const memoizedStudents = useMemo(() => students, [students])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Students</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Student
        </button>
      </div>
      <StudentTable
        students={memoizedStudents}
        onEdit={(student) => {
          setEditingStudent(student)
          setIsModalOpen(true)
        }}
        onDelete={handleDeleteStudent}
      />
      <AddStudentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingStudent(null)
        }}
        onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
        editingStudent={editingStudent}
      />
    </div>
  )
}

export default Students

