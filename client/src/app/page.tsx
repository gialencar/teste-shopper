"use client";

import { ChangeEvent, useState } from "react";

export default function Home() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      console.log(reader.result);
      setFileName(file.name);
      setFileContent(reader.result as string);
    };
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
            ? fileContent
            : "Nenhum arquivo selecionado"}
        </p>
        <div className="flex gap-2">
          <button>Validar</button>
          <button>Atualizar</button>
        </div>
        <div className="bg-red-100 border border-red-200 rounded-md p-4 text-red-700 dark:bg-red-900 dark:border-red-800 dark:text-red-200">
          <div className="flex items-center space-x-2">
            <p>
              Erro: <strong>Arquivo inválido</strong>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
