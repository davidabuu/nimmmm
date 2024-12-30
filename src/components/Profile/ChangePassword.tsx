import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { AppDispatch, RootState } from "@/src/lib/store";
import { changePassword } from "@/src/redux/auth/changePassword";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.changePassword);

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      notification.error({
        message: "Password Mismatch",
        description: "New password and confirm password must match.",
      });
      return;
    }

    try {
      await dispatch(changePassword({ newPassword })).unwrap();

      notification.success({
        message: "Success",
        description: "Password changed successfully!",
      });

      // Clear the form
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      notification.error({
        message: "Error",
      });
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">Change Password</h2>

        <div className="space-y-6">
          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <div className="relative mt-2">
              <input
                type={newPasswordVisible ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={toggleNewPasswordVisibility}
              >
                {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative mt-2">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              onClick={handleSubmit}
              className="w-full bg-primary text-white px-4 py-2 hover:bg-blue-800 transition flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Change Password"
              )}
              {isLoading && "Loading..."}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
