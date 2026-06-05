// ==========================================================================
// Mock Database State
// ==========================================================================
let invoices = [
  { id: "EXT-1001", vendor: "IamInterviewed", date: "2026-06-01", amount: 1450.50, status: "Submitted", validation: "Valid", created: "2026-06-04" },
  { id: "EXT-1002", vendor: "Initech", date: "2026-06-03", amount: 980.00, status: "Processing", validation: "Invalid", created: "2026-06-04" },
  { id: "EXT-1003", vendor: "Hooli", date: "2026-05-28", amount: 4500.00, status: "Approved", validation: "Valid", created: "2026-05-29" },
  { id: "EXT-1004", vendor: "Acme Corp", date: "2026-05-29", amount: 320.75, status: "Submitted", validation: "Valid", created: "2026-06-01" },
  { id: "EXT-1005", vendor: "IamInterviewed", date: "2026-06-02", amount: 890.00, status: "Processing", validation: "Valid", created: "2026-06-03" },
  { id: "EXT-1006", vendor: "Soylent Corp", date: "2026-05-25", amount: 1200.00, status: "Submitted", validation: "Invalid", created: "2026-05-27" },
  { id: "EXT-1007", vendor: "Wayne Enterprises", date: "2026-06-01", amount: 15400.00, status: "Approved", validation: "Valid", created: "2026-06-02" },
  { id: "EXT-1008", vendor: "Initech", date: "2026-05-30", amount: 75.50, status: "Processing", validation: "Valid", created: "2026-06-01" },
  { id: "EXT-1009", vendor: "Hooli", date: "2026-06-02", amount: 6200.00, status: "Submitted", validation: "Invalid", created: "2026-06-04" },
  { id: "EXT-1010", vendor: "Umbrella Corp", date: "2026-05-15", amount: 9800.00, status: "Approved", validation: "Invalid", created: "2026-05-18" },
  { id: "EXT-1011", vendor: "Tyrell Corp", date: "2026-06-03", amount: 24500.00, status: "Processing", validation: "Valid", created: "2026-06-04" },
  { id: "EXT-1012", vendor: "Massive Dynamic", date: "2026-05-22", amount: 3750.25, status: "Approved", validation: "Valid", created: "2026-05-23" },
  { id: "EXT-1013", vendor: "Gekko & Co", date: "2026-05-18", amount: 18500.00, status: "Submitted", validation: "Valid", created: "2026-05-20" },
  { id: "EXT-1014", vendor: "Wonka Industries", date: "2026-05-20", amount: 640.00, status: "Processing", validation: "Invalid", created: "2026-05-21" },
  { id: "EXT-1015", vendor: "Cyberdyne Systems", date: "2026-06-01", amount: 8900.00, status: "Submitted", validation: "Valid", created: "2026-06-03" }
];

// Vendor billing items mapping to simulate invoice lines dynamically
const vendorItems = {
  "IamInterviewed": [
    { desc: "AWS Infrastructure Hosting (May 2026)", qty: 1, price: 1000.00 },
    { desc: "DevOps Consulting Services", qty: 5, price: 90.10 }
  ],
  "Initech": [
    { desc: "Office Supplies & Filing Folders", qty: 20, price: 15.00 },
    { desc: "Printer Toner Cartridges", qty: 4, price: 170.00 }
  ],
  "Hooli": [
    { desc: "Nucleus Platform Enterprise License", qty: 1, price: 4000.00 },
    { desc: "Premium Support SLA", qty: 1, price: 500.00 }
  ],
  "Acme Corp": [
    { desc: "Anvil Shipments", qty: 2, price: 150.00 },
    { desc: "Tether Rope Bundle", qty: 1, price: 20.75 }
  ],
  "Soylent Corp": [
    { desc: "Raw Organic Matter Processing", qty: 10, price: 120.00 }
  ],
  "Wayne Enterprises": [
    { desc: "Advanced Prototyping Alloys", qty: 2, price: 7000.00 },
    { desc: "Tactical Fabric Samples", qty: 4, price: 350.00 }
  ],
  "Umbrella Corp": [
    { desc: "Viral Research Subscriptions", qty: 1, price: 9800.00 }
  ],
  "Tyrell Corp": [
    { desc: "Replicant Maintenance Services", qty: 2, price: 12250.00 }
  ],
  "Massive Dynamic": [
    { desc: "Quantum Telemetry Consulting", qty: 10, price: 375.025 }
  ],
  "Gekko & Co": [
    { desc: "Corporate Restructuring Audits", qty: 1, price: 18500.00 }
  ],
  "Wonka Industries": [
    { desc: "Confectionary Research Lab Supplies", qty: 4, price: 160.00 }
  ],
  "Cyberdyne Systems": [
    { desc: "Neural Net Processor Blueprints", qty: 1, price: 8900.00 }
  ]
};

