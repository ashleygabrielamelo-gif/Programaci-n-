const historiasClinicas = [];

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  generarOdontograma();
  establecerFechaHoy();
});

function showSection(sectionId) {
  document.querySelectorAll('.content-section').forEach(sec => {
    sec.classList.remove('active');
  });
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  document.getElementById(sectionId).classList.add('active');
  event.currentTarget.classList.add('active');
}

function generarOdontograma() {
  const container = document.getElementById('teeth-container');
  container.innerHTML = '';

  for (let i = 1; i <= 16; i++) {
    const tooth = document.createElement('div');
    tooth.className = 'tooth';
    tooth.innerText = i;
    tooth.onclick = () => toggleTooth(tooth, i);
    container.appendChild(tooth);
  }
}

function toggleTooth(element, number) {
  element.classList.toggle('treated');
  const estado = element.classList.contains('treated') ? 'Tratamiento asignado' : 'Sano';
  registrarLog(`[ODONTOGRAMA] Diente #${number} marcado como: ${estado}`);
}

function establecerFechaHoy() {
  const fechaInput = document.getElementById('fecha');
  if (fechaInput) {
    fechaInput.value = new Date().toISOString().split('T')[0];
  }
}

document.getElementById('patient-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const registro = {
    nombre: document.getElementById('nombre').value,
    contacto: document.getElementById('contacto').value,
    antecedentes: document.getElementById('antecedentes').value,
    fecha: document.getElementById('fecha').value,
    profesional: document.getElementById('profesional').value,
    diagnostico: document.getElementById('diagnostico').value,
    procedimiento: document.getElementById('procedimiento').value,
    consentimiento: document.getElementById('consentimiento').checked ? 'Sí' : 'No'
  };

  historiasClinicas.push(registro);
  actualizarTabla();
  actualizarKPIs();
  registrarLog(`[ACCESO/MODIFICACIÓN] Historia guardada para el paciente: ${registro.nombre}`);
  
  this.reset();
  establecerFechaHoy();
  alert('Historia clínica y consentimiento guardados de forma segura.');
});

function actualizarTabla() {
  const tbody = document.getElementById('records-table-body');
  tbody.innerHTML = '';

  historiasClinicas.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.fecha}</td>
      <td><strong>${item.nombre}</strong><br><small>${item.contacto}</small></td>
      <td>${item.diagnostico}</td>
      <td>${item.procedimiento}</td>
      <td>${item.profesional}</td>
      <td><span style="color: green;">✓ ${item.consentimiento}</span></td>
      <td><button onclick="alert('Cargando archivo adjunto / Radiografía de ${item.nombre}')" style="cursor:pointer; border:none; background:none; color:#0284c7;">📁 Ver Adjuntos</button></td>
    `;
    tbody.appendChild(row);
  });
}


function actualizarKPIs() {
  document.getElementById('kpi-atendidos').innerText = 5 + historiasClinicas.length;
}

document.getElementById('appointment-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const paciente = document.getElementById('cita-paciente').value;
  registrarLog(`[AGENDA] Nueva cita agendada para: ${paciente}`);
  alert(`Cita agendada correctamente para ${paciente}`);
  this.reset();
});

function registrarLog(mensaje) {
  const list = document.getElementById('log-list');
  const li = document.createElement('li');
  const hora = new Date().toLocaleTimeString();
  li.innerText = `[${hora}] ${mensaje}`;
  list.prepend(li);
}