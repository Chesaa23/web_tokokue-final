🍰 Toko Kue — RESTful API (Express.js)

Project ini adalah RESTful API untuk Web E-Commerce Toko Kue, dibuat menggunakan Node.js + Express.js dengan database MySQL. API ini digunakan untuk mengelola produk, pengguna, dan transaksi pemesanan kue yang akan ditampilkan di frontend React.js.

🚀 Fitur Utama
🔑 Autentikasi & User

Register
Login
Hash password (bcrypt)


🎂 Produk

Tambah produk
Tampilkan semua produk
Tampilkan produk berdasarkan ID
Edit produk
Hapus produk


🛒 Keranjang & Transaksi
Tambah ke keranjang
Checkout
Riwayat pesanan

📡 Endpoint API
👤 Auth
Method	Endpoint	Deskripsi
POST	/api/auth/register	Registrasi user
POST	/api/auth/login	Login user

🎂 Produk
Method	Endpoint	Deskripsi
GET	/api/products	Ambil semua produk
GET	/api/products/:id	Detail produk
POST	/api/products	Tambah produk
PUT	/api/products/:id	Update produk
DELETE	/api/products/:id	Hapus produk

🛒 Keranjang & Checkout

(opsional jika kamu ingin fitur lanjut)

Method	Endpoint	Deskripsi
POST	/api/cart	Tambah ke keranjang
GET	/api/cart	Lihat keranjang user
POST	/api/checkout	Checkout

🌐 Frontend (React.js)

Backend ini digunakan oleh frontend React.js pada repo berbeda:
https://github.com/username/toko-kue-fe

📝 Lisensi
Project ini dibuat untuk pembelajaran dan bebas digunakan.

anggota kelompok:

chesa khansa l (delate)
ridwan ()
lhutfi ()
adit ()