// Vendor email mapping
const vendorEmails = {
  "IamInterviewe": "billing@globex.com",
  "Initech": "accounting@initech.com",
  "Hooli": "accounts-payable@hooli.xyz",
  "Acme Corp": "billing@acme.org",
  "Soylent Corp": "finance@soylent.co",
  "Wayne Enterprises": "invoices@waynecorp.com",
  "Umbrella Corp": "ap@umbrellacorp.net",
  "Tyrell Corp": "nexus-billing@tyrell.io",
  "Massive Dynamic": "finance@massivedynamic.com",
  "Gekko & Co": "billing@gekko.co",
  "Wonka Industries": "treasury@wonka.com",
  "Cyberdyne Systems": "accounts@cyberdyne.jp"
};

// ==========================================================================
// Variables & Filters
// ==========================================================================
let filteredInvoices = [...invoices];
let selectedInvoice = null;

let currentTab = "all"; // "all" | "bad"
let searchQuery = "";
let selectedStatus = "all";

let sortColumn = "created";
let sortDirection = "desc"; // "asc" | "desc"

let currentPage = 1;
const itemsPerPage = 10;

// ==========================================================================
// DOM Elements
// ==========================================================================
const invoiceTableBody = document.getElementById("invoiceTableBody");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

// Stats KPI
const kpiTotal = document.getElementById("kpiTotal");
const kpiValid = document.getElementById("kpiValid");
const kpiInvalid = document.getElementById("kpiInvalid");

// Tab counters
const countAll = document.getElementById("countAll");
const countBad = document.getElementById("countBad");

// Tabs
const tabAll = document.getElementById("tabAll");
const tabBad = document.getElementById("tabBad");

// Buttons & Actions
const btnUpload = document.getElementById("btnUpload");
const btnPull = document.getElementById("btnPull");
const btnRefresh = document.getElementById("btnRefresh");

// Context Menu
const contextMenu = document.getElementById("customContextMenu");
const contextView = document.getElementById("contextView");
const contextDelete = document.getElementById("contextDelete");

// Modals
const viewModal = document.getElementById("viewModal");
const btnCloseModal = document.getElementById("btnCloseModal");
const btnCloseModalFooter = document.getElementById("btnCloseModalFooter");
const btnDownloadPDF = document.getElementById("btnDownloadPDF");

const uploadModal = document.getElementById("uploadModal");
const btnCloseUploadModal = document.getElementById("btnCloseUploadModal");
const btnCancelUpload = document.getElementById("btnCancelUpload");
const uploadForm = document.getElementById("uploadForm");

const notificationModal = document.getElementById("notificationModal");
const btnCloseNotificationModal = document.getElementById("btnCloseNotificationModal");
const btnCancelNotification = document.getElementById("btnCancelNotification");
const notificationForm = document.getElementById("notificationForm");

// Toast Container
const toastContainer = document.getElementById("toastContainer");

// Pagination elements
const showingStart = document.getElementById("showingStart");
const showingEnd = document.getElementById("showingEnd");
const showingTotal = document.getElementById("showingTotal");
const btnPrevPage = document.getElementById("btnPrevPage");
const btnNextPage = document.getElementById("btnNextPage");
const pageNumbers = document.getElementById("pageNumbers");

