import { NavLink } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { useCallback } from "react"

const Sidebar = () => {
  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }, [])

  return (
    <div className="bg-indigo-800 text-white w-80 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <NavLink
          to="/dashboard/students"
          className={({ isActive }) =>
            `block py-2.5 px-4 rounded transition duration-200 ${isActive ? "bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-900" : "hover:bg-indigo-700"}`
          }
        >
          Students
        </NavLink>
        <button
          onClick={handleLogout}
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 w-full text-left"
        >
          Logout
        </button>
      </nav>
    </div>
  )
}

export default Sidebar

