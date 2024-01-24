import { Dispatch, SetStateAction, useState } from 'react';
import * as XLSX from 'xlsx';
import { Item } from '../../apiTypes.ts';

type ExportToExcelHook = {
    exportData: Item[];
    exportToExcel: () => void;
    setExportData: Dispatch<SetStateAction<Item[]>>;
};

type ExcelData = {
    id: string;
    wpId: string;
    serialNumber: string;
    productNumber: string;
    type: string;
    category: string;
    description: string;
    vendor: string;
    location: string;
};

const useExportToExcel = (): ExportToExcelHook => {
    const [exportData, setExportData] = useState<Item[]>([]);
    const [processedData, setProcessedData] = useState<ExcelData[]>([]);

    const exportToExcel = () => {
        processAndSetData(exportData);
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(processedData);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'exported_data.xlsx');
    };

    const processAndSetData = (rawData: Item[]) => {
        const processedData = rawData.map((item: Item) => ({
            id: item.id,
            wpId: item.wpId,
            serialNumber: item.serialNumber,
            productNumber: item.productNumber,
            type: item.type,
            category: item.category.name,
            description: item.description,
            vendor: item.vendor.name,
            location: item.location.name,
        }));

        setProcessedData(processedData);
    };

    return { exportData, exportToExcel, setExportData };
};

export default useExportToExcel;
