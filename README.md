🍰 Toko Kue — Backend RESTful API (Express.js)

Dokumen ini merupakan panduan resmi untuk backend Web E-Commerce Toko Kue yang dikembangkan menggunakan Node.js, Express.js, dan MySQL. Sistem ini menyediakan layanan API untuk pengelolaan produk, autentikasi pengguna, serta proses transaksi yang dapat digunakan oleh aplikasi frontend (React.js).


1. Deskripsi Proyek
Backend Toko Kue dirancang sebagai layanan RESTful API yang menyediakan fitur utama seperti manajemen produk, autentikasi pengguna, serta pemrosesan keranjang dan transaksi. API ini menjembatani komunikasi antara frontend dan database.
Sistem dikembangkan dengan memperhatikan prinsip keamanan, skalabilitas, serta kemudahan integrasi.


2. Fitur Utama
2.1 Autentikasi dan Pengguna

Registrasi akun pengguna
Login menggunakan JSON Web Token (JWT)
Enkripsi kata sandi menggunakan bcrypt
Proteksi endpoint untuk pengguna yang terautentikasi


2.2 Manajemen Produk

Menambahkan produk baru
Mengambil daftar seluruh produk
Mengambil produk berdasarkan ID
Memperbarui data produk
Menghapus produk
Upload gambar produk menggunakan Multer


2.3 Transaksi dan Keranjang

Menambahkan produk ke keranjang
Melihat isi keranjang pengguna
Melakukan checkout pesanan
Menyimpan riwayat transaksi

Dokumentasi Endpoint
2.1 Autentikasi (Auth)
Method	Endpoint	Deskripsi
POST	/api/auth/register	Registrasi pengguna baru
POST	/api/auth/login	Login dan mendapatkan token JWT


4.2 Produk (Product)
Method	Endpoint	Deskripsi
GET	/api/products	Mendapatkan seluruh produk
GET	/api/products/:id	Mendapatkan detail produk
POST	/api/products	Menambahkan produk baru
PUT	/api/products/:id	Memperbarui produk
DELETE	/api/products/:id	Menghapus produk


2.3 Keranjang dan Transaksi
Method	Endpoint	Deskripsi
POST	/api/cart	Menambahkan produk ke keranjang
GET	/api/cart	Melihat keranjang pengguna
POST	/api/checkout	Melakukan checkout


Lisensi
Proyek ini dibuat untuk tujuan pembelajaran dan dapat digunakan, dimodifikasi, serta dikembangkan lebih lanjut tanpa batasan.


anggota kelompok 1 : 
chesa(delate) ridwan() aditiya() lhutfi()
