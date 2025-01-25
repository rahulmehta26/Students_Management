/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const AddStudentModal = ({ isOpen, onClose, onSubmit, editingStudent }) => {

  const STYLES = {
    input: "mt-1 block w-full border rounded-md shadow-sm p-2",
    label: "block text-sm font-medium text-gray-700",
    errorInput: "border-red-500",
    normalInput: "border-gray-300",
    errorText: "text-red-500 text-xs mt-1",
    cancelButton:
      "px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md",
    submitButton:
      "px-4 py-2 cursor-pointer text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md",
  };

  const [formData, setFormData] = useState({
    name: "",
    class: "",
    section: "",
    rollNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    phoneNumber: "",
    email: "",
    parentName: "",
    parentPhone: "",
    bloodGroup: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    } else {
      setFormData({
        name: "",
        class: "",
        section: "",
        rollNumber: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        phoneNumber: "",
        email: "",
        parentName: "",
        parentPhone: "",
        bloodGroup: "",
      });
    }
    setErrors({});
  }, [editingStudent]);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Class validation
    if (!formData.class.trim()) {
      newErrors.class = "Class is required";
    }

    // Section validation
    if (!formData.section.trim()) {
      newErrors.section = "Section is required";
    }

    // Roll Number validation
    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = "Roll Number is required";
    } else if (!/^\d+$/.test(formData.rollNumber)) {
      newErrors.rollNumber = "Roll Number must be numeric";
    }

    // Date of Birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Address must be at least 10 characters";
    }

    // Phone Number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number must be 10 digits";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Parent Name validation
    if (!formData.parentName.trim()) {
      newErrors.parentName = "Parent Name is required";
    } else if (formData.parentName.trim().length < 2) {
      newErrors.parentName = "Parent Name must be at least 2 characters";
    }

    // Parent Phone validation
    if (!formData.parentPhone.trim()) {
      newErrors.parentPhone = "Parent Phone is required";
    } else if (!/^\d{10}$/.test(formData.parentPhone)) {
      newErrors.parentPhone = "Parent Phone must be 10 digits";
    }

    // Blood Group validation
    if (!formData.bloodGroup.trim()) {
      newErrors.bloodGroup = "Blood Group is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (errors[name]) {
      setErrors((prevErrors) => {
        const { [name]: removedError, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  const renderInput = (name, label, type = "text", options = []) => {
    const isError = errors[name];
    return (
      <div>
        <label htmlFor={name} className={STYLES.label}>
          {label}
        </label>
        {type === "select" ? (
          <select
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className={`${STYLES.input} ${
              isError ? STYLES.errorInput : STYLES.normalInput
            }`}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className={`${STYLES.input} ${
              isError ? STYLES.errorInput : STYLES.normalInput
            }`}
          />
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className={`${STYLES.input} ${
              isError ? STYLES.errorInput : STYLES.normalInput
            }`}
          />
        )}
        {isError && <p className={STYLES.errorText}>{errors[name]}</p>}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <dialog
      open={isOpen}
      className="fixed z-10 inset-0 overflow-y-auto w-80 bg-black bg-opacity-30 flex items-center justify-center"
    >
      <div className="relative bg-white rounded max-w-md mx-auto p-6 w-full max-h-screen overflow-y-scroll scroll-hidden">
        <h2 className="text-lg font-medium mb-4">
          {editingStudent ? "Edit Student" : "Add New Student"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderInput("name", "Name")}
          {renderInput("class", "Class")}
          {renderInput("section", "Section")}
          {renderInput("rollNumber", "Roll Number")}
          {renderInput("dateOfBirth", "Date of Birth", "date")}
          {renderInput("gender", "Gender", "select", [
            { value: "", label: "Select Gender" },
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ])}
          {renderInput("address", "Address", "textarea")}
          {renderInput("phoneNumber", "Phone Number", "tel")}
          {renderInput("email", "Email", "email")}
          {renderInput("parentName", "Parent Name")}
          {renderInput("parentPhone", "Parent Phone", "tel")}
          {renderInput("bloodGroup", "Blood Group")}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className={STYLES.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={STYLES.submitButton}>
              {editingStudent ? "Update" : "Add"} Student
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddStudentModal;
