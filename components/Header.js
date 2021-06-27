import { SunIcon } from "@heroicons/react/solid";
import { MoonIcon } from "@heroicons/react/solid";
import { signOut } from "next-auth/client";
import { LogoutIcon } from "@heroicons/react/outline";

function Header({ isDark, handleDarkMode }) {
  return (
    <div className="flex justify-between items-center mb-7">
      <p className="uppercase font-bold text-2xl tracking-widest z-40">Todo</p>
      <div className="flex flex-row space-x- items-center">
        <div
          onClick={handleDarkMode}
          className="p-2 cursor-pointer rounded-full"
        >
          {isDark ? (
            <SunIcon className="h-7 w-7" />
          ) : (
            <MoonIcon className="h-7 w-7" />
          )}
        </div>
        <div className="block md:hidden p-2 cursor-pointer rounded-full">
          <LogoutIcon
            onClick={() => signOut()}
            className="h-7 text-white cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
