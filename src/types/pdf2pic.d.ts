// src/types/pdf2pic.d.ts
declare module "pdf2pic" {
  interface ConverterOptions {
    density?: number;
    saveFilename?: string;
    savePath?: string;
    format?: "png" | "jpeg";
    width?: number;
    height?: number;
  }
  interface PageToImageResult {
    name: string;
    path: string;
    base64: string;
  }
  export function fromBuffer(
    buffer: Buffer,
    options?: ConverterOptions
  ): (page: number) => Promise<PageToImageResult>;
}
