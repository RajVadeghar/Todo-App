import { useSession } from "next-auth/client";
import { signOut } from "next-auth/client";

function Avatar() {
  const [session] = useSession();
  return (
    <div>
      <img
        onClick={() => signOut()}
        className="rounded-full h-10 cursor-pointer transition delay-150 duration-150 ease-in-out hover:scale-125 "
        loading="lazy"
        src={session.user.image}
        alt=""
      />
    </div>
  );
}

export default Avatar;
