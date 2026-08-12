// src/routes/admin.tsx
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { upsertProduct, deleteProduct, importCSV } from "../lib/admin-users.functions";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [form, setForm] = useState({ title: '', category: '', price: '', affiliate_link: '', image_url: '', is_demo: false });
  const [csvText, setCsvText] = useState('');

  // Fetch products from Supabase
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  // Add/Update product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = editingProduct ? { id: editingProduct.id, ...form } : form;
    const res = await upsertProduct({ data: payload });
    if (res.success) {
      alert(res.message);
      setIsModalOpen(false);
      setEditingProduct(null);
      setForm({ title: '', category: '', price: '', affiliate_link: '', image_url: '', is_demo: false });
      fetchProducts();
    } else {
      alert("Error: " + res.message);
    }
  };

  // Delete product
  const handleDelete = async (id: string) => {
    if (confirm("Sure delete this product?")) {
      const res = await deleteProduct({ data: { id } });
      alert(res.message);
      fetchProducts();
    }
  };

  // CSV Import
  const handleCSVImport = async () => {
    if (!csvText) return alert("Please paste CSV data!");
    const res = await importCSV({ data: { csvText } });
    alert(res.message);
    setCsvText('');
    fetchProducts();
  };

  // Edit button click
  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setForm({
      title: product.title,
      category: product.category,
      price: product.price,
      affiliate_link: product.affiliate_link,
      image_url: product.image_url,
      is_demo: product.is_demo
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">📦 Admin Panel</h1>
          <button
            onClick={() => { setEditingProduct(null); setForm({ title: '', category: '', price: '', affiliate_link: '', image_url: '', is_demo: false }); setIsModalOpen(true); }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add New Product
          </button>
        </div>

        {/* CSV Import Section */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">📄 Bulk CSV Import</h2>
          <p className="text-sm text-gray-500 mb-2">Columns: title, category, price, affiliate_link, image_url, is_demo (true/false)</p>
          <textarea
            rows={4}
            placeholder="Paste your CSV here..."
            className="w-full border rounded p-2 text-sm"
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
          />
          <button onClick={handleCSVImport} className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Import CSV
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-4">Loading...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-4 text-gray-500">No products found.</td></tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{p.title}</td>
                    <td className="px-6 py-4">{p.category || '-'}</td>
                    <td className="px-6 py-4">${p.price || '0'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${p.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {p.status || 'draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input className="w-full border rounded px-3 py-2" placeholder="Title *" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
                <input className="w-full border rounded px-3 py-2" placeholder="Category" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} />
                <input className="w-full border rounded px-3 py-2" placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} />
                <input className="w-full border rounded px-3 py-2" placeholder="Affiliate Link" value={form.affiliate_link} onChange={(e) => setForm({...form, affiliate_link: e.target.value})} />
                <input className="w-full border rounded px-3 py-2" placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} />
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={form.is_demo} onChange={(e) => setForm({...form, is_demo: e.target.checked})} />
                  <span>Is Demo Product?</span>
                </label>
                <div className="flex justify-end space-x-2 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
    }
