import CryptoJS from "crypto-js";

const SECRET_KEY = "53636ebsdjddjd8393"; // Use a secure key

export const storeEncryptedMember = (member:string) => {
  if (member) {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(member),
      SECRET_KEY
    ).toString();
    localStorage.setItem("member", encryptedData);
  }
};

export const getDecryptedMember = () => {
  const encryptedData = localStorage.getItem("member");
  if (encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  return null;
};
