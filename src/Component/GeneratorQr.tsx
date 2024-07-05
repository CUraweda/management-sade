import React from "react";
import QRCode from "react-qr-code";

// Definisikan tipe untuk props
interface GeneratorQrProps {
  size: number;
  nis: string;
}

// Gunakan props yang sudah ditentukan tipe datanya
const GeneratorQr: React.FC<GeneratorQrProps> = ({ size, nis }) => {
  return (
    <QRCode value={nis} size={size} />
  );
};

export default GeneratorQr;
