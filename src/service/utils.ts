import CryptoJS from "crypto-js";

const SECRET_KEY = "58584jejdjssjkkkz"; // Ensure this is securely stored

export const storeEncryptedMember = (member: { grade: string; id: string }) => {
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
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedData ? JSON.parse(decryptedData) : null;
    } catch (error) {
      console.error("Decryption failed:", error);
      return null;
    }
  }
  return null;
};
