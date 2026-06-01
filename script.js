function generateKodeVerifikasi() {
        return Math.floor(10000 + Math.random() * 90000).toString();
    }
    let kodeVerifikasiGlobal = generateKodeVerifikasi();
    window.addEventListener('DOMContentLoaded', function() {
        initUserDatabaseFIX(); // ✅ Ini aman, tidak hapus data lama
        document.getElementById('kodeDisplay').textContent = kodeVerifikasiGlobal;
        console.log('✅ Sistem siap digunakan');
    });
    const loginContainer = document.getElementById('loginContainer');
    const appContainer = document.getElementById('appContainer');
    const headerLogo = document.querySelector('.header-logo');
    const logoDropdown = document.getElementById('logoDropdown');
    const dropdownExport = document.getElementById('dropdownExport');
    const dropdownImport = document.getElementById('dropdownImport');
    const dropdownPDF = document.getElementById('dropdownPDF');
    const dropdownLogout = document.getElementById('dropdownLogout');
    const importFileInput = document.getElementById('importFile');
    document.body.classList.remove('app-bg');
    document.body.classList.add('login-bg');
if(document.getElementById('kodeDisplay')) {
        document.getElementById('kodeDisplay').textContent = kodeVerifikasiGlobal;
    }
function escapeHtml(text) {
      if (!text) return '';
      return text.replace(/[&<>"']/g, function(m) {
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
      });
    }
