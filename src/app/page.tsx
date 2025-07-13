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
  const [addressOptions, setAddressOptions] = useState<string[]>([]);
  const [budgetOptions, setBudgetOptions] = useState<string[]>([]);
  const [productOptions, setProductOptions] = useState<string[]>([]);
  const [bankerOptions, setBankerOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      // Only search if at least one field has 2+ chars
      if (
        form.company_name.length < 2 &&
        form.address.length < 2 &&
        form.product.length < 2 &&
        form.banker.length < 2 &&
        (!form.budget || form.budget.toString().length < 1)
      ) {
        setCompanyOptions([]);
        setAddressOptions([]);
        setBudgetOptions([]);
        setProductOptions([]);
        setBankerOptions([]);
        return;
      }
      const params = new URLSearchParams();
      if (form.company_name.length >= 2) params.append('company_name', form.company_name);
      if (form.address.length >= 2) params.append('address', form.address);
      if (form.product.length >= 2) params.append('product', form.product);
      if (form.banker.length >= 2) params.append('banker', form.banker);
      if (form.budget) params.append('budget', form.budget.toString());
      const res = await fetch(`/api/solr?${params.toString()}`);
      const data = await res.json();
      const docs = data.response?.docs || [];
      setCompanyOptions(Array.from(new Set<string>(docs.map((doc: any) => String(doc.company_name))).values()).filter(Boolean));
      setAddressOptions(Array.from(new Set<string>(docs.map((doc: any) => String(doc.address))).values()).filter(Boolean));
      setBudgetOptions(Array.from(new Set<string>(docs.map((doc: any) => String(doc.budget))).values()).filter(Boolean));
      setProductOptions(Array.from(new Set<string>(docs.map((doc: any) => String(doc.product))).values()).filter(Boolean));
      setBankerOptions(Array.from(new Set<string>(docs.map((doc: any) => String(doc.banker))).values()).filter(Boolean));
    };
    fetchSuggestions();
  }, [form.company_name, form.address, form.product, form.banker, form.budget]);

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

  const handleSuggestionSelect = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
    // Optionally clear all options for that field after selection
    if (field === 'company_name') setCompanyOptions([]);
    if (field === 'address') setAddressOptions([]);
    if (field === 'budget') setBudgetOptions([]);
    if (field === 'product') setProductOptions([]);
    if (field === 'banker') setBankerOptions([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900">
          Solra Search Form
        </h1>
        <div className="flex flex-col gap-4">
          <label className="font-medium text-gray-800">
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
              onInput={e => {
                // If user selects a suggestion, clear options immediately
                const value = (e.target as HTMLInputElement).value;
                if (companyOptions.includes(value)) {
                  setCompanyOptions([]);
                }
              }}
              onBlur={e => {
                // Also clear on blur for safety
                setCompanyOptions([]);
              }}
            />
            <datalist id="company-options">
              {companyOptions.map((option) => (
                <option key={option} value={option} />
              ))}
            </datalist>
          </label>
          <label className="font-medium text-gray-800">
            Address
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter address..."
              autoComplete="off"
              list="address-options"
              onBlur={e => handleSuggestionSelect('address', e.target.value)}
            />
            <datalist id="address-options">
              {addressOptions.map((option) => (
                <option key={option} value={option} />
              ))}
            </datalist>
          </label>
          <label className="font-medium text-gray-800">
            Budget
            <input
              type="number"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter budget..."
              autoComplete="off"
              list="budget-options"
              onBlur={e => handleSuggestionSelect('budget', e.target.value)}
            />
            <datalist id="budget-options">
              {budgetOptions.map((option) => (
                <option key={option} value={option} />
              ))}
            </datalist>
          </label>
          <label className="font-medium text-gray-800">
            Product
            <input
              type="text"
              name="product"
              value={form.product}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter product..."
              autoComplete="off"
              list="product-options"
              onBlur={e => handleSuggestionSelect('product', e.target.value)}
            />
            <datalist id="product-options">
              {productOptions.map((option) => (
                <option key={option} value={option} />
              ))}
            </datalist>
          </label>
          <label className="font-medium text-gray-800">
            Banker
            <input
              type="text"
              name="banker"
              value={form.banker}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter banker..."
              autoComplete="off"
              list="banker-options"
              onBlur={e => handleSuggestionSelect('banker', e.target.value)}
            />
            <datalist id="banker-options">
              {bankerOptions.map((option) => (
                <option key={option} value={option} />
              ))}
            </datalist>
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
