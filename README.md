# LRP1 Interactome Explorer

Aplicacion web para explorar la base de datos **LRP-IntDB** (LRP-1 Interactome DataBase): una coleccion curada de ligandos de LRP-1 organizados por tipo celular, con soporte para busqueda por proteina y analisis por contexto biologico.

## Vista General

LRP1 Interactome Explorer permite:

- Buscar ligandos por `Protein Name`, `UniProt ID` o `Gene`.
- Navegar por resultados agrupados por `Cell Type`.
- Consultar detalles de proteinas y su perfil de expresion por tipo celular.
- Exportar resultados a `CSV` para analisis externo.

El proyecto esta orientado a facilitar investigacion translacional sobre LRP-1 y la toma de decisiones en estudios de interaccion ligando-receptor.

## Funcionalidades Principales

- **Busqueda inteligente de ligandos**
  - Sugerencias dinamicas basadas en el dataset cargado.
  - Navegacion directa a vista de detalle de proteina.
- **Exploracion por tipo celular**
  - Lista de proteinas detectadas en un tipo celular especifico.
  - Acceso directo al detalle de cada proteina.
- **Detalle de proteina**
  - Informacion funcional (gen, UniProt, localizacion subcelular, funcion).
  - Tabla de expresion por celula/tejido con score y tipo de deteccion.
- **Exportacion de datos**
  - Descarga CSV en vista de resultados por tipo celular y por ligando.
- **Carga automatica de dataset**
  - `data.xlsx` se lee al iniciar la app y se almacena en `localStorage` como `excelData`.

## Stack Tecnologico

- `Angular 21` (standalone components + Angular Signals)
- `TypeScript`
- `Bootstrap 5` + `Bootstrap Icons`
- `xlsx` para parseo de Excel
- `Vitest` para pruebas unitarias

## Arquitectura de Datos

1. Al iniciar la app, `src/main.ts` hace `fetch` de `public/data.xlsx`.
2. `ExcelReaderService` parsea la primera hoja del Excel.
3. Los registros se guardan en `localStorage` (`excelData`).
4. Los servicios de dominio consumen esos datos:
   - `CellTypeDataService`: resultados por tipo celular.
   - `LigandDataService`: detalle por ligando/proteina.

## Estructura del Proyecto

```text
src/
  app/
    components/
      intro-section/
      search-sections/
        ligand-search/
        cell-type-search/
    services/
      excel-reader.service.ts
      ligand-data.service.ts
      cell-type-data.service.ts
    cell-type-results/
    ligand-details/
    shared/
      protein-table/
      cell-expression-table/
```

## Requisitos

- `Node.js` 20+ recomendado
- `npm` 10+

## Instalacion y Ejecucion

```bash
npm install
npm run start
```

Abrir en: `http://localhost:4200`

## Scripts Disponibles

- `npm run start`: servidor de desarrollo.
- `npm run build`: build de produccion en `dist/`.
- `npm run watch`: build en modo watch (development).
- `npm run test`: pruebas unitarias.

## Rutas Principales

- `/` -> Home con busqueda por ligando y por tipo celular.
- `/cell-type/:cellType` -> Resultados por tipo celular.
- `/ligand-details?term=<value>&type=<name|uniprot|gene>` -> Detalle del ligando.
- `/protein/:proteinId` -> Ruta declarada para detalle por ID (actualmente reutiliza `LigandDetailsComponent`).

## Fuente de Datos

- Archivo principal: `public/data.xlsx`
- Copia adicional: `src/assets/data.xlsx`

> Nota: si se actualiza el Excel, conviene limpiar `localStorage` del navegador para recargar datos en caliente.

## Calidad y Estado

- El proyecto incluye pruebas unitarias base (`*.spec.ts`).
- Algunas entradas del menu superior (`/about`, `/stats`) aparecen en la interfaz pero no estan definidas en el enrutamiento actual.