// Set System Date in Header
document.getElementById("dateDisplay").innerText = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric"
});

// ==========================================================================
// Initialization & Core Rendering
// ==========================================================================
function init() {
  updateMetrics();
  applyFilters();
  setupEventListeners();
}

function updateMetrics() {
  const total = invoices.length;
  const valid = invoices.filter(inv => inv.validation === "Valid").length;
  const invalid = invoices.filter(inv => inv.validation === "Invalid").length;
  const sumAmount = invoices.reduce((acc, curr) => acc + curr.amount, 0);

  // Animate counts
  animateValue(kpiTotal, parseInt(kpiTotal.innerText) || 0, total, 400);
  animateValue(kpiValid, parseInt(kpiValid.innerText) || 0, valid, 400);
  animateValue(kpiInvalid, parseInt(kpiInvalid.innerText) || 0, invalid, 400);

  // Tab counters
  countAll.innerText = total;
  countBad.innerText = invalid;
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function applyFilters() {
  filteredInvoices = invoices.filter(invoice => {
    // Tab validation filter
    if (currentTab === "bad" && invoice.validation !== "Invalid") return false;

    // Search query filter (Vendor or Invoice ID)
    const matchesSearch = invoice.vendor.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          invoice.id.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    // Status filter
    if (selectedStatus !== "all" && invoice.status !== selectedStatus) return false;

    return true;
  });

  // Apply sorting
  sortInvoices();

  // Reset pagination
  currentPage = 1;
  renderTable();
}

function sortInvoices() {
  filteredInvoices.sort((a, b) => {
    let valA = a[sortColumn];
    let valB = b[sortColumn];

    // Handle string comparisons case-insensitively
    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    // Date parsing for date sorting
    if (sortColumn === "date" || sortColumn === "created") {
      valA = new Date(valA);
      valB = new Date(valB);
    }

    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
}

function renderTable() {
  invoiceTableBody.innerHTML = "";

  const totalEntries = filteredInvoices.length;
  
  if (totalEntries === 0) {
    emptyState.classList.remove("hidden");
    invoiceTableBody.innerHTML = "";
    updatePaginationControls(0);
    return;
  }
  
  emptyState.classList.add("hidden");

  // Pagination bounds
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = Math.min(startIdx + itemsPerPage, totalEntries);
  const paginatedItems = filteredInvoices.slice(startIdx, endIdx);

  paginatedItems.forEach(invoice => {
    const tr = document.createElement("tr");
    
    // Highlight invalid rows with light red background (Required by User)
    if (invoice.validation === "Invalid") {
      tr.classList.add("row-invalid");
    }

    // Format dates nicely
    const dateFormatted = formatDate(invoice.date);
    const createdFormatted = formatDate(invoice.created);
    const amountFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(invoice.amount);

    tr.innerHTML = `
      <td>${invoice.id}</td>
      <td><strong>${invoice.vendor}</strong></td>
      <td>${dateFormatted}</td>
      <td class="text-right"><strong>${amountFormatted}</strong></td>
      <td><span class="badge badge-${invoice.status.toLowerCase()}">${invoice.status}</span></td>
      <td>
        <span class="validation-badge val-${invoice.validation.toLowerCase()}">
          <span class="val-dot"></span>${invoice.validation}
        </span>
      </td>
      <td>${createdFormatted}</td>
      <td class="text-center">
        <button class="btn-notify-cta" data-id="${invoice.id}" ${invoice.validation !== 'Invalid' ? 'disabled' : ''}>
          <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 2px; vertical-align: middle;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          Notify
        </button>
      </td>
      <td class="text-center">
        <button class="btn-action-trigger" data-id="${invoice.id}">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
        </button>
      </td>
    `;
    
    invoiceTableBody.appendChild(tr);
  });

  updatePaginationControls(totalEntries);
  setupTableActionButtons();
  setupNotificationButtons();
}

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split("-");
  if (!year || !month || !day) return dateStr;
  return `${parseInt(month)}/${parseInt(day)}/${year}`;
}

function updatePaginationControls(totalEntries) {
  const totalPages = Math.ceil(totalEntries / itemsPerPage);
  
  if (totalEntries === 0) {
    showingStart.innerText = "0";
    showingEnd.innerText = "0";
    showingTotal.innerText = "0";
    btnPrevPage.disabled = true;
    btnNextPage.disabled = true;
    pageNumbers.innerHTML = "";
    return;
  }

  showingStart.innerText = (currentPage - 1) * itemsPerPage + 1;
  showingEnd.innerText = Math.min(currentPage * itemsPerPage, totalEntries);
  showingTotal.innerText = totalEntries;

  btnPrevPage.disabled = currentPage === 1;
  btnNextPage.disabled = currentPage === totalPages;

  pageNumbers.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = `page-num ${i === currentPage ? 'active' : ''}`;
    btn.innerText = i;
    btn.addEventListener("click", () => {
      currentPage = i;
      renderTable();
    });
    pageNumbers.appendChild(btn);
  }
}

// ==========================================================================
// Toast Notification Engine
// ==========================================================================
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <span>${message}</span>
  `;
  
  if (type === "danger") {
    toast.querySelector("svg").innerHTML = `<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>`;
  }

  toastContainer.appendChild(toast);
  
  // Auto remove after animations finish (4s)
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// ==========================================================================
// Event Listeners & Interactive Handlers
// ==========================================================================
function setupEventListeners() {
  // Tabs
  tabAll.addEventListener("click", () => {
    currentTab = "all";
    tabAll.classList.add("active");
    tabBad.classList.remove("active");
    applyFilters();
  });

  tabBad.addEventListener("click", () => {
    currentTab = "bad";
    tabAll.classList.remove("active");
    tabBad.classList.add("active");
    applyFilters();
  });

  // Search input
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    applyFilters();
  });

  // Status Filter Select
  statusFilter.addEventListener("change", (e) => {
    selectedStatus = e.target.value;
    applyFilters();
  });

  // Refresh
  btnRefresh.addEventListener("click", () => {
    showToast("Refreshing invoice list...", "success");
    applyFilters();
    updateMetrics();
  });

  // Sortable table headers
  const headers = document.querySelectorAll(".invoice-table th.sortable");
  headers.forEach(header => {
    header.addEventListener("click", () => {
      const field = header.getAttribute("data-sort");
      if (sortColumn === field) {
        sortDirection = sortDirection === "asc" ? "desc" : "asc";
      } else {
        sortColumn = field;
        sortDirection = "asc";
      }

      // Reset header classes
      headers.forEach(h => {
        const icon = h.querySelector(".sort-icon");
        icon.className = "sort-icon";
      });

      const activeIcon = header.querySelector(".sort-icon");
      activeIcon.classList.add(sortDirection);

      applyFilters();
    });
  });

  // Pagination buttons
  btnPrevPage.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
    }
  });

  btnNextPage.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderTable();
    }
  });

  // Modal close buttons
  btnCloseModal.addEventListener("click", closeModal);
  btnCloseModalFooter.addEventListener("click", closeModal);
  
  btnCloseUploadModal.addEventListener("click", closeUploadModal);
  btnCancelUpload.addEventListener("click", closeUploadModal);

  // Open native file upload selector on button click
  const fileInput = document.getElementById("fileInput");
  btnUpload.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    showToast(`Uploading and analyzing ${file.name}...`, "success");

    setTimeout(() => {
      // Simulate invoice parsing
      const randomVendor = ["IamInterviewed", "Initech", "Hooli", "Acme Corp", "Soylent Corp", "Wayne Enterprises"][Math.floor(Math.random() * 6)];
      const randomAmount = Math.floor(Math.random() * 8500) + 150;
      const randomValidation = Math.random() > 0.35 ? "Valid" : "Invalid";
      const invoiceId = `EXT-10${invoices.length + 1}`;

      const newInvoice = {
        id: invoiceId,
        vendor: randomVendor,
        date: new Date().toISOString().substring(0, 10),
        amount: randomAmount,
        status: "Submitted",
        validation: randomValidation,
        created: new Date().toISOString().substring(0, 10)
      };

      invoices.unshift(newInvoice);
      updateMetrics();
      applyFilters();
      showToast(`File ${file.name} successfully parsed as invoice ${invoiceId}!`, "success");
      
      // Reset input value
      fileInput.value = "";
    }, 1200);
  });

  btnPull.addEventListener("click", () => {
    showToast("Pulling external invoices from ledger server...", "success");
    setTimeout(() => {
      // Mock pull 2 new invoices
      const pulls = [
        { id: `EXT-10${invoices.length + 1}`, vendor: "Wayne Enterprises", date: "2026-06-03", amount: 4800.00, status: "Submitted", validation: "Valid", created: "2026-06-04" },
        { id: `EXT-10${invoices.length + 2}`, vendor: "Wonka Industries", date: "2026-06-02", amount: 1500.00, status: "Processing", validation: "Invalid", created: "2026-06-04" }
      ];
      invoices.unshift(...pulls);
      updateMetrics();
      applyFilters();
      showToast("Successfully pulled 2 new invoices.", "success");
    }, 1200);
  });

  // Download PDF Button Mock
  btnDownloadPDF.addEventListener("click", () => {
    showToast(`Generating and downloading PDF copy of ${selectedInvoice.id}...`, "success");
  });

  // Notification Modal Handlers
  btnCloseNotificationModal.addEventListener("click", closeNotificationModal);
  btnCancelNotification.addEventListener("click", closeNotificationModal);
  
  notificationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const vendor = document.getElementById("notifVendor").value;
    const invId = document.getElementById("notifInvoiceId").value;
    const to = document.getElementById("notifTo").value;
    
    showToast(`Sending escalation alert to ${to}...`, "success");
    
    setTimeout(() => {
      closeNotificationModal();
      showToast(`Escalation alert sent to ${vendor} (${to}) for invoice ${invId}!`, "success");
    }, 1000);
  });

  // Click outside context menu to close it
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".btn-action-trigger") && !e.target.closest(".context-menu")) {
      closeContextMenu();
    }
  });
}

function setupTableActionButtons() {
  const triggers = document.querySelectorAll(".btn-action-trigger");
  triggers.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const invoiceId = btn.getAttribute("data-id");
      selectedInvoice = invoices.find(inv => inv.id === invoiceId);

      // Deactivate all triggers, active this one
      triggers.forEach(t => t.classList.remove("active"));
      btn.classList.add("active");

      // Position context menu next to the action trigger button (Context Menu Required by User)
      const rect = btn.getBoundingClientRect();
      const tableContainer = document.querySelector(".table-container");
      const containerRect = tableContainer.getBoundingClientRect();
      
      // Calculate offset inside the scrolled/positioned relative table
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      // Position absolute relative to page
      contextMenu.style.top = `${rect.bottom + scrollTop + 6}px`;
      contextMenu.style.left = `${rect.left + scrollLeft - 108}px`; // align context menu cleanly to the left of the button

      contextMenu.classList.remove("hidden");
    });
  });
}

function closeContextMenu() {
  contextMenu.classList.add("hidden");
  const triggers = document.querySelectorAll(".btn-action-trigger");
  triggers.forEach(t => t.classList.remove("active"));
}

// Context Menu Action Handlers
contextView.addEventListener("click", () => {
  closeContextMenu();
  if (selectedInvoice) {
    openViewModal(selectedInvoice);
  }
});

contextDelete.addEventListener("click", () => {
  closeContextMenu();
  if (selectedInvoice) {
    if (confirm(`Are you sure you want to delete invoice ${selectedInvoice.id} for ${selectedInvoice.vendor}?`)) {
      // Find row and animate deletion
      const row = Array.from(document.querySelectorAll("#invoiceTableBody tr")).find(tr => {
        return tr.querySelector("td").innerText === selectedInvoice.id;
      });

      if (row) {
        row.style.transition = "all 0.4s ease";
        row.style.opacity = "0";
        row.style.transform = "translateX(20px)";
        
        setTimeout(() => {
          invoices = invoices.filter(inv => inv.id !== selectedInvoice.id);
          updateMetrics();
          applyFilters();
          showToast(`Invoice ${selectedInvoice.id} deleted successfully.`, "danger");
          selectedInvoice = null;
        }, 400);
      } else {
        invoices = invoices.filter(inv => inv.id !== selectedInvoice.id);
        updateMetrics();
        applyFilters();
        showToast(`Invoice ${selectedInvoice.id} deleted.`, "danger");
        selectedInvoice = null;
      }
    }
  }
});

// ==========================================================================
// Modal Controllers
// ==========================================================================
function openViewModal(invoice) {
  document.getElementById("modalInvoiceId").innerText = invoice.id;
  document.getElementById("modalVendor").innerText = invoice.vendor;
  document.getElementById("modalDate").innerText = formatDate(invoice.date);
  
  // Status tag update
  const statusEl = document.getElementById("modalStatus");
  statusEl.className = `meta-val badge badge-${invoice.status.toLowerCase()}`;
  statusEl.innerText = invoice.status;

  // Validation tag update
  const valEl = document.getElementById("modalValidation");
  valEl.className = `meta-val validation-badge val-${invoice.validation.toLowerCase()}`;
  valEl.innerHTML = `<span class="val-dot"></span>${invoice.validation}`;

  // Populate line items
  const itemsContainer = document.getElementById("modalInvoiceItems");
  itemsContainer.innerHTML = "";

  const items = vendorItems[invoice.vendor] || [
    { desc: "General Consultation & Operations Services", qty: 1, price: invoice.amount }
  ];

  let subtotal = 0;
  items.forEach(item => {
    const itemTotal = item.qty * item.price;
    subtotal += itemTotal;
    
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.desc}</td>
      <td class="text-right">${item.qty}</td>
      <td class="text-right">${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}</td>
      <td class="text-right">${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(itemTotal)}</td>
    `;
    itemsContainer.appendChild(tr);
  });

  const tax = subtotal * 0.1;
  const grandTotal = subtotal + tax;

  document.getElementById("modalSubtotal").innerText = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(subtotal);
  document.getElementById("modalTax").innerText = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tax);
  document.getElementById("modalGrandTotal").innerText = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(grandTotal);

  viewModal.classList.remove("hidden");
}