function formatDate(dateString) {
  if (!dateString) return '';
  
  // Coba parce tanggal
  let date;
  
  // Format sudah YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    date = new Date(dateString);
  } 
  // Format DD-MM-YYYY
  else if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
    const parts = dateString.split('-');
    date = new Date(parts[2], parts[1] - 1, parts[0]);
  }
  // Format DD/MM/YYYY
  else if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    const parts = dateString.split('/');
    date = new Date(parts[2], parts[1] - 1, parts[0]);
  }
  else {
    // Coba langsung parc
    date = new Date(dateString);
  }
  
  if (isNaN(date)) return dateString; // Kembalikan apa adanya kalo gagal
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}-${month}-${year}`;
}
function normalize(text) {
  if (!text) return '';
  return text
    .toUpperCase()
    .replace(/[\s\-_.()#*\/]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 50);
}
function getPaginatedData() {
  const start = (currentPage - 1) * rowsPerPage;
  return dataTable.slice(start, start + rowsPerPage);
}
function highlightMatch(text, search) {
      if (!search) return escapeHtml(text);
      const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      return escapeHtml(text).replace(regex, '<span class="highlight-red">$1</span>');
    }
function getUser(username) {
  const users = JSON.parse(localStorage.getItem('userDatabase') || '[]');
  return users.find(u => u.username.toUpperCase() === username.toUpperCase());
}
function getAllUsers() {
  return JSON.parse(localStorage.getItem('userDatabase') || '[]');
}
function getUsersTampilan() {
  return getAllUsers().filter(u => u.username !== 'SUPERADMIN');
}
function initUserDatabaseFIX() {
        let users = JSON.parse(localStorage.getItem('userDatabase') || '[]');
        
        // Cek apakah Superadmin sudah ada
        let superadmin = users.find(u => u.username === 'SUPERADMIN');
        
        if (!superadmin) {
            // Buat baru kalau belum ada
            users.push({
                username: 'SUPERADMIN',
                password: '270900',
                nama: 'Muhammad Eldhi',
                role: 'superadmin',
                active: true,
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('userDatabase', JSON.stringify(users));
            console.log('✅ Database dibuat baru');
        } else {
            // Kalau ada tapi passwordnya salah, reset passwordnya saja
            if (superadmin.password !== '270900') {
                superadmin.password = '270900';
                superadmin.active = true;
                localStorage.setItem('userDatabase', JSON.stringify(users));
                console.log('⚠️ Password Superadmin direset');
            }
        }
        
        // DEBUG: Tampilkan semua user
        console.log('📋 Total user:', users.length);
        users.forEach(u => console.log('-', u.username, '|', u.role, '|', u.active));
    }
function validateLogin(username, password) {
  const user = getUser(username);
  if (!user) {
    // Username tidak ditemukan
    alert('Username atau password salah!');
    return null;
  }
  
  // Cek apakah akun dinonaktifkan karena masa aktif habis
  if (user.active === false) {
    alert('⚠️ LAKUKAN PEMBAYARAN SISTEM.\n\nMasa aktif akun telah habis.\n\nSilakan hubungi ADMIN untuk perpanjang.');
    return null;
  }
  
  // Cek password
  if (user.password === password) return user;
  
  // Password salah
  alert('Username atau password salah!');
  return null;
}
function addNewUser(username, password, nama, role = 'user') {
  const users = JSON.parse(localStorage.getItem('userDatabase') || '[]');
  
  // Cek username sudah ada
  if (users.find(u => u.username.toUpperCase() === username.toUpperCase())) {
    return { success: false, message: 'Username sudah digunakan!' };
  }
  
  users.push({
  username: username.toUpperCase(),
  password: password,
  nama: nama,
  role: role,
  active: true,  // ← TAMBAHKAN Default ON
  createdAt: new Date().toISOString()
});
  
  localStorage.setItem('userDatabase', JSON.stringify(users));
  return { success: true, message: 'User berhasil ditambahkan!' };
}
function removeUser(username) {
  const users = JSON.parse(localStorage.getItem('userDatabase') || '[]');
  const filtered = users.filter(u => u.username !== username.toUpperCase());
  localStorage.setItem('userDatabase', JSON.stringify(filtered));
}
function resetDatabase() {
  localStorage.removeItem('userDatabase');
  localStorage.removeItem('appDataTable');
  localStorage.removeItem('currentUser');
  
  localStorage.setItem('userDatabase', JSON.stringify([
    {
      username: 'SUPERADMIN',
      password: '270900',
      nama: 'MUHAMMAD ELDHI',
      role: 'superadmin',
      active: true,
      createdAt: new Date().toISOString()
    }
  ]));
  console.log('Database direset ke SUPERADMIN:270900');
}
if (typeof window !== 'undefined') { /* Jangan dipanggil otomatis */}
function login() {
  const idInput = document.getElementById('loginId').value.trim();
  const passwordInput = document.getElementById('loginPassword').value.trim();
  const kodeVerif = document.getElementById('kodeVerif').value.trim();
  
  // DEBUG: Tampilkan kode yang dibandingkan
  console.log('🔍 INPUT KODE:', kodeVerif);
  console.log('🔍 GLOBAL KODE:', kodeVerifikasiGlobal);
  
  if (!idInput || !passwordInput || !kodeVerif) {
    alert('Masukkan username, password dan kode verifikasi!');
    return;
  }
  
  // 🔄 BANDINGKAN DENGAN CASE INSENSITIVE & TRIM
  if (kodeVerif.toUpperCase() !== kodeVerifikasiGlobal.toUpperCase()) {
    alert('Kode verifikasi SALAH! Coba lagi.\n\nKode yang benar: ' + kodeVerifikasiGlobal);
    kodeVerifikasiGlobal = generateKodeVerifikasi();
    document.getElementById('kodeVerif').value = '';
    document.getElementById('kodeDisplay').textContent = kodeVerifikasiGlobal;
    return;
  }
  
  initUserDatabaseFIX();
  const user = validateLogin(idInput, passwordInput);
  
  if (user) {
    // ==== CEK MASA AKTIF UNTUK USER ====
    if (user.role === 'user') {
      const createdDate = new Date(user.createdAt);
      // ✅ 30 HARI = 30 * 24 * 60 * 60 * 1000
      const expiredDate = new Date(createdDate.getTime() + (30 * 24 * 60 * 60 * 1000));
      const now = new Date();
      const sisaHari = Math.ceil((expiredDate - now) / (1000 * 60 * 60 * 24));
      
      // ✅ PAKE VARIABEL YANG BENAR: sisaHari
      if (sisaHari <= 0) {
        // Nonaktifkan akun
        user.active = false;
        // Update di database
        const users = JSON.parse(localStorage.getItem('userDatabase') || '[]');
        const userIdx = users.findIndex(u => u.username === user.username);
        if (userIdx !== -1) {
          users[userIdx].active = false;
          localStorage.setItem('userDatabase', JSON.stringify(users));
        }
        alert('⚠️ LAKUKAN PEMBAYARAN SISTEM.\n\nMasa aktif akun telah habis.\n\nSilakan hubungi ADMIN untuk perpanjang.');
        return;
      }
      
      // TAMPILKAN SISA WAKTU (DEBUG)
      console.log('⏱️ Sisa masa aktif: ' + sisaHari + ' hari');
    }
    // ================================
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('appContainer').style.display = 'block';
    
    const headerTitle = document.querySelector('.header-title');
    if (headerTitle) {
      const namaUser = user.nama ? user.nama.toUpperCase() : user.username.toUpperCase();
      const roleUser = user.role.toUpperCase();
      headerTitle.textContent = namaUser + ' | ' + roleUser;
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
    loadAppData();
    
    if (user.role === 'superadmin') {
      showUserManagement();
    }
    
    kodeVerifikasiGlobal = generateKodeVerifikasi();
    
  } else {
    // Username/password salah - tidak perlu alert tambahan
    // Karena sudah ada di validateLogin()
  }
}
function logout() {
  if (!confirm('Yakin logout?')) return;
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  // ========== HAPUS SEMUA DATA SAAT LOGOUT ==========
  if (currentUser) {
    localStorage.removeItem('appData_' + currentUser.username);
  }
  localStorage.removeItem('appDataTable');  // ← Hapus juga backup lama
  // ================================================
  
  dataTable = [];
  allDataTable = [];
  // ==============================================
  
  localStorage.removeItem('currentUser');
  
  // Update kode verifikasi
  kodeVerifikasiGlobal = generateKodeVerifikasi();
  document.getElementById('kodeDisplay').textContent = kodeVerifikasiGlobal;
  document.getElementById('kodeVerif').value = '';
  
  // Reset UI
  document.getElementById('appContainer').style.display = 'none';
  document.getElementById('loginContainer').style.display = 'flex';
  document.getElementById('loginForm').reset();
  document.getElementById('userManagementBtn')?.remove();
  document.getElementById('userManagementModal')?.remove();
  
  renderTable();
  document.body.classList.add('login-bg');
}
setInterval(saveAppData, 30000);
function loadAppData() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  if (!currentUser) return;
  
  // SuperAdmin tidak punya data aplikasi sendiri
  if (currentUser.username === 'SUPERADMIN') {
    console.log('📊 SuperAdmin - Tidak memuat data');
    return;
  }
  
  // 🔄 PERBAIKAN: Muat data dari localStorage
  const savedData = localStorage.getItem('appData_' + currentUser.username);
  if (savedData) {
    allDataTable = JSON.parse(savedData);
    console.log('📊 Data dimuat:', allDataTable.length, 'record');
  } else {
    allDataTable = [];
    console.log('📊 Tabel kosong - siap untuk import JSON');
  }
  
  applySearchAndSort();
}
function updateDateTime() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const wibTime = new Date(utc + (3600000 * 7));
  const hariArray = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
  const hari = hariArray[wibTime.getDay()];
  const tgl = String(wibTime.getDate()).padStart(2, '0');
  const bln = String(wibTime.getMonth() + 1).padStart(2, '0');
  const thn = wibTime.getFullYear();
  const jam = String(wibTime.getHours()).padStart(2, '0');
  const menit = String(wibTime.getMinutes()).padStart(2, '0');
  const detik = String(wibTime.getSeconds()).padStart(2, '0');
  document.getElementById('headerDate').textContent = `${hari} ${tgl}-${bln}-${thn}`;
  document.getElementById('headerTime').textContent = `${jam}:${menit}:${detik}`;
}
    let dataTable = [];
    let allDataTable = [];
    let currentSearch = '';
	let pdfList = [];
	let matchedData = [];
    let currentPage = 1;
    const rowsPerPage = 50;
function saveAppData() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  // SuperAdmin tidak menyimpan data
  if (!currentUser || currentUser.username === 'SUPERADMIN') return;
  
  localStorage.setItem('appData_' + currentUser.username, JSON.stringify(allDataTable));
}
function clearForm() {
      document.getElementById('dataForm').reset();
    }
async function addData() {
      const photoFile = document.getElementById('photoInput').files[0];
      const name = document.getElementById('name').value.trim();
      const passport = document.getElementById('passport').value.trim();
      const debtRpRaw = document.getElementById('debtRp').value.trim();
      const debtRmRaw = document.getElementById('debtRm').value.trim();
      const debtBosRaw = document.getElementById('debtBos').value.trim();
      const statusBayar = document.getElementById('statusBayar').value;
      const tanggalMasuk = document.getElementById('tanggalMasuk').value;
      const tujuan = document.getElementById('tujuan').value;
      const keterangan = document.getElementById('keterangan').value.trim();

      if (!name || !passport || !tanggalMasuk || !tujuan || !statusBayar) {
        alert('Semua kolom wajib diisi kecuali Hutang dan Keterangan.');
        return;
      }

      const debtRp = parseFloat(debtRpRaw.replace(/[^\d.-]/g, '')) || 0;
      const debtRm = parseFloat(debtRmRaw.replace(/[^\d.-]/g, '')) || 0;
      const debtBos = parseFloat(debtBosRaw.replace(/[^\d.-]/g, '')) || 0;

	let photoBase64 = '';

if (photoFile) {
  photoBase64 = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(photoFile);
  });
}	

const tanggalLahir = document.getElementById('tanggalLahir').value;

const newData = {
  name,
  passport,
  debtRp,
  debtRm,
  debtBos,
  statusBayar,
  tanggalMasuk,
  tujuan,
  keterangan,
  tanggalLahir: tanggalLahir || '',  // ← TAMBAHKAN
  photo: photoBase64
};

      allDataTable.push(newData);
      applySearchAndSort();
      clearForm();
    }
function editData(index) {
  if (index < 0 || index >= dataTable.length) return;
  const data = dataTable[index];
  
  document.getElementById('name').value = data.name;
  document.getElementById('passport').value = data.passport;
  document.getElementById('debtRp').value = data.debtRp;
  document.getElementById('debtRm').value = data.debtRm;
  document.getElementById('debtBos').value = data.debtBos || '';
  document.getElementById('statusBayar').value = data.statusBayar || '';
  document.getElementById('tanggalMasuk').value = data.tanggalMasuk;
  document.getElementById('tujuan').value = data.tujuan;
  document.getElementById('keterangan').value = data.keterangan;
  document.getElementById('tanggalLahir').value = data.tanggalLahir || '';  // ← TAMBAHKAN

  const allIndex = allDataTable.indexOf(data);
  if (allIndex > -1) allDataTable.splice(allIndex, 1);
  applySearchAndSort();
}
let searchTimeout;
function deleteData(index) {
      if (index < 0 || index >= dataTable.length) return;
      const item = dataTable[index];
      const allIndex = allDataTable.indexOf(item);
      if (allIndex > -1) allDataTable.splice(allIndex, 1);
      applySearchAndSort();
    }
function toggleStatus(index) {
  const data = dataTable[index];
  if (!data) return;
  data.statusBayar = data.statusBayar === 'Belum' ? 'Sudah' : 'Belum';
  const allIndex = allDataTable.findIndex(item => item === data);
  if (allIndex !== -1) allDataTable[allIndex].statusBayar = data.statusBayar;
  renderTable();
}
function searchData() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentSearch = document.getElementById('searchInput').value.trim().toLowerCase();
    currentPage = 1;
    applySearchAndSort();
  }, 300);
}
function applySearchAndSort() {
  if (!currentSearch) {
    dataTable = [...allDataTable];
  } else {
    dataTable = allDataTable.filter(data => data.name.toLowerCase().includes(currentSearch));
  }
  dataTable.sort((a, b) => new Date(b.tanggalMasuk) - new Date(a.tanggalMasuk));
  currentPage = 1;
  renderTable();
}
function updateTotals() {
  const source = allDataTable; // <-- TAMBAHAN INI

  const totalRp = source.reduce((sum, item) =>
    sum + ((item.statusBayar === 'Belum') ? (parseFloat(String(item.debtRp).replace(/[^\d.-]/g, '')) || 0) : 0), 0);

  const totalRm = source.reduce((sum, item) =>
    sum + ((item.statusBayar === 'Belum') ? (parseFloat(item.debtRm) || 0) : 0), 0);

  const totalBos = source.reduce((sum, item) =>
    sum + ((item.statusBayar === 'Belum') ? (parseFloat(item.debtBos) || 0) : 0), 0);

  document.getElementById('totalRp').textContent = `RP ${totalRp.toLocaleString('id-ID')}`;
  document.getElementById('totalRm').textContent = `RM ${totalRm.toLocaleString('id-ID')}`;
  document.getElementById('totalBos').textContent = `${totalBos.toLocaleString('id-ID')}`;
}
function renderTable() {
  const tbody = document.querySelector('#dataTable tbody');
  tbody.innerHTML = '';

  const paginatedData = getPaginatedData();
  const searchLower = currentSearch.toLowerCase();

  if (paginatedData.length === 0) {
    const tr = document.createElement('tr');
    tr.className = 'no-data-row';
    tr.innerHTML = `<td colspan="12">Data tidak ditemukan.</td>`;
    tbody.appendChild(tr);
    updateTotals();
    return;
  }

  paginatedData.forEach((data, index) => {
    const realIndex = (currentPage - 1) * rowsPerPage + index;
    const nameHTML = highlightMatch(data.name, searchLower);
    const passportHTML = escapeHtml(data.passport);
    const debtRp = data.debtRp ? Number(data.debtRp).toLocaleString('id-ID') : '0';
    const debtRm = data.debtRm ? Number(data.debtRm).toLocaleString('id-ID') : '0';
    const debtBos = data.debtBos ? Number(data.debtBos).toLocaleString('id-ID') : '0';
    const statusBayar = data.statusBayar || 'Belum';
    const statusClass = statusBayar === 'Belum' ? 'status-belum' : 'status-sudah';
    const rowClass = statusBayar === 'Belum' ? 'row-belum' : 'row-sudah';

    const tr = document.createElement('tr');
    tr.className = `hover:bg-white cursor-default ${rowClass}`;
    tr.innerHTML = `
      <td>${(currentPage - 1) * rowsPerPage + index + 1}</td>
      <td>${nameHTML}</td>
      <td>${passportHTML}</td>
      <td>${debtRp}</td>
      <td>${debtRm}</td>
      <td>${debtBos}</td>
      <td><button class="status-btn ${statusClass}" onclick="toggleStatus(${realIndex})">${statusBayar}</button></td>
      <td>${formatDate(data.tanggalMasuk)}</td>
      <td>${data.tanggalLahir ? formatDate(data.tanggalLahir) : '-'}</td>
      <td>${escapeHtml(data.tujuan)}</td>
      <td><input type="text" class="ket-input" value="${escapeHtml(data.keterangan)}" oninput="updateKet(${realIndex}, this.value)" /></td>
      <td>
        <button onclick="editData(${realIndex})" class="px-1 py-0.5 text-xs rounded bg-blue-500/20">Edit</button>
        <button onclick="deleteData(${realIndex})" class="px-1 py-0.5 text-xs rounded bg-red-500/20 ml-0.5">Hapus</button>
        <button onclick="viewPhoto(${realIndex})" class="px-1 py-0.5 text-xs rounded bg-green-500/20 ml-0.5">View</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  updateTotals();
  const totalPages = Math.ceil(dataTable.length / rowsPerPage);
  document.getElementById('pageInfo').textContent = `Halaman ${currentPage} / ${totalPages || 1}`;
}
function nextPage() {
  const totalPages = Math.ceil(dataTable.length / rowsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderTable();
  }
}
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
}
function exportToJSON() {
  if (allDataTable.length === 0) {
    alert('Tidak ada data untuk diekspor.');
    return;
  }
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const dataStr = JSON.stringify(allDataTable, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  // Nama file sesuai user
  link.download = 'data_' + currentUser.username + '_' + new Date().toISOString().slice(0,10) + '.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
function importFromJSON(event) {
  const file = event.target.files[0];
  if (!file) {
    alert('Pilih file terlebih dahulu!');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedData = JSON.parse(e.target.result);
      
      if (!Array.isArray(importedData)) {
        throw new Error('Format file tidak valid!');
      }
      
      // Validasi data
      let validData = true;
      for (const item of importedData) {
        if (!item.name || !item.passport || !item.tanggalMasuk || !item.tujuan || !item.statusBayar) {
          validData = false;
          break;
        }
      }
      
      if (!validData) {
        throw new Error('Data tidak lengkap!');
      }
      
      allDataTable = importedData;
      applySearchAndSort();
      
      alert('✅ BERHASIL IMPORT ' + importedData.length + ' DATA!!!');
      
      // Reset input
      document.getElementById('importFile').value = '';
      
    } catch(err) {
      alert('Error: ' + err.message);
    }
  };
  reader.readAsText(file);
}
function exportDatabase() {
  const users = getAllUsers();
  
  if (users.length === 0) {
    alert('Tidak ada user untuk diekspor!'); return;
  }
  
  const backupData = {
    type: 'MISS_ALL_SUNDAY_BACKUP',
    version: '1.0',
    createdAt: new Date().toISOString(),
    users: users,
    totalUser: users.length,
    info: 'Import file ini untuk restore data user'
  };
  
  const blob = new Blob([JSON.stringify(backupData, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'USER_DATABASE_' + new Date().toISOString().slice(0,10) + '.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  alert('✅ Database diekspor!\n\nTotal: ' + users.length + ' user\n\nSimpan file ini agar bisa di-import di perangkat lain!');
}
function importDatabase(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      
      // Validasi format backup
      if (data.type !== 'MISS_ALL_SUNDAY_BACKUP') {
        alert('❌ File backup tidak valid!'); return;
      }
      
      if (!data.users || !Array.isArray(data.users)) {
        alert('❌ Format file backup rusak!'); return;
      }
      
      const usersLama = getAllUsers().length;
      const confirmImport = confirm(
        '⚠️ IMPORT DATABASE?\n\n' +
        'User sekarang: ' + usersLama + '\n' +
        'User di backup: ' + data.users.length + '\n\n' +
        'Masa aktif TIDAK di-reset!\n' +
        'Waktu berjalan dari saat user dibuat.'
      );
      
      if (!confirmImport) return;
      
      // ⏱️ LANGSUNG SIMPAN - tidak reload, tetap di halaman
      localStorage.setItem('userDatabase', JSON.stringify(data.users));
      
      alert('✅ Database di-import!\n\n' + 
            'Total: ' + data.users.length + ' user\n\n' +
            '⏱️ Masa aktif tetap sesuai file (tidak di-reset)');
      
      // 💾 REFRESH TABLE - tanpa logout!
      closeUserManagement();
      openUserManagement(); // Buka ulang modal
      
    } catch(err) {
      alert('❌ Error: ' + err.message);
    }
  };
  reader.readAsText(event.target.files[0]);
  event.target.value = '';
}
function exportFullDatabase() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser || currentUser.role !== 'superadmin') {
    alert('Hanya Superadmin yang dapat mengekspor database!');
    return;
  }
  
  const database = {
    users: getAllUsers(),
    appData: allDataTable,
    exportedAt: new Date().toISOString(),
    exportedBy: currentUser.username
  };
  
  const blob = new Blob([JSON.stringify(database, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'FULL_DATABASE_' + new Date().toISOString().slice(0,10) + '.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  alert('Database berhasil diekspor!');
}
function importFullDatabase(event) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser || currentUser.role !== 'superadmin') {
    alert('Hanya Superadmin yang dapat mengimpor database!');
    return;
  }
  
  const file = event.target.files[0];
  if (!file) return;
  
  if (!confirm('PERINGATAN: Import akan menimpa data yang ada! Lanjutkan?')) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const database = JSON.parse(e.target.result);
      if (database.users) localStorage.setItem('userDatabase', JSON.stringify(database.users));
      if (database.appData) {
        allDataTable = database.appData;
        localStorage.setItem('appDataTable', JSON.stringify(allDataTable));
        applySearchAndSort();
      }
      alert('Database berhasil diimpor!');
    } catch(err) {
      alert('Gagal import: ' + err.message);
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}
function showUserManagement() {
  const pdfContainer = document.getElementById('pdfUploadContainer');
  if (!pdfContainer) return;
  
  if (document.getElementById('userManagementBtn')) return;
  
  // Ambil user sekarang
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) return;
  
  // Cek role - hanya superadmin (huruf kecil)
  if (currentUser.role !== 'superadmin') return;
  
  const userMenuHTML = `
    <button id="userManagementBtn" onclick="openUserManagement()" 
            class="btn bg-purple-700 text-white rounded-xl py-2 px-4 hover:bg-purple-800">
      <i class="fas fa-users"></i> Kelola User
    </button>
  `;
  
  pdfContainer.insertAdjacentHTML('afterend', userMenuHTML);
}
function openUserManagement() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser || currentUser.role !== 'superadmin') {
    alert('Hanya Superadmin yang dapat mengakses!'); return;
  }
  
  const users = getUsersTampilan();
  const hitungUser = users.filter(u => u.role === 'user').length;
  const isMobile = window.innerWidth <= 640;
  
  const maxWidth = isMobile ? '100%' : '800px';
  const padding = isMobile ? '12px' : '24px';
  const fontSize = isMobile ? '14px' : '15px';
  const btnPadding = isMobile ? '12px 16px' : '10px 20px';
  const iconSize = isMobile ? '18px' : 'auto';
  
  let html = `
    <div id="userManagementModal" style="position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;justify-content:center;align-items:center;padding:${isMobile ? '8px' : '20px'};">
      <div style="background:white;border-radius:${isMobile ? '16px' : '16px'};padding:${padding};width:${maxWidth};max-width:100%;max-height:${isMobile ? '92vh' : '90vh'};overflow-y:auto;-webkit-overflow-scrolling:touch;">
        <h2 style="font-size:${isMobile ? '1.3rem' : '1.4rem'};font-weight:700;text-align:center;margin-bottom:16px;color:#1e293b;display:flex;align-items:center;justify-content:center;gap:8px;">
          <span style="font-size:${iconSize};">👥</span> KELOLA USER
        </h2>
        
        <div style="display:flex;gap:10px;margin-bottom:16px;flex-direction:${isMobile ? 'column' : 'row'};">
          <button type="button" onclick="exportDatabase()" style="flex:1;padding:${btnPadding};background:#10b981;color:white;border:none;border-radius:10px;cursor:pointer;font-weight:bold;font-size:${fontSize};display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 12px rgba(16,185,129,0.3);">
            <span>📥</span> Export DB
          </button>
          <label style="flex:1;padding:${btnPadding};background:#f59e0b;color:white;border:none;border-radius:10px;cursor:pointer;font-weight:bold;font-size:${fontSize};display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 12px rgba(245,158,11,0.3);">
            <span>📤</span> Import DB
            <input type="file" id="importDbFile" accept=".json" style="display:none;" onchange="importDatabase(event)">
          </label>
        </div>
        
        <div style="background:linear-gradient(135deg,#f8fafc,#f1f5f9);padding:${isMobile ? '14px' : '16px'};border-radius:12px;margin-bottom:16px;">
          <h3 style="font-weight:600;margin-bottom:12px;font-size:${fontSize};color:#334155;display:flex;align-items:center;gap:6px;">
            <span>+</span> Tambah User Baru
          </h3>
          <div style="display:grid;grid-template-columns:${isMobile ? '1fr' : '1fr 1fr'};gap:10px;">
            <input type="text" id="newUsername" autocomplete="off" placeholder="Username" style="padding:12px;border:1px solid #cbd5e1;border-radius:8px;font-size:${fontSize};background:white;">
            <input type="text" id="newNama" autocomplete="off" placeholder="Nama Lengkap" style="padding:12px;border:1px solid #cbd5e1;border-radius:8px;font-size:${fontSize};background:white;">
          </div>
          <div style="display:grid;grid-template-columns:${isMobile ? '1fr' : '1fr 1fr'};gap:10px;margin-top:10px;">
            <input type="text" id="newPassword" autocomplete="off" placeholder="Password" style="padding:12px;border:1px solid #cbd5e1;border-radius:8px;font-size:${fontSize};background:white;">
            <div style="padding:12px;border:1px solid #cbd5e1;border-radius:8px;font-size:${fontSize};background:#e2e8f0;color:#64748b;font-weight:bold;text-align:center;">USER</div>
          </div>
          <button type="button" onclick="prosesTambahUser()" style="margin-top:12px;width:100%;padding:14px;background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;border-radius:10px;cursor:pointer;font-weight:bold;font-size:${fontSize};box-shadow:0 4px 12px rgba(16,185,129,0.3);">
            + TAMBAH USER
          </button>
        </div>
        
        <h3 style="font-weight:600;margin-bottom:12px;font-size:${fontSize};color:#334155;">
          📋 Daftar User (${hitungUser})
        </h3>
        
        <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
        <table style="width:100%;min-width:${isMobile ? '600px' : '100%'};border-collapse:collapse;font-size:${isMobile ? '12px' : '13px'};">
          <thead>
            <tr style="background:linear-gradient(135deg,#1e293b,#334155);color:white;">
              <th style="padding:8px;text-align:center;font-weight:600;">USERNAME</th>
              <th style="padding:8px;text-align:center;font-weight:600;">NAMA</th>
              <th style="padding:8px;text-align:center;font-weight:600;">ROLE</th>
              <th style="padding:8px;text-align:center;font-weight:600;">STATUS</th>
              <th style="padding:8px;text-align:center;font-weight:600;">MASA AKTIF</th>
              <th style="padding:8px;text-align:center;font-weight:600;">GARANSI</th>
              <th style="padding:8px;text-align:center;font-weight:600;">AKSI</th>
            </tr>
          </thead>
          <tbody>
`;
  
  users.filter(u => u.username !== 'SUPERADMIN').forEach(user => {
    const isCurrentUser = user.username === currentUser.username;
    const isSuperadmin = user.role === 'superadmin';
    
    const statusLabel = user.active === false ? 'Nonaktif' : 'Aktif';
    const statusColor = user.active === false ? 'color:#dc2626;' : 'color:#10b981;';
    
    let roleBadge = '';
    if (user.role === 'superadmin') {
      roleBadge = '<span style="background:linear-gradient(135deg,#f59e0b,#d97706);color:white;padding:3px 8px;border-radius:4px;font-size:0.7rem;font-weight:bold;">ADMIN</span>';
    } else {
      roleBadge = '<span style="background:linear-gradient(135deg,#6366f1,#4f46e5);color:white;padding:3px 8px;border-radius:4px;font-size:0.7rem;font-weight:bold;">USER</span>';
    }
    
    let masaAktifHTML = '';
    let countdownId = 'countdown_masa_' + user.username;
    let countdownId2 = 'countdown2_masa_' + user.username;
    
    if (isSuperadmin) {
      masaAktifHTML = '∞ Tanpa Batas';
    } else if (user.active === false) {
      masaAktifHTML = '<span style="color:#dc2626;font-weight:bold;font-size:0.65rem;">KEDALUWARSA</span>';
    } else {
      // ✅ 2 BARIS DI KOLOM MASA AKTIF (ID berbeda dengan GARANSI)
      masaAktifHTML = `
        <div id="${countdownId}" style="color:#10b981;font-weight:bold;font-size:0.7rem;">⏱️ Menghitung...</div>
        <div id="${countdownId2}" style="color:#10b981;font-size:0.55rem;">-</div>
      `;
    }
    
    let kolOmGaransi = '';
    let kolOmAksi = '';
    
    if (isSuperadmin) {
      kolOmGaransi = '-';
      kolOmAksi = '-';
    } else if (isCurrentUser) {
      kolOmGaransi = '<span style="color:#94a3b8;">(Anda)</span>';
      kolOmAksi = '-';
    } else {
      // GARANSI = 🔄 (ID berbeda dengan countdown_masa_)
      kolOmGaransi = `
        <button type="button" onclick="perpanjangMasaAktif('${user.username}')" 
                style="background:#3b82f6;color:white;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;font-weight:bold;font-size:0.75rem;" 
                title="Perpanjang 30 Hari">🔄</button>
      `;
      
      kolOmAksi = `
        <button type="button" onclick="hapusUserPermanent('${user.username}')" 
                style="background:transparent;color:#dc2626;border:1px solid #dc2626;padding:4px 8px;border-radius:4px;cursor:pointer;font-weight:bold;font-size:0.75rem;" 
                title="Hapus Akun">🗑️</button>
      `;
    }
    
    html += `
            <tr style="border-bottom:1px solid #e2e8f0;background:white;">
              <td style="padding:6px;text-align:center;font-weight:600;">${user.username}</td>
              <td style="padding:6px;text-align:center;font-weight:bold;">${user.nama}</td>
              <td style="padding:6px;text-align:center;">${roleBadge}</td>
              <td style="padding:6px;text-align:center;font-weight:bold;${statusColor}">${statusLabel}</td>
              <td style="padding:4px;text-align:center;line-height:1.4;">${masaAktifHTML}</td>
              <td style="padding:6px;text-align:center;">${kolOmGaransi}</td>
              <td style="padding:6px;text-align:center;">${kolOmAksi}</td>
            </tr>
    `;
  });
  
  html += `
          </tbody>
        </table>
        </div>
        <button type="button" onclick="closeUserManagement()" style="margin-top:16px;width:100%;padding:14px;background:linear-gradient(135deg,#64748b,#475569);color:white;border:none;border-radius:10px;cursor:pointer;font-weight:bold;font-size:${fontSize};box-shadow:0 4px 12px rgba(100,116,139,0.3);">
          TUTUP
        </button>
      </div>
    </div>
  `;
  
  const oldModal = document.getElementById('userManagementModal');
  if (oldModal) oldModal.remove();
  document.body.insertAdjacentHTML('beforeend', html);
  
  startCountdownTimers();
}
function toggleUserActive(username, active) {
  // PENGAMANAN: SuperAdmin tidak bisa dinonaktifkan
  if (username === 'SUPERADMIN') {
    alert('❌ Akun SUPERADMIN tidak dapat dinonaktifkan!'); 
    return;
  }
  
  const users = JSON.parse(localStorage.getItem('userDatabase') || '[]');
  const userIdx = users.findIndex(u => u.username === username);
  
  if (userIdx === -1) {
    alert('User tidak ditemukan!'); return;
  }
  
  if (active === true) {
    // ✅ KLIK ON = HANYA AKTIFKAN, MASA AKTIF TETAP
    users[userIdx].active = true;
    localStorage.setItem('userDatabase', JSON.stringify(users));
    
    alert('✅ User ' + username + ' DIAKTIFKAN!\n\n💡 User sekarang bisa login.\n\n⏱️ Masa aktif tetap seperti sebelumnya.');
  } else {
    // ✅ KLIK OFF = HANYA NONAKTIFKAN, MASA AKTIF TETAP
    users[userIdx].active = false;
    localStorage.setItem('userDatabase', JSON.stringify(users));
    
    alert('⚠️ User ' + username + ' DINONAKTIFKAN!\n\n❌ User tidak bisa login.\n\n💡 Klik ON untuk mengaktifkan.\n\n💡 Klik 🔄 untuk perpanjang masa aktif.');
  }
  
  // ✅ REFRESH MODAL
  openUserManagement();
}
function prosesTambahUser() {
  const username = document.getElementById('newUsername').value.trim().toUpperCase();
  const nama = document.getElementById('newNama').value.trim();
  const password = document.getElementById('newPassword').value.trim();
  const role = 'user';
  
  if (!username || !nama || !password) {
    alert('Semua kolom wajib diisi!'); return;
  }
  
  const users = JSON.parse(localStorage.getItem('userDatabase') || '[]');
  if (users.find(u => u.username === username)) {
    alert('Username sudah digunakan!'); return;
  }
  
  const dibuatPada = new Date().toISOString();
  
  users.push({
    username: username,
    password: password,
    nama: nama,
    role: role,
    active: true,
    createdAt: dibuatPada
  });
  
  localStorage.setItem('userDatabase', JSON.stringify(users));
  
  // Kosongkan form
  document.getElementById('newUsername').value = '';
  document.getElementById('newNama').value = '';
  document.getElementById('newPassword').value = '';
  
  // Langsung refresh modal tanpa download
  closeUserManagement();
  openUserManagement();
  
  alert('✅ User ' + username + ' berhasil ditambahkan!');
}
function perpanjangMasaAktif(username) {
  if (username === 'SUPERADMIN') {
    alert('❌ Akun SUPERADMIN tidak memiliki batasan masa aktif!'); 
    return;
  }
  
  // ✅ 30 HARI
  if (!confirm('🔄 Perpanjang masa aktif ' + username + ' selama 30 HARI?')) return;
  
  const users = JSON.parse(localStorage.getItem('userDatabase') || '[]');
  const userIdx = users.findIndex(u => u.username === username);
  
  if (userIdx === -1) {
    alert('User tidak ditemukan!'); return;
  }
  
  if (users[userIdx].role === 'superadmin' || users[userIdx].role === 'admin') {
    alert('SUPERADMIN & ADMIN tidak memiliki batasan masa aktif!'); return;
  }
  
  // ✅ RESET 30 HARI
  users[userIdx].createdAt = new Date().toISOString();
  users[userIdx].active = true;
  localStorage.setItem('userDatabase', JSON.stringify(users));
  
  alert('✅ Masa aktif ' + username + ' diperpanjang 30 HARI!\n\n⏱️ Timer restart.\n\n✅ Status: AKTIF');
  
  setTimeout(() => {
    closeUserManagement();
    openUserManagement();
  }, 300);
}
function hapusUserPermanent(username) {
  // PENGAMANAN: SuperAdmin tidak bisa dihapus
  if (username === 'SUPERADMIN') {
    alert('❌ Akun SUPERADMIN tidak dapat dihapus!'); 
    return;
  }
  
  if (!confirm('⚠️ PERINGATAN!\n\nMenghapus USER: ' + username + '\n\nData tidak bisa dikembalikan!\n\nLanjutkan?')) return;
  
  const users = JSON.parse(localStorage.getItem('userDatabase') || '[]');
  const filtered = users.filter(u => u.username !== username);
  localStorage.setItem('userDatabase', JSON.stringify(filtered));
  
  alert('✅ User ' + username + ' berhasil dihapus!');
  openUserManagement();
}
function closeUserManagement() {
  const modal = document.getElementById('userManagementModal');
  if (modal) modal.remove();
}
function startCountdownTimers() {
  setInterval(() => {
    const users = JSON.parse(localStorage.getItem('userDatabase') || '[]');
    
    users.forEach(user => {
      if (user.role === 'user') {
        const countdownEl = document.getElementById('countdown_masa_' + user.username);
        const countdownEl2 = document.getElementById('countdown2_masa_' + user.username);
        if (countdownEl) {
          if (user.active === false) {
            countdownEl.innerHTML = '<span style="color:#dc2626;font-weight:bold;font-size:0.7rem;">KEDALUWARSA</span>';
            if (countdownEl2) countdownEl2.style.display = 'none';
            return;
          }
          
          const userCreatedAt = user.createdAt;
          const createdDate = new Date(userCreatedAt);
          const expiredDate = new Date(createdDate.getTime() + (30 * 24 * 60 * 60 * 1000));
          const now = new Date();
          const diff = expiredDate - now;
          
          if (diff <= 0) {
            const userIdx = users.findIndex(u => u.username === user.username);
            if (userIdx !== -1) {
              users[userIdx].active = false;
              localStorage.setItem('userDatabase', JSON.stringify(users));
            }
            
            countdownEl.innerHTML = '<span style="color:#dc2626;font-weight:bold;font-size:0.7rem;">KEDALUWARSA</span>';
            if (countdownEl2) countdownEl2.style.display = 'none';
            refreshUserTable();
            return;
          }
          
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          
          let color = '#10b981';
          if (days <= 3) color = '#dc2626';
          else if (days <= 7) color = '#f59e0b';
          
          // ✅ Di kolom MASA AKTIF
          countdownEl.innerHTML = `<span style="color:${color};font-weight:bold;font-size:0.7rem;">${days} HARI</span>`;
          
          if (countdownEl2) {
            countdownEl2.style.display = 'block';
            countdownEl2.innerHTML = `<span style="color:${color};font-size:0.55rem;">${days}hari ${hours}j ${minutes}m ${seconds}d</span>`;
          }
          
          countdownEl.style.color = color;
        }
      }
    });
  }, 1000);
}
function getSisaMasaAktif(username) {
  const users = JSON.parse(localStorage.getItem('userDatabase') || '[]');
  const user = users.find(u => u.username === username);
  
  if (!user) return 0;
  if (user.role === 'superadmin' || user.role === 'admin') return 999;
  
  // ✅ 30 HARI = 30 * 24 * 60 * 60 * 1000 ms
  const createdDate = new Date(user.createdAt);
  const expiredDate = new Date(createdDate.getTime() + (30 * 24 * 60 * 60 * 1000));
  const now = new Date();
  const sisa = Math.max(0, Math.ceil((expiredDate - now) / (1000 * 60 * 60 * 24))); // Hitung hari
  
  return sisa;
}
function checkAndAutoExpireUsers() {
  const users = JSON.parse(localStorage.getItem('userDatabase') || '[]');
  let updated = false;
  
  users.forEach(user => {
    if (user.role === 'user' && user.active === true) {
      const createdDate = new Date(user.createdAt);
      // ✅ 30 HARI
      const expiredDate = new Date(createdDate.getTime() + (30 * 24 * 60 * 60 * 1000));
      const now = new Date();
      
      if (now >= expiredDate) {
        user.active = false;
        updated = true;
        console.log('⚠️ User ' + user.username + ' expired (30 hari) dan dinonaktifkan');
      }
    }
  });
  
  if (updated) {
    localStorage.setItem('userDatabase', JSON.stringify(users));
  }
}
function checkUserSession() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) return;
  
  if (currentUser.role === 'superadmin' || currentUser.role === 'admin') return;
  
  // ✅ 30 HARI
  const createdDate = new Date(currentUser.createdAt);
  const expiredDate = new Date(createdDate.getTime() + (30 * 24 * 60 * 60 * 1000));
  const now = new Date();
  
  if (now >= expiredDate) {
    console.log('⚠️ User ' + currentUser.username + ' expired! Auto logout...');
    
    localStorage.removeItem('currentUser');
    dataTable = [];
    allDataTable = [];
    document.getElementById('appContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('loginForm').reset();
    kodeVerifikasiGlobal = generateKodeVerifikasi();
    document.getElementById('kodeDisplay').textContent = kodeVerifikasiGlobal;
    document.getElementById('userManagementBtn')?.remove();
    document.getElementById('userManagementModal')?.remove();
    document.body.classList.add('login-bg');
    document.body.classList.remove('app-bg');
  }
}
setInterval(checkUserSession, 1000);
function updateUserInfo(user) {
  const userInfoHTML = `
    <div class="user-info-badge">
      <i class="fas fa-user-circle"></i>
      <span>${user.nama}</span>
      <span class="role-${user.role}">${user.role.toUpperCase()}</span>
    </div>
  `;
  
  // Hapus info lama
  const oldInfo = document.querySelector('.user-info-badge');
  if (oldInfo) oldInfo.remove();
  
  // Tambah info baru setelah title
  const headerTitle = document.querySelector('.header-title');
  if (headerTitle) {
    const namaUser = user.nama ? user.nama.toUpperCase() : user.username.toUpperCase();
  const roleUser = user.role.toUpperCase();
  headerTitle.textContent = namaUser + ' | ' + roleUser;
  }
}
function autoBackupDatabase() {
  const users = getAllUsers();
  const backupData = {
    type: 'MISS_ALL_SUNDAY_BACKUP',
    version: '1.0',
    createdAt: new Date().toISOString(),
    users: users,
    totalUser: users.length
  };
  
  const blob = new Blob([JSON.stringify(backupData, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'BACKUP_USER_DATABASE_' + new Date().toISOString().slice(0,10) + '.json';
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  console.log('💾 Auto-backup dilakukan!');
  alert('💾 Database otomatis di-backup!\n\nSimpan file backup ini di tempat aman.');
}
function cekBackupStatus() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  // SuperAdmin tidak perlu cek backup
  if (currentUser && currentUser.username === 'SUPERADMIN') return;
  
  const users = getAllUsers();
  
  if (users.length === 0) {
    const confirmImport = confirm(
      '⚠️ DATABASE KOSONG!\n\n' +
      'Sepertinya ini pertama kali dibuka di perangkat ini, atau data belum di-backup.\n\n' +
      'IMPORT DATABASE sekarang?\n\n' +
      '(Pilih file backup JSON yang sudah di-download dari perangkat sebelumnya)'
    );
    
    if (confirmImport) {
      document.getElementById('importDbFile').click();
    }
  }
}
async function readPDFFull(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async function () {
      try {
        const typedarray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument({ 
          data: typedarray,
          cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/cmaps/',
          cMapPacked: true 
        }).promise;
        
        let allText = "";

        // 🔥 ALWAYS TRY TEXT FIRST (lebih reliable di HP)
        console.log("📖 Extracting TEXT layer...");
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(" ");
          allText += " " + pageText;
        }

        // 🔥 OCR HANYA jika text BURUK (bukan <100 chars)
        if (allText.trim().length < 500 || !allText.match(/[A-Z]{1,2}[0-9]{6}/)) {
          console.log("🔍 Text kurang bagus → OCR ACTIVATED");
          allText = await ocrAllPages(pdf);
        }

        const pdfList = parseManifestAdvanced(allText);
        
        // 🔥 MINIMUM 3 ITEMS - VALIDASI HP
        if (pdfList.length < 3) {
          console.warn("⚠️ Hanya", pdfList.length, "items. Mencoba regex lebih agresif...");
          const extraList = aggressivePassportParse(allText);
          pdfList.push(...extraList);
        }
        
        console.log("📄 FINAL EXTRACTED:", pdfList.length, "items:", pdfList.map(p=>p.passport));
        resolve([...new Set(pdfList.map(JSON.stringify))].map(JSON.parse)); // UNIQUE
      } catch (err) {
        console.error("PDF ERROR:", err);
        reject(err);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}
async function ocrAllPages(pdf) {
  let ocrText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    
    // 🔥 FIX HP/LAPTOP: DYNAMIC SCALE BERDASARKAN DEVICE
    const devicePixelRatio = window.devicePixelRatio || 1;
    let scale = 2.5 * devicePixelRatio; // ↑ TINGGI INI
    scale = Math.min(scale, 4.0); // MAX 4x prevent memory crash
    
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    // 🔥 FIX SIZE HP
    canvas.height = Math.floor(viewport.height);
    canvas.width = Math.floor(viewport.width);
    
    // 🔥 BETTER RENDERING
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    
    await page.render(renderContext).promise;
    
    // 🔥 BETTER OCR CONFIG - HP FRIENDLY
    try {
      const { data: { text } } = await Tesseract.recognize(canvas, 'ind+eng', {
        logger: m => console.log(m), // DEBUG
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ', // STRICTER
        preserve_interword_spaces: '1'
      });
      ocrText += " " + text;
    } catch (ocrError) {
      console.warn("OCR Page", i, "failed:", ocrError);
      // FALLBACK: gunakan text extraction jika OCR gagal
      const textContent = await page.getTextContent();
      ocrText += " " + textContent.items.map(item => item.str).join(" ");
    }
    
    // 🔥 CLEANUP MEMORY - CRUCIAL UNTUK HP
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.remove();
  }
  console.log("🔍 OCR Complete:", ocrText.length, "chars");
  return ocrText.trim();
}
function aggressivePassportParse(text) {
  const patterns = [
    /[A-Z]{2}[0-9]{7,9}/gi,
    /[A-Z][0-9]{6,10}/gi,
    /P[A-Z0-9]{6,}/gi,
    /[A-Z]{3}[0-9]{6}/gi  // Tambahan pattern
  ];
  
  let passports = [];
  patterns.forEach(pattern => {
    const matches = text.match(pattern) || [];
    passports.push(...matches);
  });
  
  return [...new Set(passports)]
    .filter(p => p.length >= 6 && p.length <= 12)
    .map(passport => {
      // Simple name fallback
      const before = text.substring(Math.max(0, text.toUpperCase().indexOf(passport.toUpperCase()) - 50), 
                                   text.toUpperCase().indexOf(passport.toUpperCase()));
      const nameMatch = before.match(/[A-Z][A-Z\s]{5,25}$/);
      return {
        passport: passport.toUpperCase(),
        name: nameMatch ? nameMatch[0].trim() : "UNKNOWN"
      };
    });
}
function parseManifestAdvanced(text) {
  const pdfList = [];
  
  // Pattern cari passport
  const passportPatterns = [
    /[A-Z]{1,2}[0-9]{6,9}/gi, 
    /[A-Z][0-9]{5,10}/gi, 
    /P[A-Z0-9]{6,}/gi
  ];
  
  let allPassports = [];
  passportPatterns.forEach(pattern => {
    const matches = text.match(pattern) || [];
    allPassports.push(...matches);
  });
  allPassports = [...new Set(allPassports.map(p => p.toUpperCase()))];

  // Pattern cari TANGGAL LAHIR (多种格式)
  const dobPatterns = [
    /\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})\b/g,        // DD-MM-YYYY atau DD/MM/YYYY
    /\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})\b/g,       // DD-MM-YY atau DD/MM/YY
    /\b(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})\b/g,      // YYYY-MM-DD
    /\b(\d{1,2})\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[A-Z]*\s+(\d{4})\b/gi  // DD MON YYYY
  ];
  
  let allDOBs = [];
  
  // Pattern 1-3: Angka
  [/\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})\b/g, /\b(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})\b/g].forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      if (match[1].length === 4) {
        // YYYY-MM-DD
        allDOBs.push(`${match[1]}-${match[2]}-${match[3]}`);
      } else {
        // DD-MM-YYYY atau DD-MM-YY
        const year = match[3].length === 2 ? '20' + match[3] : match[3];
        allDOBs.push(`${match[1].padStart(2,'0')}-${match[2].padStart(2,'0')}-${year}`);
      }
    }
  });
  
  // Pattern 4: Bulan teks (JAN, FEB, dll)
  const monthMap = {'JAN':'01','FEB':'02','MAR':'03','APR':'04','MAY':'05','JUN':'06','JUL':'07','AUG':'08','SEP':'09','OCT':'10','NOV':'11','DEC':'12'};
  const textMonthPattern = /\b(\d{1,2})\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[A-Z]*\s+(\d{4})\b/gi;
  let match;
  while ((match = textMonthPattern.exec(text)) !== null) {
    allDOBs.push(`${match[1].padStart(2,'0')}-${monthMap[match[2].toUpperCase()]}-${match[3]}`);
  }
  
  allDOBs = [...new Set(allDOBs)];

  // Loop setiap passport → cari nama & tanggal lahir
  allPassports.forEach(passport => {
    const index = text.toUpperCase().indexOf(passport);
    if (index === -1) return;
    
    // Cari nama sebelum passport
    const beforeText = text.substring(Math.max(0, index - 100), index);
    const nameCandidates = beforeText.match(/[A-ZÀ-Ú][A-ZÀ-Úa-zÀ-Ú\s]{3,30}([A-ZÀ-Ú][A-ZÀ-Úa-zÀ-Ú\s]{2,20})?/gi) || [];
    
    let bestName = "";
    let bestDistance = Infinity;
    nameCandidates.forEach(candidate => {
      const cleanName = candidate.replace(/[\d\-\/()#*]/g, '').replace(/\s+/g, ' ').trim();
      if (cleanName.length >= 5 && cleanName.split(' ').length >= 2) {
        const nameIndex = beforeText.lastIndexOf(cleanName);
        const distance = index - nameIndex;
        if (distance < bestDistance && distance > 5) {
          bestName = cleanName;
          bestDistance = distance;
        }
      }
    });
    
    // Cari tanggal lahir di dekat passport (±50 char)
    const nearText = text.substring(Math.max(0, index - 80), Math.min(text.length, index + 80));
    let dob = '';
    for (let dobCandidate of allDOBs) {
      if (nearText.includes(dobCandidate.replace(/-/g, '/')) || 
          nearText.includes(dobCandidate.replace(/-/g, '-'))) {
        dob = dobCandidate;
        break;
      }
    }
    
    if (bestName) {
      pdfList.push({ 
        name: bestName.trim(), 
        passport: passport,
        tanggalLahir: dob  // ← TAMBAHKAN
      });
    }
  });
  
  return pdfList.filter(item => item.passport.length >= 6 && item.name.length >= 5);
}
function findExactMatches(pdfList) {
  const matched = [];
  
  console.log(`🔍 MULAI MATCHING: ${pdfList.length} PDF vs ${allDataTable.length} TABEL...`);
  
  pdfList.forEach((pdfItem, pdfIndex) => {
    const pdfPassport = pdfItem.passport.toUpperCase().trim();
    const pdfName = pdfItem.name.toUpperCase().trim();
    const pdfDOB = pdfItem.tanggalLahir;
    
    console.log(`\n📄 PDF[${pdfIndex+1}]: ${pdfItem.name} | ${pdfPassport} | DOB: ${pdfDOB}`);
    
    const tableMatches = allDataTable.filter(tableItem => {
      const tablePassport = (tableItem.passport || '').toUpperCase().trim();
      const tableName = tableItem.name.toUpperCase().trim();
      const tableDOB = tableItem.tanggalLahir || '';
      
      // Cek masing-masing要素 (100% EXACT)
      const namaCocok = isNamaMatch(tableName, pdfName);
      const dobCocok = isDOBMatch(tableDOB, pdfDOB);
      const passportCocok = isPassportMatch(tablePassport, pdfPassport);
      
      // ========== 5️⃣ KOMBINASI 100% EXACT ==========
      
      // 1️⃣ 100%: NAMA + DOB + PASSPORT (PRIORITY #1)
      if (namaCocok && dobCocok && passportCocok) {
        console.log(`  ✅ 100% NAMA+DOB+PASSPORT: ${tableItem.name}`);
        return true;
      }
      
      // 2️⃣ 100%: NAMA + DOB
      if (namaCocok && dobCocok && !passportCocok) {
        console.log(`  ✅ 100% NAMA+DOB: ${tableItem.name}`);
        return true;
      }
      
      // 3️⃣ 100%: NAMA + PASSPORT
      if (namaCocok && passportCocok && !dobCocok) {
        console.log(`  ✅ 100% NAMA+PASSPORT: ${tableItem.name}`);
        return true;
      }
      
      // 4️⃣ 100%: DOB + PASSPORT
      if (dobCocok && passportCocok && !namaCocok) {
        console.log(`  ✅ 100% DOB+PASSPORT: ${tableItem.name}`);
        return true;
      }
      
      // 5️⃣ 100%: PASSPORT SAJA (PRIORITY TERAKHIR)
      if (passportCocok && !namaCocok && !dobCocok) {
        console.log(`  ✅ 100% PASSPORT: ${tableItem.name}`);
        return true;
      }
      return false;
    });
    
    matched.push(...tableMatches);
  });
  
  // Hilangkan duplikasi berdasarkan passport
  const uniqueMatched = [...new Map(matched.map(item => [item.passport, item])).values()]
    .sort((a, b) => new Date(b.tanggalMasuk) - new Date(a.tanggalMasuk));
  
  console.log(`\n✅ TOTAL MATCH:  ${uniqueMatched.length}/${pdfList.length} PDF`);
  return uniqueMatched;
}
function downloadMatchedPDF(matchedData, tujuan) {
  if (matchedData.length === 0) {
    alert('Tidak ada data untuk diunduh.');
    return;
  }
  
  try {
    // =================>>> WARNA TUJUAN <<<================
    const titleColor = tujuan === 'KUKUP' ? [0, 180, 0] : [220, 50, 50];  // Hijau / Merah
    // =====================================================
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userName = currentUser ? currentUser.nama : 'Admin';
    
    // ==================== HEADER ====================
    doc.setFillColor(35, 35, 35);
    doc.rect(0, 0, 297, 32, 'F');
    
    // Judul "LAPORAN DATA" (PUTIH) - di posisi 5mm
    doc.setFontSize(16);
    doc.setFont("helvetica", 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('LAPORAN DATA', 68, 8);
    
    // Judul tujuan - di posisi ~50mm (dengan spasi)
    doc.setTextColor(...titleColor);
    doc.text(tujuan.toUpperCase(), 115, 8);  // spasi dari 5mm ke 52mm
    
    // Garis
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.5);
    doc.line(0, 12, 210, 12);
    
    // Garis
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.5);
    doc.line(0, 13, 210, 13);
    
    // ========== INFO ==========
    const tgl = new Date();
    const tglStr = String(tgl.getDate()).padStart(2, '0') + '/' + 
                  String(tgl.getMonth() + 1).padStart(2, '0') + '/' + 
                  tgl.getFullYear();
    const jam = String(tgl.getHours()).padStart(2, '0') + ':' + 
               String(tgl.getMinutes()).padStart(2, '0') + ' WIB';
    
    doc.setFontSize(8);
    doc.setFont("helvetica", 'bold');
    doc.setTextColor(255, 255, 255);
    
    doc.text('USER         : ' + userName.toUpperCase(), 5, 20);
    doc.text('TANGGAL : ' + tglStr, 5, 28);
    doc.text('JAM           : ' + jam, 5, 24);
    
    doc.setFontSize(8);
    doc.setFont("helvetica", 'bold');
    doc.setTextColor(255, 255, 255);
    
    doc.text('DARI               : ' + 'MALAYSIA' , 148, 20);
    doc.text('TUJUAN 	: ' + 'INDONESIA', 148, 24);
    doc.text('PELABUHAN : '+'TANJUNG BALAI KARIMUN' , 148, 28);
    
    // ==================== TABEL ====================
    const headers = [
      'NO', 'NAMA', 'PASSPORT', 
      'RP', 'RM', 'BOS', 
      'STATUS', 'LAHIR', 'MASUK', 'TUJUAN'
    ];
    
    const rows = matchedData.map((data, index) => [
      index + 1,
      data.name || '-',
      data.passport || '-',
      data.debtRp ? Number(data.debtRp).toLocaleString('id-ID') : '-',
      data.debtRm ? Number(data.debtRm).toLocaleString('id-ID') : '-',
      data.debtBos ? Number(data.debtBos).toLocaleString('id-ID') : '-',
      data.statusBayar || '-',
      data.tanggalLahir ? formatDate(data.tanggalLahir) : '-',
      formatDate(data.tanggalMasuk) || '-',
      data.tujuan || '-'
    ]);
    
    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 35,
      styles: {
        fontSize: 8,
        cellPadding: 1.5,
        halign: 'center',
        valign: 'middle'
      },
      headStyles: {
        fillColor: [35, 35, 35],
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 8
      },
      bodyStyles: {
        textColor: [0, 0, 0],
        fontSize: 8
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      columnStyles: {
        0: { cellWidth: 7, halign: 'center' },
        1: { cellWidth: 35, halign: 'center' },
        2: { cellWidth: 22, halign: 'center' },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 18, halign: 'center' },
        5: { cellWidth: 16, halign: 'center' },
        6: { cellWidth: 14, halign: 'center' },
        7: { cellWidth: 20, halign: 'center' },
        8: { cellWidth: 20, halign: 'center' },
        9: { cellWidth: 16, halign: 'center' }
      },
      margin: { left: 11, right: 25 },
      theme: 'grid'
    });

    // ==================== TOTAL ====================
    const belumBayar = matchedData.filter(item => 
      item.statusBayar?.toUpperCase() === 'BELUM'
    );
    const totalRp = belumBayar.reduce((sum, item) => sum + (Number(item.debtRp) || 0), 0);
    const totalRm = belumBayar.reduce((sum, item) => sum + (Number(item.debtRm) || 0), 0);
    const totalBos = belumBayar.reduce((sum, item) => sum + (Number(item.debtBos) || 0), 0);

    const finalY = doc.lastAutoTable.finalY + 8;
    
    doc.setFillColor(200, 200, 200);
    doc.rect(50, finalY, 110, 14, 'FD');
    
    doc.setFontSize(9);
    doc.setFont("helvetica", 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('TOTAL BELUM BAYAR : ' + belumBayar.length + ' PENUMPANG', 105, finalY + 5, { align: 'center' });
    
    doc.setFontSize(9);
    doc.text(
      'Rp ' + totalRp.toLocaleString('id-ID') + ' | RM ' + totalRm.toLocaleString('id-ID') + ' | Bos ' + totalBos.toLocaleString('id-ID'),
      105, finalY + 11, { align: 'center' }
    );

    // ==================== FOOTER ====================
    const footerY = finalY + 18;
    doc.setLineWidth(0.3);
    doc.line(11, footerY, 198, footerY);
    
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Hak Cipta 2025-2026 Muhammad Eldhi', 11, footerY + 5);

    // Save
    doc.save('MATCH_' + tujuan.toUpperCase() + '_' + matchedData.length + 'DATA_' + new Date().toISOString().slice(0,10) + '.pdf');
    
    console.log('✅ PDF Downloaded: ' + tujuan);
  } catch (error) {
    console.error('PDF Error:', error);
    alert('Gagal download PDF: ' + error.message);
  }
}
function renderMatchTable() {
  const tbody = document.querySelector("#matchTable tbody");
  if (!tbody) return;
  
  tbody.innerHTML = matchedData.length === 0 
    ? '<tr><td colspan="7" class="text-center">No data</td></tr>'
    : matchedData.map((item, i) => `
      <tr>
        <td>${i+1}</td>
        <td>${item.name}</td>
        <td>${item.passport}</td>
        <td>${item.debtRp?.toLocaleString()}</td>
        <td>${item.debtRm?.toLocaleString()}</td>
        <td>${item.statusBayar}</td>
        <td>${item.matchType}</td>
      </tr>
    `).join('');
}
function viewPhoto(index) {
  const data = dataTable[index];

  console.log("DEBUG FOTO:", data); // optional debug

  if (!data || !data.photo) {
    alert("Tidak ada foto");
    return;
  }

  document.getElementById('modalImg').src = data.photo;
  document.getElementById('photoModal').style.display = 'flex';
}
function closePhoto() {
  document.getElementById('photoModal').style.display = 'none';
}
async function downloadPDF() {
  if (dataTable.length === 0) {
    alert('Tidak ada data untuk diunduh.');
    return;
  }
  
  try {
    // =================>>> KERTAS A4 PORTRAIT <<<================
    const kertasLebar = 210;   // A4 Portrait
    const kertasTinggi = 297;  // A4 Portrait
    // =========================================
    
    const { jsPDF } = window.jspdf;
    
    // ✅ PORTRAIT orientation
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userName = currentUser ? currentUser.nama : 'Admin';
  
  // ==================== HEADER ====================
  doc.setFillColor(0, 0, 0);
  doc.rect(0, 0, 297, 32, 'F');
  
  // Judul
    doc.setFontSize(16);
    doc.setFont("helvetica", 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('LAPORAN DATA PENUMPANG', 64, 8);
    
    // Garis
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.5);
    doc.line(0, 12, 210, 12);
    
    // Garis
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.5);
    doc.line(0, 13, 210, 13);
    
    // ========== INFO ==========
    const tgl = new Date();
    const tglStr = String(tgl.getDate()).padStart(2, '0') + '/' + 
                  String(tgl.getMonth() + 1).padStart(2, '0') + '/' + 
                  tgl.getFullYear();
    const jam = String(tgl.getHours()).padStart(2, '0') + ':' + 
               String(tgl.getMinutes()).padStart(2, '0') + ' WIB';
    
    doc.setFontSize(8);
    doc.setFont("helvetica", 'bold');
    doc.setTextColor(255, 255, 255);
    
    doc.text('USER         : ' + userName.toUpperCase(), 5, 20);
    doc.text('TANGGAL : ' + tglStr, 5, 28);
    doc.text('JAM           : ' + jam, 5, 24);
    
    doc.setFontSize(8);
    doc.setFont("helvetica", 'bold');
    doc.setTextColor(255, 255, 255);
    
    doc.text('DARI               : ' + 'MALAYSIA' , 148, 20);
    doc.text('TUJUAN 	: ' + 'INDONESIA', 148, 24);
    doc.text('PELABUHAN : '+'TANJUNG BALAI KARIMUN' , 148, 28);
  
  // ==================== TABEL ====================148
  const headers = [
    'NO', 'NAMA', 'PASSPORT', 
    'RP', 'RM', 'BOS', 
    'STATUS', 'LAHIR', 'MASUK', 'TUJUAN'
  ];
  
  const rows = dataTable.map((data, index) => [
    index + 1,
    data.name || '-',
    data.passport || '-',
    data.debtRp ? Number(data.debtRp).toLocaleString('id-ID') : '-',
    data.debtRm ? Number(data.debtRm).toLocaleString('id-ID') : '-',
    data.debtBos ? Number(data.debtBos).toLocaleString('id-ID') : '-',
    data.statusBayar || '-',
    data.tanggalLahir ? formatDate(data.tanggalLahir) : '-',
    formatDate(data.tanggalMasuk) || '-',
    data.tujuan || '-'
  ]);
  
  doc.autoTable({
    head: [headers],
    body: rows,
    startY: 35,
    styles: {
      fontSize: 8,
      cellPadding: 1.5,
      halign: 'center',
      valign: 'middle'
    },
    headStyles: {
      fillColor: [0, 0, 0],
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 8
    },
    bodyStyles: {
      textColor: [0, 0, 0],
      fontSize: 8
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240]
    },
    columnStyles: {
      0: { cellWidth: 7, halign: 'center' },
      1: { cellWidth: 35, halign: 'center' },
      2: { cellWidth: 22, halign: 'center' },
      3: { cellWidth: 20, halign: 'center' },
      4: { cellWidth: 18, halign: 'center' },
      5: { cellWidth: 16, halign: 'center' },
      6: { cellWidth: 14, halign: 'center' },
      7: { cellWidth: 20, halign: 'center' },
      8: { cellWidth: 20, halign: 'center' },
      9: { cellWidth: 16, halign: 'center' }
    },
    margin: { left: 11, right: 25 },
    theme: 'grid'
  });

  // ==================== TOTAL ====================
  const belumBayar = dataTable.filter(item => 
    item.statusBayar?.toUpperCase() === 'BELUM'
  );
  const totalRp = belumBayar.reduce((sum, item) => sum + (Number(item.debtRp) || 0), 0);
  const totalRm = belumBayar.reduce((sum, item) => sum + (Number(item.debtRm) || 0), 0);
  const totalBos = belumBayar.reduce((sum, item) => sum + (Number(item.debtBos) || 0), 0);

  const finalY = doc.lastAutoTable.finalY + 8;
  
  // Box
  doc.setFillColor(240, 240, 240);
  doc.rect(50, finalY, 110, 14, 'FD');
  
  // Text
  doc.setFontSize(9);
  doc.setFont("helvetica", 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('TOTAL BELUM BAYAR: ' + belumBayar.length + ' PENUMPANG', 105, finalY + 5, { align: 'center' });
  
  doc.setFontSize(9);
  doc.text(
    'Rp ' + totalRp.toLocaleString('id-ID') + ' | RM ' + totalRm.toLocaleString('id-ID') + ' | Bos ' + totalBos.toLocaleString('id-ID'),
    105, finalY + 11, { align: 'center' }
  );

  // ==================== FOOTER ====================
  const footerY = finalY + 18;
  doc.setLineWidth(0.3);
  doc.line(11, footerY, 198, footerY);
  
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('Hak Cipta 2025-2026 Muhammad Eldhi', 11, footerY + 5);

  doc.save('DATA_PENUMPANG_' + new Date().toISOString().slice(0,10) + '.pdf');
    
    console.log('✅ PDF Downloaded successfully');
  } catch (error) {
    console.error('PDF Error:', error);
    alert('Gagal download PDF: ' + error.message);
  }
}
function isNamaMatch(tableName, pdfName) {
  if (!tableName || !pdfName) return false;
  
  // ✅ 100% EXACT - uppercase + trim + hapus spasiExtra
  const n1 = tableName.toUpperCase().replace(/\s+/g, ' ').trim();
  const n2 = pdfName.toUpperCase().replace(/\s+/g, ' ').trim();
  
  // ✅ 100% EXACT MATCH
  if (n1 === n2) return true;
  
  return false;
}
function isDOBMatch(tableDOB, pdfDOB) {
  if (!tableDOB || !pdfDOB) return false;
  
  // ✅ Normalize format ke YYYY-MM-DD
  const normalizeDate = (date) => {
    if (!date) return '';
    // Sudah YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
    // DD-MM-YYYY
    if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(date)) {
      const parts = date.split('-');
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    // DD/MM/YYYY
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) {
      const parts = date.split('/');
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return date;
  };
  
  const tDOB = normalizeDate(tableDOB);
  const pDOB = normalizeDate(pdfDOB);
  
  // ✅ 100% EXACT MATCH (format sama)
  if (tDOB === pDOB) return true;
  
  return false;
}
function isPassportMatch(tablePassport, pdfPassport) {
  if (!tablePassport || !pdfPassport) return false;
  
  // ✅ 100% EXACT - uppercase + trim
  const p1 = tablePassport.toUpperCase().trim();
  const p2 = pdfPassport.toUpperCase().trim();
  
  // ✅ 100% EXACT MATCH
  if (p1 === p2) return true;
  
  return false;
}

