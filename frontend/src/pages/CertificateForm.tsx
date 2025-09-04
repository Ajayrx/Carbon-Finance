import React, { useState } from "react";
import { motion } from "framer-motion";
import OfficialsNavigation from "../components/OfficialsNavigation";
import {
  FileText,
  Loader,
  CheckCircle,
  User,
  Leaf,
  Beaker,
  Calendar,
} from "lucide-react";
import jsPDF from "jspdf";
import QRCode from "qrcode";

interface CertificateData {
  farmerName: string;
  farmerId: string;
  landId: string;
  cropType: string;
  landArea: string;
  treesPlanted: string;
  fertilizerUse: string;
  fertilizerAmount: string;
  irrigationPractices: string;
  visitDate: string;
  officerName: string;
  notes: string;
}

const CertificateForm = () => {
  const [formData, setFormData] = useState<CertificateData>({
    farmerName: "",
    farmerId: "",
    landId: "",
    cropType: "",
    landArea: "",
    treesPlanted: "",
    fertilizerUse: "",
    fertilizerAmount: "",
    irrigationPractices: "",
    visitDate: new Date().toISOString().split("T")[0],
    officerName: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generatePDF = async (certId: string, issueDate: string) => {
    const doc = new jsPDF();

    // Generate QR Code string
    const qrString = `Farmer: ${formData.farmerName}\nFarmer ID: ${formData.farmerId}\nLand ID: ${formData.landId}\nCertificate ID: ${certId}`;
    const qrDataUrl = await QRCode.toDataURL(qrString);

    // Title
    doc.setFontSize(18);
    doc.text("Government Verification Certificate", 20, 20);

    // Certificate Info
    doc.setFontSize(12);
    doc.text(`Certificate ID: ${certId}`, 20, 35);
    doc.text(`Issue Date: ${issueDate}`, 20, 42);

    // Farmer Details
    doc.text("Farmer Details:", 20, 55);
    doc.text(`Name: ${formData.farmerName}`, 30, 63);
    doc.text(`Farmer ID: ${formData.farmerId}`, 30, 70);
    doc.text(`Land ID: ${formData.landId}`, 30, 77);

    // Farm Details
    doc.text("Farm Details:", 20, 90);
    doc.text(`Crop Type: ${formData.cropType}`, 30, 98);
    doc.text(`Land Area: ${formData.landArea}`, 30, 105);
    doc.text(`Trees Planted: ${formData.treesPlanted}`, 30, 112);
    doc.text(
      `Fertilizer: ${formData.fertilizerUse} (${formData.fertilizerAmount})`,
      30,
      119
    );
    doc.text(`Irrigation: ${formData.irrigationPractices}`, 30, 126);

    // Verification
    doc.text("Verification Details:", 20, 140);
    doc.text(`Visit Date: ${formData.visitDate}`, 30, 148);
    doc.text(`Officer: ${formData.officerName}`, 30, 155);
    doc.text(`Notes: ${formData.notes}`, 30, 162);

    // QR Code
    doc.addImage(qrDataUrl, "PNG", 150, 35, 40, 40);

    // Save PDF
    doc.save(
      `certificate-${formData.farmerName.replace(/\s+/g, "-")}-${certId}.pdf`
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const certId = `CERT-${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}`;

      const issueDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Build certificate object
      const newCert = {
        id: Date.now().toString(),
        certificateId: certId,
        farmerName: formData.farmerName,
        farmerId: formData.farmerId,
        landId: formData.landId,
        cropType: formData.cropType,
        landArea: formData.landArea,
        treesPlanted: formData.treesPlanted,
        fertilizerUse: formData.fertilizerUse,
        fertilizerAmount: formData.fertilizerAmount,
        irrigationPractices: formData.irrigationPractices,
        visitDate: formData.visitDate,
        officerName: formData.officerName,
        notes: formData.notes,
        dateIssued: issueDate,
        status: "active",
      };

      // Save to localStorage (like database)
      const existing = JSON.parse(localStorage.getItem("certificates") || "[]");
      localStorage.setItem("certificates", JSON.stringify([newCert, ...existing]));

      // Generate PDF
      await generatePDF(certId, issueDate);

      setIsSuccess(true);

      // Reset form after 3s
      setTimeout(() => {
        setFormData({
          farmerName: "",
          farmerId: "",
          landId: "",
          cropType: "",
          landArea: "",
          treesPlanted: "",
          fertilizerUse: "",
          fertilizerAmount: "",
          irrigationPractices: "",
          visitDate: new Date().toISOString().split("T")[0],
          officerName: "",
          notes: "",
        });
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Error generating certificate:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <OfficialsNavigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
        <div className="max-w-4xl mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Create Verification Certificate
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Generate and save official certificates for verified farming activities
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Farmer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <User size={20} />
                  <span>Farmer Information</span>
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="farmerName"
                    value={formData.farmerName}
                    onChange={handleInputChange}
                    placeholder="Farmer Name"
                    className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                  <input
                    type="text"
                    name="farmerId"
                    value={formData.farmerId}
                    onChange={handleInputChange}
                    placeholder="Farmer ID"
                    className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <input
                  type="text"
                  name="landId"
                  value={formData.landId}
                  onChange={handleInputChange}
                  placeholder="Land ID / Plot Number"
                  className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              {/* Farm Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Leaf size={20} />
                  <span>Farm Details</span>
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <select
                    name="cropType"
                    value={formData.cropType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  >
                    <option value="">Select crop type</option>
                    <option value="rice">Rice</option>
                    <option value="wheat">Wheat</option>
                    <option value="mango">Mango</option>
                    <option value="coconut">Coconut</option>
                    <option value="bamboo">Bamboo</option>
                    <option value="neem">Neem</option>
                  </select>

                  <input
                    type="text"
                    name="landArea"
                    value={formData.landArea}
                    onChange={handleInputChange}
                    placeholder="e.g., 2 acres"
                    className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <input
                  type="text"
                  name="treesPlanted"
                  value={formData.treesPlanted}
                  onChange={handleInputChange}
                  placeholder="e.g., 20 Mango trees"
                  className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              {/* Agricultural Practices */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Beaker size={20} />
                  <span>Agricultural Practices</span>
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <select
                    name="fertilizerUse"
                    value={formData.fertilizerUse}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select fertilizer type</option>
                    <option value="organic">Organic</option>
                    <option value="urea">Urea</option>
                    <option value="dap">DAP</option>
                    <option value="vermicompost">Vermicompost</option>
                  </select>

                  <input
                    type="text"
                    name="fertilizerAmount"
                    value={formData.fertilizerAmount}
                    onChange={handleInputChange}
                    placeholder="e.g., 200kg"
                    className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <select
                  name="irrigationPractices"
                  value={formData.irrigationPractices}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select irrigation type</option>
                  <option value="drip">Drip</option>
                  <option value="sprinkler">Sprinkler</option>
                  <option value="flood">Flood</option>
                  <option value="rainfed">Rainfed</option>
                </select>
              </div>

              {/* Verification Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>Verification Details</span>
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="date"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />

                  <input
                    type="text"
                    name="officerName"
                    value={formData.officerName}
                    onChange={handleInputChange}
                    placeholder="Officer Name"
                    className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Verification notes..."
                  className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg transition-all flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    <span>Generating Certificate...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle size={20} />
                    <span>Certificate Generated!</span>
                  </>
                ) : (
                  <>
                    <FileText size={20} />
                    <span>Generate & Download</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CertificateForm;
