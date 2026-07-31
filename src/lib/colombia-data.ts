export const DEPARTMENTS: Record<string, string[]> = {
  "Amazonas": ["Leticia", "Puerto Nariño"],
  "Antioquia": ["Medellín", "Bello", "Itagüí", "Envigado", "Rionegro", "Apartadó", "Turbo", "La Ceja", "Jardín", "Santa Fe de Antioquia"],
  "Arauca": ["Arauca", "Saravena", "Tame"],
  "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Puerto Colombia", "Sabanagrande"],
  "Bolívar": ["Cartagena", "Magangué", "Turbaco", "El Carmen de Bolívar", "Mompox"],
  "Boyacá": ["Tunja", "Duitama", "Sogamoso", "Paipa", "Chiquinquirá", "Villa de Leyva", "Ráquira"],
  "Caldas": ["Manizales", "Villamaría", "Chinchiná", "La Dorada"],
  "Caquetá": ["Florencia", "San Vicente del Caguán", "Cartagena del Chairá"],
  "Casanare": ["Yopal", "Aguazul", "Villanueva", "Paz de Ariporo"],
  "Cauca": ["Popayán", "Santander de Quilichao", "Puerto Tejada", "Silvia"],
  "Cesar": ["Valledupar", "Aguachica", "Codazzi", "La Paz"],
  "Chocó": ["Quibdó", "Turbo", "Istmina", "Condoto"],
  "Córdoba": ["Montería", "Cereté", "Lorica", "Sahagún", "Tierralta"],
  "Cundinamarca": ["Bogotá", "Soacha", "Facatativá", "Zipaquirá", "Girardot", "Fusagasugá", "Chía", "Cajicá", "Mosquera", "Madrid", "Tabio", "Tenjo"],
  "Guainía": ["Inírida"],
  "Guaviare": ["San José del Guaviare"],
  "Huila": ["Neiva", "Pitalito", "Garzón", "La Plata"],
  "La Guajira": ["Riohacha", "Uribia", "Manaure", "Maicao"],
  "Magdalena": ["Santa Marta", "Ciénaga", "Fundación", "El Banco"],
  "Meta": ["Villavicencio", "Acacías", "Granada", "Puerto López"],
  "Nariño": ["Pasto", "Ipiales", "Tumaco", "Túquerres"],
  "Norte de Santander": ["Cúcuta", "Ocaña", "Pamplona", "Los Patios"],
  "Putumayo": ["Mocoa", "Puerto Asís", "Valle del Guamuez"],
  "Quindío": ["Armenia", "Calarcá", "Salento", "Montenegro"],
  "Risaralda": ["Pereira", "Dosquebradas", "Santa Rosa de Cabal", "La Virginia"],
  "San Andrés y Providencia": ["San Andrés", "Providencia"],
  "Santander": ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Barrancabermeja", "San Gil", "Socorro"],
  "Sucre": ["Sincelejo", "Corozal", "Coveñas", "Tolú"],
  "Tolima": ["Ibagué", "Espinal", "Líbano", "Honda", "Mariquita"],
  "Valle del Cauca": ["Cali", "Buenaventura", "Palmira", "Tuluá", "Cartago", "Buga", "Jamundí", "Yumbo", "Roldanillo"],
  "Vaupés": ["Mitú"],
  "Vichada": ["Puerto Carreño"],
};

export const DEPARTMENTS_LIST = Object.keys(DEPARTMENTS);

export function getCitiesByDepartment(department: string): string[] {
  return DEPARTMENTS[department] || [];
}
