// Datos ficticios para la demo de portafolio.
// Las fechas de las citas se calculan siempre a futuro para que la demo no caduque.

const futureDate = (daysFromNow: number) => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
};

export const demoAppointments = [
  {
    id: "demo-1",
    doctor: "Dr. Roberto Solís",
    specialty: "Cardiología",
    date: futureDate(4),
    time: "10:30",
    location: "Centro Médico San José",
    notes: "Ayunas de 8 horas",
  },
  {
    id: "demo-2",
    doctor: "Dra. Elena Vargas",
    specialty: "Oftalmología",
    date: futureDate(11),
    time: "16:00",
    location: "Clínica Internacional, Piso 3",
    notes: "Llevar lentes actuales",
  },
];

export const demoElderly = {
  name: "María García",
  age: "72",
  codigoAM: "AMA-482391",
  birthDate: "1954-03-18",
  bloodType: "O+",
  allergies: "Penicilina",
  medicalInfo: "Hipertensión controlada",
};

export const seedAppointments = () => {
  const saved = localStorage.getItem("amay_appointments");
  if (saved) return JSON.parse(saved);
  localStorage.setItem("amay_appointments", JSON.stringify(demoAppointments));
  return demoAppointments;
};
