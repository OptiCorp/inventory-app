import { Dispatch, SetStateAction, useState } from 'react';
import * as XLSX from 'xlsx';
import { Item } from '../../apiTypes.ts';

type ExportToExcelHook = {
    exportToExcel: (items: Item[]) => void;
};

type ExcelData = {
    id: string;
    wpId: string;
    serialNumber: string;
    productNumber: string;
    type: string;
    category?: string;
    description: string;
    vendor?: string;
    location?: string;
};

const useExportToExcel = (): ExportToExcelHook => {
    const exportToExcel = (items: Item[]) => {
        const data = processAndSetData(items);
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'exported_data.xlsx');
    };

    const processAndSetData = (rawData: Item[]): ExcelData[] => {
        const processedDatas = rawData.map((item: Item) => ({
            id: item.id,
            wpId: item.wpId,
            serialNumber: item.serialNumber,
            productNumber: item.itemTemplate.productNumber,
            type: item.itemTemplate.type,
            category: item.itemTemplate.category?.name,
            description: item.itemTemplate.description,
            vendor: item.vendor?.name,
            location: item.location?.name,
        }));

        return processedDatas;
    };

    return { exportToExcel };
};

export default useExportToExcel;
