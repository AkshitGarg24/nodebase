import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-muted flex min-h-svh flex-col justify-center items-center gap-6 p-6 md:p-10">
            <Link href="/" className="flex justify-center items-center gap-2"><Image alt="nodebase" src="/logos/nodebase_icon.svg" width={30} height={30}/><span className="text-xl font-semibold">Nodebase</span></Link>
            {children}
        </div>
    )
}

export default AuthLayout;