function detectTujuanPDF(pdfData) {
  const allText = pdfData.map(item => item.name.toUpperCase()).join(' ');
  
  // KUKUP KEYWORDS
  const kukupKeywords = ['KUKUP', 'KUKUP', 'KKP'];
  if (kukupKeywords.some(keyword => allText.includes(keyword))) {
    return 'KUKUP';
  }
  
  // JOHOR KEYWORDS
  const johorKeywords = ['JOHOR', 'JB', 'JOHOR BARU', 'JHR'];
  if (johorKeywords.some(keyword => allText.includes(keyword))) {
    return 'JOHOR';
  }
  
  // FALLBACK - cek tabel mana yang lebih banyak match
  const kukupCount = allDataTable.filter(item => item.tujuan === 'KUKUP').length;
  const johorCount = allDataTable.filter(item => item.tujuan === 'JOHOR').length;
  return kukupCount >= johorCount ? 'KUKUP' : 'JOHOR';
}
function ultimateMatch(pdfData, tableData, tujuan) {
  const matched = [];
  
  tableData.forEach(tableItem => {  // HANYA loop filtered table
    const tablePassport = tableItem.passport.toUpperCase().trim();
    const tableName = normalizeName(tableItem.name);
    
    // LAYER 1: PASSPORT EXACT MATCH (PRIORITY #1)
    const passportMatch = pdfData.find(pdfItem => 
      pdfItem.passport.toUpperCase().trim() === tablePassport
    );
    if (passportMatch) {
      console.log(`✅ PASSPORT MATCH: ${tableItem.name} (${tablePassport})`);
      matched.push({...tableItem, matchType: 'PASSPORT'});
      return;
    }
    
    // LAYER 2: NAMA EXACT/FUZZY MATCH (PRIORITY #2)
    const nameMatches = pdfData.filter(pdfItem => {
      const pdfName = normalizeName(pdfItem.name);
      const similarityScore = nameSimilarity(tableName, pdfName);
      
      // EXACT atau 85%+ similarity
      return tableName === pdfName || similarityScore > 0.85;
    });
    
    if (nameMatches.length > 0) {
      console.log(`✅ NAMA MATCH: ${tableItem.name} (${similarityScore})`);
      matched.push({...tableItem, matchType: 'NAMA', pdfMatches: nameMatches});
      return;
    }
    
    // LAYER 3: PARTIAL PASSPORT + NAMA (PRIORITY #3)
    const partialMatch = pdfData.find(pdfItem => {
      const pdfPassport = pdfItem.passport.toUpperCase().trim();
      const pdfName = normalizeName(pdfItem.name);
      
      // Passport partial (minimal 5 char) + nama mirip
      const passportPartial = tablePassport.length >= 5 && 
        pdfPassport.includes(tablePassport.slice(-5));
      const namePartial = nameSimilarity(tableName, pdfName) > 0.75;
      
      return passportPartial && namePartial;
    });
    
    if (partialMatch) {
      console.log(`✅ PARTIAL MATCH: ${tableItem.name}`);
      matched.push({...tableItem, matchType: 'PARTIAL'});
    }
  });
  
  return matched;
}
function normalizeDate(dateStr) {
  if (!dateStr) return '';
  
  // Format already: YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  
  // Format DD-MM-YYYY atau DD/MM/YYYY
  if (/^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}$/.test(dateStr)) {
    const parts = dateStr.split(/[\/\-]/);
    return `${parts[2]}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`;
  }
  
  // Format DD-MM-YY
  if (/^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2}$/.test(dateStr)) {
    const parts = dateStr.split(/[\/\-]/);
    return `20${parts[2]}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`;
  }
  
  return '';
}

