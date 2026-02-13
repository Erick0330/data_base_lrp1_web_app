import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { ExcelReaderService } from './app/services/excel-reader.service';

bootstrapApplication(App, appConfig)
  .then((appRef) => {
    // 1. Obtenemos el servicio DESDE el inyector de la app (No con 'new')
    const excelService = appRef.injector.get(ExcelReaderService);
    const excelFilePath = 'data.xlsx';

    // 2. Ejecutamos la carga
    loadExcelData(excelService, excelFilePath);
  })
  .catch((err) => console.error(err));

async function loadExcelData(excelService: ExcelReaderService, filePath: string) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`No se encontró el archivo en: ${filePath}`);

    const blob = await response.blob();
    const file = new File([blob], 'data.xlsx');

    // Asumimos que tu servicio devuelve una Promesa o un Observable
    const data = await excelService.readExcelFile(file);

    if (data && data.length > 0) {
      localStorage.setItem('excelData', JSON.stringify(data));
      console.log('✅ Datos guardados en localStorage:', data);
    } else {
      console.warn('⚠️ El Excel está vacío.');
    }
  } catch (error) {
    console.error('❌ Error en la precarga:', error);
  }
}
