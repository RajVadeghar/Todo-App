import { SunIcon } from "@heroicons/react/solid";
import { MoonIcon } from "@heroicons/react/solid";
import { useTheme, useThemeUpdate } from "../context/ThemeContext";
import Avatar from "./Avatar";

function Header() {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();

  return (
    <div className="flex justify-between items-center mb-7">
      <p className="uppercase font-bold text-2xl tracking-widest z-40">Todo</p>
      <div className="flex flex-row space-x- items-center">
        <div onClick={toggleTheme} className="p-2 cursor-pointer rounded-full">
          {darkTheme ? (
            <SunIcon className="h-7 w-7" />
          ) : (
            <MoonIcon className="h-7 w-7" />
          )}
        </div>
        <div className="p-2 cursor-pointer rounded-full">
          <Avatar />
        </div>
      </div>
    </div>
  );
}

export default Header;
