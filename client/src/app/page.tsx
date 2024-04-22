"use client";

import { ChangeEvent, useState } from "react";
import { CSVToJSON } from "../lib/parse-csv";

export default function Home() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<
    { [key: string]: string }[] | null
  >(null);
  const [fileIsValid, setFileIsValid] = useState<boolean>(false);
  const [fileErrors, setFileErrors] = useState<string[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setFileName(file.name);
      setFileContent(CSVToJSON(reader.result as string));
    };
  };

  const validateFile = () => {
    if (!fileContent) return;
    const errors = fileContent.reduce((acc, item) => {
      if (!item["product_code"]) acc.push(`"product_code" é obrigatório`);
      if (!item["new_price"]) acc.push(`"new_price" é obrigatório`);
      if (item["new_price"] && isNaN(Number(item["new_price"])))
        acc.push(`"new_price" deve ser um número`);
      return acc;
    }, [] as string[]);

    setFileErrors(errors);
    setFileIsValid(errors.length === 0);

    if (errors.length > 0) return;

    console.log("buscando produto(s)...");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid w-full max-w-sm items-center gap-4">
        <div className="space-y-2">
          <label htmlFor="file">
            Carregue o arquivo com a atualização de preço
          </label>
          <div className="flex items-center space-x-2">
            <input
              className="sr-only "
              id="file"
              type="file"
              onChange={handleFileChange}
            />
            <label
              className="cursor-pointer inline-flex items-center space-x-2 text-sm py-2 px-3 rounded font-medium border border-gray-200 border-solid transition-colors hover:bg-gray-50/50 hover:border-gray-300"
              htmlFor="file"
            >
              Selecionar arquivo&nbsp;
              <span className="ml-auto text-gray-500 shrink-0 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                ou arraste e solte
              </span>
            </label>
          </div>
          <span className="text-sm text-gray-500 peer-disabled:opacity-70">
            {fileName}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          {fileContent
            ? JSON.stringify(fileContent, null, 2)
            : "Nenhum arquivo selecionado"}
        </p>
        <div className="flex gap-2">
          <button
            className="border border-gray-200 rounded-md py-2 px-4 text-sm font-medium text-gray-700 bg-white hover:bg-gray-200"
            onClick={validateFile}
          >
            Validar
          </button>
          <button
            className="border border-gray-200 rounded-md py-2 px-4 text-sm font-medium text-gray-700 bg-white hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!fileIsValid}
          >
            Atualizar
          </button>
        </div>
        {fileErrors.length > 0 && (
          <div className="bg-red-100 border border-red-200 rounded-md p-4 text-red-700 dark:bg-red-900 dark:border-red-800 dark:text-red-200">
            <div className="flex flex-col items-center space-x-2">
              <p>Erro(s): {fileErrors.length}</p>
              {fileErrors.map((error, index) => (
                <p key={index}>&bull;{error}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
