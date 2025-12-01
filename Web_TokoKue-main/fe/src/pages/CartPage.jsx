import { useEffect, useState } from "react";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("🔄 Loading cart for user:", user?.id);
      
      if (!user || !user.id) {
        throw new Error("User tidak tersedia, silakan login kembali");
      }

      // PASTIKAN kirim user_id sebagai query parameter
      const res = await api.get("/carts", {
        params: { user_id: user.id }
      });
      
      console.log("✅ Cart response:", res.data);
      setItems(res.data || []);
      
    } catch (err) {
      console.error("❌ Error loading cart:", err);
      console.error("📊 Error details:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });
      
      setError(err.response?.data?.message || err.message || "Gagal memuat keranjang");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [user]);

  const handleUpdateQty = async (itemId, newQty) => {
    if (newQty <= 0) return;
    
    try {
      console.log(`🔄 Updating item ${itemId} to quantity ${newQty}`);
      
      // PASTIKAN kirim user_id di body
      await api.put(`/carts/${itemId}`, {
        user_id: user.id,
        quantity: newQty,
      });
      
      await loadCart();
      
    } catch (err) {
      console.error("❌ Error updating quantity:", err);
      alert(err.response?.data?.message || "Gagal mengubah jumlah");
    }
  };

  const handleDelete = async (itemId) => {
    if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) return;
    
    try {
      console.log(`🗑️ Deleting item ${itemId}`);
      
      // PASTIKAN kirim user_id di body (pakai data untuk DELETE)
      await api.delete(`/carts/${itemId}`, {
        data: { user_id: user.id }
      });
      
      await loadCart();
      
    } catch (err) {
      console.error("❌ Error deleting item:", err);
      alert(err.response?.data?.message || "Gagal menghapus item");
    }
  };

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Memuat keranjang...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-lg mb-2">❌ Error</div>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={loadCart}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">🛒 Keranjang Belanja</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Keranjang belanja Anda kosong</p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4 border border-gray-200"
              >
                {item.image_url && (
                  <img
                    src={`http://localhost:5000${item.image_url}`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                    }}
                  />
                )}
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                  <p className="text-gray-600 text-sm">
                    Harga: Rp {Number(item.price).toLocaleString("id-ID")}
                  </p>
                  <p className={`text-xs ${item.stock <= 0 ? 'text-red-500' : 'text-gray-500'}`}>
                    Stok: {item.stock <= 0 ? "🛑 Stok Habis" : item.stock}
                  </p>
                  
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQty(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-pink-600">
                    Rp {Number(item.price * item.quantity).toLocaleString("id-ID")}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.quantity} × Rp {Number(item.price).toLocaleString("id-ID")}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600">Total Belanja:</p>
                <p className="text-2xl font-bold text-pink-600">
                  Rp {total.toLocaleString("id-ID")}
                </p>
              </div>
              
              <button
                onClick={() => navigate("/checkout")}
                disabled={items.length === 0 || items.some(item => item.stock <= 0)}
                className="px-8 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Lanjut ke Checkout
              </button>
            </div>
            
            {items.some(item => item.stock <= 0) && (
              <p className="text-red-500 text-sm mt-2">
                ⚠️ Beberapa produk stok habis, tidak dapat checkout
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}