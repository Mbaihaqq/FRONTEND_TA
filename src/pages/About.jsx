export default function About() {
  return (
    <div className="p-4 flex flex-col items-center text-center mt-10">
      <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center text-4xl">
        😎
      </div>
      <h1 className="text-2xl font-bold">Baihaqi</h1>
      <p className="text-gray-500">Mahasiswa Informatika</p>
      
      <div className="bg-white w-full rounded-xl shadow-sm p-4 mt-8 text-left">
        <h3 className="font-bold mb-2">Tentang Aplikasi</h3>
        <p className="text-sm text-gray-600">
          Aplikasi Laundry Millenial adalah proyek Tugas Akhir Praktikum PPB untuk memudahkan tracking status cucian mahasiswa.
        </p>
        <p className="text-xs text-gray-400 mt-4">Versi 1.0.0</p>
      </div>
      
      <button className="text-red-500 font-bold mt-10">Keluar / Logout</button>
    </div>
  );
}