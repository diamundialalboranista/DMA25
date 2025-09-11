// --- Config & helpers ---
const PAGE_SIZE = 12;
function normalizeCountry(v){ return (v || '').trim(); }

// --- Load data ---
async function loadData(){
  const res = await fetch('./data/participaciones.json');
  const data = await res.json();
  return data;
}

// --- Render ---
let state = { all: [], filtered: [], page: 1 };

function renderGrid(items){
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  items.forEach(i => {
    // 1) Sello aleatorio (si tus archivos son sello1.svg ... sello7.svg)
    const randomStamp = `./assets/stamps/sello${Math.floor(Math.random()*7) + 1}.svg`;

    // (si NO los renombraste y siguen 21–27, usa esta variante)
    // const nums = [21,22,23,24,25,26,27];
    // const randomStamp = `./assets/stamps/sello${nums[Math.floor(Math.random()*nums.length)]}.svg`;

    // 2) Miniatura + sello
    const thumbInner = `
      <img src="${i.thumb}" alt="Objeto de ${i.nombre}" class="thumb-img">
      <img src="${randomStamp}" alt="Sello" class="stamp">
    `;

    // 3) Red social (si existe)
    const hasSocial = i.red && i.usuario;
    const redHTML = hasSocial
      ? `<small class="social"><em><img src="./assets/icons/${i.red}.svg" alt="${i.red}" class="red-icon"> ${i.usuario}</em></small>`
      : '';

    // 4) Tarjeta
    const li = document.createElement('li');
    li.className = 'card';
    li.innerHTML = `
      <div class="thumb">${thumbInner}</div>
      <div class="meta">
        <b class="nombre">${i.nombre}</b>
        <small>${i.ciudad} · ${i.pais}</small>
        ${redHTML}
        <div class="objeto">
          <p><strong>Objeto:</strong> ${i.objeto}</p>
          <p><em>Por qué es importante:</em> ${i.mensaje}</p>
        </div>
      </div>
    `;
    grid.appendChild(li);
  });
}

  // el contador total se actualiza en updateView()
}

function countrySet(items){
  return [...new Set(items.map(i => normalizeCountry(i.pais)).filter(Boolean))].sort();
}

function applyFilters(){
  const q = document.getElementById('search').value.toLowerCase().trim();
  const c = normalizeCountry(document.getElementById('country-filter').value);
  const filtered = state.all.filter(i => {
    const text = `${i.usuario} ${i.pais} ${i.ciudad} ${i.objeto} ${i.mensaje}`.toLowerCase();
    const okQ = q ? text.includes(q) : true;
    const okC = c ? normalizeCountry(i.pais) === c : true;
    return okQ && okC;
  });
  state.filtered = filtered;
  state.page = 1;
  updateView();
}

function updateView(){
  const upto  = state.page * PAGE_SIZE;
  const slice = state.filtered.slice(0, upto);
  renderGrid(slice);

  //  Mostrar SIEMPRE el total (según filtros/búsqueda)
  const total = state.filtered.length;
  const label = total === 1 ? 'viajero' : 'viajeros';
  document.getElementById('count').textContent = `${total} ${label}`;

  const hasMore = total > upto;
  const btn = document.getElementById('load-more');
  btn.style.display = hasMore ? 'inline-flex' : 'none';
}

// --- Init ---
loadData().then(items => {
  state.all = items;
  state.filtered = items;

  const select = document.getElementById('country-filter');
  countrySet(items).forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c;
    select.appendChild(opt);
  });

  document.getElementById('search').addEventListener('input', applyFilters);
  select.addEventListener('change', applyFilters);
  document.getElementById('load-more').addEventListener('click', () => {
    state.page += 1;
    updateView();
  });

  updateView();
}).catch(err => {
  console.error('Error cargando datos', err);
});
