// Construcción del archivo de Excel con los registros del evento.
//
// Vive aparte de la vista para poder generarlo también desde un script de
// Node con los datos reales y revisar el resultado antes de entregarlo.
// Recibe ExcelJS como parámetro porque el navegador y Node usan builds
// distintos de la librería.
import { questions, beverages, beverageNames } from "./beverageLogic.js";

const ROJO = "FFC8102E";
const GRIS_SUAVE = "FFF4F5F7";

// Firestore devuelve Timestamp, pero un registro viejo puede traer Date o nada
export function toDate(value) {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate();
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

// Definición de columnas: encabezado corto, de dónde sale el valor y el ancho.
// "texto: true" fuerza formato de texto para que Excel no convierta los
// teléfonos y cédulas de 10 dígitos en notación científica (3.15201E+09).
export function buildColumns() {
  const columns = [
    { header: "Fecha", width: 11, get: (r) => r.fecha, fecha: true },
    { header: "Hora", width: 9, get: (r) => r.hora },
    { header: "Nombre", width: 22, get: (r) => r.nombre },
    { header: "Cédula", width: 14, get: (r) => r.cedula, texto: true },
    { header: "Teléfono", width: 14, get: (r) => r.telefono, texto: true },
    { header: "Email", width: 30, get: (r) => r.email },
    { header: "NIT", width: 16, get: (r) => r.nit, texto: true },
    { header: "Términos", width: 10, get: (r) => r.terminos },
    { header: "Bebida", width: 19, get: (r) => r.bebida },
    { header: "Puntaje", width: 9, get: (r) => r.puntaje },
  ];

  beverageNames.forEach((key) => {
    columns.push({
      header: beverages[key].name,
      width: 12,
      get: (r) => r.puntajes[key],
    });
  });

  // Una columna por pregunta con el texto de la respuesta.
  // El enunciado completo va en la hoja "Preguntas" para no inflar el encabezado.
  questions.forEach((question) => {
    columns.push({
      header: question.id,
      width: 30,
      get: (r) => r.respuestas[question.id],
    });
  });

  columns.push({ header: "Reclamado", width: 11, get: (r) => r.reclamado });
  columns.push({ header: "Servido", width: 10, get: (r) => r.servido });
  columns.push({ header: "Hora servido", width: 17, get: (r) => r.horaServido });
  columns.push({ header: "ID", width: 22, get: (r) => r.id });

  return columns;
}

// Una fila plana por participante
export function buildRows(records) {
  return records.map((record) => {
    const user = record.userData || {};
    const result = record.result || {};
    const answers = record.answers || {};
    const date = toDate(record.timestamp);
    const servedAt = toDate(record.servedAt);

    const puntajes = {};
    beverageNames.forEach((key) => {
      puntajes[key] = result.allScores?.[key] ?? "";
    });

    const respuestas = {};
    questions.forEach((question) => {
      const option = question.options.find((o) => o.id === answers[question.id]);
      respuestas[question.id] = option ? option.text.trim() : "";
    });

    return {
      id: record.id,
      fecha: date,
      hora: date ? date.toLocaleTimeString("es-MX", { hour12: false }) : "",
      nombre: user.name || "",
      cedula: user.cedula || "",
      telefono: user.phone || "",
      email: user.email || "",
      nit: user.nit || "",
      terminos: user.acceptTerms ? "Sí" : "No",
      bebida: result.beverage || "",
      puntaje: result.score ?? "",
      puntajes,
      respuestas,
      reclamado: record.claimed ? "Sí" : "No",
      servido: record.served ? "Sí" : "No",
      horaServido: servedAt ? servedAt.toLocaleString("es-MX") : "",
    };
  });
}

// Totales por bebida, contando el nombre guardado en cada registro:
// en la base quedaron resultados con los nombres anteriores al cambio
export function buildBeverageTotals(records) {
  const counts = new Map();
  beverageNames.forEach((key) => counts.set(beverages[key].name, 0));
  records.forEach((record) => {
    const name = record.result?.beverage || "Sin bebida";
    counts.set(name, (counts.get(name) || 0) + 1);
  });
  return [...counts.entries()]
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total);
}

export function buildDayTotals(records) {
  const counts = new Map();
  records.forEach((record) => {
    const date = toDate(record.timestamp);
    if (!date) return;
    const label = date.toLocaleDateString("es-MX");
    counts.set(label, (counts.get(label) || 0) + 1);
  });
  return [...counts.entries()]
    .map(([label, total]) => ({ label, total }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

function styleHeader(sheet, rowNumber = 1) {
  const row = sheet.getRow(rowNumber);
  row.height = 26;
  row.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: ROJO } };
    cell.alignment = { vertical: "middle", horizontal: "left" };
    cell.border = { bottom: { style: "thin", color: { argb: "FF9B0C22" } } };
  });
}

export function buildWorkbook(ExcelJS, records) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Data Bar";
  workbook.created = new Date();

  const columns = buildColumns();
  const rows = buildRows(records);

  // ---------- Hoja 1: Participantes ----------
  const sheet = workbook.addWorksheet("Participantes", {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  sheet.columns = columns.map((c) => ({ header: c.header, width: c.width }));

  rows.forEach((row) => {
    sheet.addRow(columns.map((c) => c.get(row)));
  });

  styleHeader(sheet);

  // Formato por columna
  columns.forEach((column, index) => {
    const col = sheet.getColumn(index + 1);
    if (column.texto) col.numFmt = "@";
    if (column.fecha) col.numFmt = "dd/mm/yyyy";
  });

  // Filas alternadas y bordes suaves, para que se lea sin perderse de renglón
  for (let i = 2; i <= rows.length + 1; i++) {
    const row = sheet.getRow(i);
    row.alignment = { vertical: "middle" };
    if (i % 2 === 0) {
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: GRIS_SUAVE },
        };
      });
    }
  }

  if (rows.length) {
    sheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: columns.length },
    };
  }

  // ---------- Hoja 2: Resumen ----------
  const resumen = workbook.addWorksheet("Resumen");
  resumen.columns = [
    { header: "Concepto", width: 26 },
    { header: "Total", width: 10 },
    { header: "%", width: 10 },
  ];
  styleHeader(resumen);

  const total = records.length;
  const pct = (n) => (total ? Math.round((n / total) * 1000) / 10 + "%" : "");

  resumen.addRow(["Participaciones totales", total, ""]);
  resumen.getRow(2).font = { bold: true };
  resumen.addRow([]);

  resumen.addRow(["POR BEBIDA", "", ""]);
  resumen.getRow(resumen.rowCount).font = { bold: true };
  buildBeverageTotals(records).forEach(({ name, total: n }) => {
    resumen.addRow([name, n, pct(n)]);
  });

  resumen.addRow([]);
  resumen.addRow(["POR DÍA", "", ""]);
  resumen.getRow(resumen.rowCount).font = { bold: true };
  buildDayTotals(records).forEach(({ label, total: n }) => {
    resumen.addRow([label, n, pct(n)]);
  });

  resumen.addRow([]);
  resumen.addRow(["Generado", new Date().toLocaleString("es-MX"), ""]);

  // ---------- Hoja 3: Preguntas ----------
  const legend = workbook.addWorksheet("Preguntas");
  legend.columns = [
    { header: "Columna", width: 10 },
    { header: "Pregunta", width: 52 },
    { header: "Opciones", width: 80 },
  ];
  styleHeader(legend);

  questions.forEach((question) => {
    legend.addRow([
      question.id,
      question.text,
      question.options.map((o) => `${o.id}) ${o.text.trim()}`).join("  |  "),
    ]);
  });

  return workbook;
}
