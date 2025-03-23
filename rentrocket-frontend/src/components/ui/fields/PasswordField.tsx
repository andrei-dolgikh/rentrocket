import React from "react";
import {Input} from "@heroui/react";
import {EyeFilledIcon} from "./eyeIcon";
import {EyeSlashFilledIcon} from "./eyeCloseIcon";

export default function PasswordField() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      label="Пароль"
      variant="bordered"
      placeholder="Введи пароль"
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="max-w-xs"
    />
  );
}