document.addEventListener('DOMContentLoaded', function() {
  // Inisialisasi database (tidak akan hapus user lama)
  initUserDatabaseFIX();
  
  // Generate kode verifikasi baru
  kodeVerifikasiGlobal = generateKodeVerifikasi();
  document.getElementById('kodeDisplay').textContent = kodeVerifikasiGlobal;
  
  console.log('✅ Sistem siap digunakan');
});
setTimeout(() => {
  cekBackupStatus();
}, 2000);
function toggleDropdown() {
  const logoDropdown = document.getElementById('logoDropdown');
  const headerLogo = document.querySelector('.header-logo');
  if (!logoDropdown) return;
  
  if (logoDropdown.classList.contains('show')) {
    logoDropdown.classList.remove('show');
  } else {
    logoDropdown.classList.add('show');
  }
}
document.addEventListener('click', (e) => {
      if (!headerLogo.contains(e.target)) {
        logoDropdown.classList.remove('show');
        headerLogo.setAttribute('aria-expanded', 'false');
        logoDropdown.setAttribute('aria-hidden', 'true');
      }
    });
    headerLogo.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleDropdown();
      } else if (e.key === 'Escape') {
        logoDropdown.classList.remove('show');
        headerLogo.setAttribute('aria-expanded', 'false');
        logoDropdown.setAttribute('aria-hidden', 'true');
        headerLogo.focus();
      }
    });
    headerLogo.addEventListener('click', () => {
      toggleDropdown();
    });
    if (dropdownExport) {
    dropdownExport.addEventListener('click', function() {
    exportToJSON();
    toggleDropdown();
  });
}
    if (dropdownImport) {
  dropdownImport.addEventListener('click', function() {
    const input = document.getElementById('importFile');
    if (input) input.click();
    toggleDropdown();
  });
}
    if (importFileInput) {
  importFileInput.addEventListener('change', function(event) {
    if (event.target.files.length > 0) {
      importFromJSON(event);
    }
  });  
}
    if (dropdownPDF) {
  dropdownPDF.addEventListener('click', function() {
    downloadPDF();
    toggleDropdown();
  });
}
    if (dropdownLogout) {
  dropdownLogout.addEventListener('click', function() {
    logout();
    toggleDropdown();
  });
}
function refreshUserTable() {
  const modal = document.getElementById('userManagementModal');
  if (modal) {
    openUserManagement();
  }
}
function hapusUser(username) {
  if (!confirm('Yakin hapus user ' + username + '?')) return;
  removeUser(username);
  openUserManagement();
}
function updateKet(index, value) {
  const data = dataTable[index];
  if (!data) return;
  data.keterangan = value;
  const allIndex = allDataTable.findIndex(item => item === data);
  if (allIndex !== -1) allDataTable[allIndex].keterangan = value;
}
async function autoProcessPDF() {
  const file = document.getElementById('pdfUpload').files[0];
  if (!file) return alert("📁 Pilih file PDF dulu!");
  if (allDataTable.length === 0) return alert("📊 Import JSON dulu!");

  const btn = event.target;
  const originalText = btn.textContent;
  btn.textContent = "⏳ Processing...";
  btn.disabled = true;

  try {
    // 1. BACA PDF & EXTRACT passport + nama
    const pdfList = await readPDFFull(file);
    if (pdfList.length === 0) return alert("❌ TIDAK ADA PASSPORT DI PDF!!!");

    console.log("📄 PDF Extracted:", pdfList.length, "items");

    // 2. CARI MATCH di TABEL DATA
    const matched = findExactMatches(pdfList);
    console.log("✅ MATCH di TABEL:", matched.length, "data");

    if (matched.length === 0) {
      alert("❌ TIDAK ADA DATA COCOK !!!\n\nANDA TIDAK PERLU MENUNGGU KAPAL !!!");
      return;
    }

    // 3. HANYA KUKUP & JOHOR (TIDAK ADA LAINNYA)
    const matchedKukup = matched.filter(item => item.tujuan?.toUpperCase() === 'KUKUP');
    const matchedJohor = matched.filter(item => item.tujuan?.toUpperCase() === 'JOHOR');

    console.log(`📊 MATCH TABLE: KUKUP=${matchedKukup.length} | JOHOR=${matchedJohor.length}`);

    // 4. DOWNLOAD HANYA KUKUP & JOHOR
    let downloaded = 0;
    
    if (matchedKukup.length > 0) {
      downloadMatchedPDF(matchedKukup, 'KUKUP');
      downloaded++;
    }
    
    if (matchedJohor.length > 0) {
      downloadMatchedPDF(matchedJohor, 'JOHOR');
      downloaded++;
    }

    // 5. NOTIFIKASI (TANPA LAINNYA)
    const totalMatch = matchedKukup.length + matchedJohor.length;
    
    alert(`✅ SELESAI!!!\n\n📊 TOTAL DATA COCOK :  ${totalMatch} DATA\n\n📋 RINCIAN :\n• DARI KUKUP : ${matchedKukup.length}\n• DARI JOHOR BAHRU : ${matchedJohor.length}`);

  } catch (error) {
    console.error("ERROR:", error);
    alert("❌ " + error.message);
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
    document.getElementById('pdfUpload').value = '';
  }
}
function formatTanggalLahir(input) {
  // Hapus karakter non-angka
  let value = input.value.replace(/[^\d]/g, '');
  
  // Format automatis: DD-MM-YYYY
  if (value.length > 2) {
    value = value.substring(0,2) + '-' + value.substring(2);
  }
  if (value.length > 5) {
    value = value.substring(0,5) + '-' + value.substring(5,9);
  }
  
  // Batasi max 10 karakter (DD-MM-YYYY)
  input.value = value.substring(0, 10);
}
function setTanggalLahirFromPicker(dateValue) {
  if (!dateValue) return;
  
  // Ubah format YYYY-MM-DD menjadi DD-MM-YYYY untuk tampilan
  const parts = dateValue.split('-');
  const formatted = parts[2] + '-' + parts[1] + '-' + parts[0];
  
  // Set ke input teks
  document.getElementById('tanggalLahir').value = formatted;
}
