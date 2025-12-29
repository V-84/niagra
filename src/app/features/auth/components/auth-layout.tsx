import Link from "next/link";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <div className="bg-muted flex min-h-svh items-center flex-col justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link href="/" className="flex items-centre gap-2 self-centre font-medium">
            <Image alt="niagra" src="/logos/logo.svg" width={25} height={25} />
            Niagra
          </Link>
          {children}
        </div>
      </div>
    );
};

export default AuthLayout;