function closeModal() {
  viewModal.classList.add("hidden");
}

function closeUploadModal() {
  uploadModal.classList.add("hidden");
  uploadForm.reset();
}

function setupNotificationButtons() {
  const notifyButtons = document.querySelectorAll(".btn-notify-cta");
  notifyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const invoiceId = btn.getAttribute("data-id");
      const invoice = invoices.find(inv => inv.id === invoiceId);
      if (invoice) {
        openNotificationModal(invoice);
      }
    });
  });
}

function openNotificationModal(invoice) {
  const vendorEmail = vendorEmails[invoice.vendor] || `billing@${invoice.vendor.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`;
  
  document.getElementById("notifVendor").value = invoice.vendor;
  document.getElementById("notifInvoiceId").value = invoice.id;
  document.getElementById("notifTo").value = vendorEmail;
  document.getElementById("notifSubject").value = `URGENT: Invoice validation issues for #${invoice.id}`;
  document.getElementById("notifMessage").value = `Dear Client,\n\nWe are writing to inform you that invoice #${invoice.id} dated ${formatDate(invoice.date)} has been flagged as Invalid during our compliance review.\n\nPlease log in to the vendor portal and correct the validation discrepancies. Let us know if you have any questions.\n\nBest regards,\nSarah Jenkins\nFinance Department`;

  notificationModal.classList.remove("hidden");
}

function closeNotificationModal() {
  notificationModal.classList.add("hidden");
  notificationForm.reset();
}

// ==========================================================================
// Bootstrap
// ==========================================================================
document.addEventListener("DOMContentLoaded", init);
