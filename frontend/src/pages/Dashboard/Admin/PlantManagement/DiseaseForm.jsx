import React, { useState, useEffect } from "react";
import storage from "../../../../config/firebase.init";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { MdClose } from "react-icons/md";

const DiseaseForm = ({ handleSubmit, initialData }) => {
  const [img, setImg] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [formData, setFormData] = useState({
    imageUrl: "",
    name: "",
    causalAgent: "",
    diseaseTransmission: "",
    diseaseSymptoms: "",
    control: "",
    fertilizers: [],
  });
  const [uploading, setUploading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (img) {
      uploadFile(img, "imageUrl");
    }
  }, [img]);

  const uploadFile = (file, fileType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, "images/diseases/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({
            ...prev,
            [fileType]: downloadURL,
          }));
          setUploading(false);
        });
      }
    );
  };

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        fertilizers: initialData.fertilizers || [],
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFertilizersChange = (e, index) => {
    const newFertilizers = [...formData.fertilizers];
    newFertilizers[index] = e.target.value;
    setFormData((prev) => ({
      ...prev,
      fertilizers: newFertilizers,
    }));
  };

  const handleAddFertilizer = () => {
    setFormData((prev) => ({
      ...prev,
      fertilizers: [...prev.fertilizers, ""],
    }));
  };

  const handleRemoveFertilizer = (index) => {
    setFormData((prev) => ({
      ...prev,
      fertilizers: prev.fertilizers.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const errors = {};
    const nameRegex = /^[A-Za-z\s]+$/;

    // Validate disease name
    if (!formData.name || !nameRegex.test(formData.name)) {
      errors.name = "Disease name must contain only letters.";
    }

    // Validate fertilizers
    if (formData.fertilizers.some((fertilizer) => fertilizer.trim() === "")) {
      errors.fertilizers = "Fertilizers cannot contain empty strings.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Section */}
        <div>
          <div className="mb-4">
            <label
              htmlFor="imageUrl"
              className="block text-gray-700 font-semibold mb-1"
            >
              {uploading ? `Uploading: ${imgPerc}%` : "Image"}
            </label>
            <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded-md  dark:bg-gray-800 dark:text-white"
              name="imageUrl"
              onChange={(e) => setImg(e.target.files[0])}
            />
            {formData.imageUrl && !uploading && (
              <div className="mt-4">
                <img
                  src={formData.imageUrl}
                  alt="Uploaded Preview"
                  className="w-40 h-40 rounded-md border border-gray-300  dark:bg-gray-800 dark:text-white"
                />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-1"
            >
              Disease Name
            </label>
            <input
              type="text"
              className={`w-full p-2 border ${
                formErrors.name ? "border-red-500" : "border-gray-300"
              } rounded-md dark:bg-gray-800 dark:text-white`}
              name="name"
              placeholder="Disease Name"
              onChange={handleChange}
              value={formData.name}
              required
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm">{formErrors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="causalAgent"
              className="block text-gray-700 font-semibold mb-1"
            >
              Causal Agent
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md  dark:bg-gray-800 dark:text-white"
              name="causalAgent"
              placeholder="Causal Agent"
              onChange={handleChange}
              value={formData.causalAgent}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="diseaseTransmission"
              className="block text-gray-700 font-semibold mb-1"
            >
              Disease Transmission
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md  dark:bg-gray-800 dark:text-white"
              name="diseaseTransmission"
              placeholder="Disease Transmission"
              onChange={handleChange}
              value={formData.diseaseTransmission}
              required
            />
          </div>
        </div>

        {/* Right Section */}
        <div>
          <div className="mb-4">
            <label
              htmlFor="diseaseSymptoms"
              className="block text-gray-700 font-semibold mb-1"
            >
              Disease Symptoms
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md  dark:bg-gray-800 dark:text-white"
              name="diseaseSymptoms"
              placeholder="Disease Symptoms"
              onChange={handleChange}
              value={formData.diseaseSymptoms}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="control"
              className="block text-gray-700 font-semibold mb-1"
            >
              Control Measures
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md  dark:bg-gray-800 dark:text-white"
              name="control"
              placeholder="Control Measures"
              onChange={handleChange}
              value={formData.control}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Fertilizers
            </label>
            {formData.fertilizers.map((fertilizer, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  className={`w-full p-2 border ${
                    formErrors.fertilizers
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md dark:bg-gray-800 dark:text-white`}
                  placeholder="Fertilizer"
                  value={fertilizer}
                  onChange={(e) => handleFertilizersChange(e, index)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFertilizer(index)}
                  className="ml-2 px-2 py-2 border border-red-500 text-red-500 rounded hover:bg-red-600  hover:text-white"
                >
                  <MdClose />
                </button>
              </div>
            ))}
            {formErrors.fertilizers && (
              <p className="text-red-500 text-sm">{formErrors.fertilizers}</p>
            )}
            <button
              type="button"
              onClick={handleAddFertilizer}
              className="mt-2 px-4 py-2 border border-secondary  text-secondary rounded hover:text-white  hover:bg-secondary"
            >
              Add Fertilizer
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-secondary text-white rounded hover:bg-green-700 "
      >
        {initialData ? "Update Disease" : "Add Disease"}
      </button>
    </form>
  );
};

export default DiseaseForm;
