const CELL_TYPE_IMAGE_BY_KEY: Record<string, string> = {
  asterisk: 'icons/STRING network (physical) - 26_Asterisk.csv_1.png',
  adipocytes: 'icons/ADIPOCYTES.png',
  astrocytes: 'icons/STRING network (physical) - 02_Astrocytes.csv_1.png',
  chondrocytes: 'icons/STRING network (physical) - 03_Chondrocytes.csv_1.png',
  'dendritic cells': 'icons/STRING network (physical) - 04_Dendritic_Cells.csv_1.png',
  endothelials: 'icons/STRING network (physical) - 05_Endothelials.csv_1.png',
  epithelials: 'icons/STRING network (physical) - 06_Epithelials.csv_1.png',
  fibroblasts: 'icons/STRING network (physical) - 07_Fibroblasts.csv_1.png',
  hepatocytes: 'icons/STRING network (physical) - 08_Hepatocytes.csv_1.png',
  'lymphocytes t': 'icons/STRING network (physical) - 09_Lymphocytes_T.csv_1.png',
  macrophages: 'icons/STRING network (physical) - 11_Macrophages.csv_1.png',
  monocytes: 'icons/STRING network (physical) - 12_Monocytes.csv_3.png',
  myoblast: 'icons/STRING network (physical) - 13_Myoblast.csv_1.png',
  neural: 'icons/STRING network (physical) - 14_Neural.csv_1.png',
  neurons: 'icons/STRING network (physical) - 15_Neurons.csv_1.png',
  oligodendrocytes: 'icons/STRING network (physical) - 16_Oligodendrocytes.csv_1.png',
  osteoblasts: 'icons/STRING network (physical) - 18_Osteoblasts.csv_1.png',
  osteoclasts: 'icons/STRING network (physical) - 19_Osteoclasts.csv_1.png',
  platelets: 'icons/STRING network (physical) - 20_Platelets.csv_1.png',
  pneumocytes: 'icons/STRING network (physical) - 21_Pneumocytes.csv_1.png',
  scs: 'icons/STRING network (physical) - 22_SCs.csv_1.png',
  smcs: 'icons/STRING network (physical) - 23_SMCs.csv_1.png',
  stellate: 'icons/STRING network (physical) - 24_Stellate.csv_1.png',
  vsmcs: 'icons/STRING network (physical) - 25_VSMCs.csv_1.png'
};

const CELL_TYPE_ALIASES: Record<string, string> = {
  '*': 'asterisk',
  'lymphocytes t cd4': 'lymphocytes t',
  osteoblast: 'osteoblasts'
};

export const DEFAULT_CELL_TYPE_IMAGE = 'icons/molecule.png';

export function normalizeCellTypeKey(cellType: string): string {
  return cellType
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9*]+/g, ' ')
    .trim();
}

export function getCellTypeDisplayName(cellType: string): string {
  return normalizeCellTypeKey(cellType) === '*' ? 'Others' : cellType;
}

export function getCellTypeImage(cellType: string): string | null {
  const normalizedKey = normalizeCellTypeKey(cellType);
  const resolvedKey = CELL_TYPE_ALIASES[normalizedKey] ?? normalizedKey;

  return CELL_TYPE_IMAGE_BY_KEY[resolvedKey] ?? null;
}
