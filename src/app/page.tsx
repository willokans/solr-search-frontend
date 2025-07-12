"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [form, setForm] = useState({
    company_name: "",
    address: "",
    budget: "",
    product: "",
    banker: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [companyOptions, setCompanyOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      if (form.company_name.length < 2) {
        setCompanyOptions([]);
        return;
      }
      const res = await fetch(`/api/solr?company_name=${form.company_name}`);
      const data = await res.json();
      const options = (data.response?.docs || []).map((doc: { company_name: string[] }) => doc.company_name?.[0]
      );
      setCompanyOptions(options);
    };
    fetchCompanies();
  }, [form.company_name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setForm({
      company_name: "",
      address: "",
      budget: "",
      product: "",
      banker: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          Solra Search Form
        </h1>
        <div className="flex flex-col gap-4">
          <label className="font-medium">
            Company Name
            <input
              type="text"
              name="company_name"
              value={form.company_name}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Search company name..."
              autoComplete="off"
              list="company-options"
            />
            <datalist id="company-options">
              {companyOptions.map((option) => (
                <option key={option} value={option} />
              ))}
            </datalist>
          </label>
          <label className="font-medium">
            Address
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter address..."
              autoComplete="off"
            />
          </label>
          <label className="font-medium">
            Budget
            <input
              type="number"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter budget..."
              autoComplete="off"
            />
          </label>
          <label className="font-medium">
            Product
            <input
              type="text"
              name="product"
              value={form.product}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter product..."
              autoComplete="off"
            />
          </label>
          <label className="font-medium">
            Banker
            <input
              type="text"
              name="banker"
              value={form.banker}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter banker..."
              autoComplete="off"
            />
          </label>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded w-1/2"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-1/2"
          >
            Submit
          </button>
        </div>
      </form>
      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50 transition-all">
          Successfully submitted the form!
        </div>
      )}
    </div>
  );
}
