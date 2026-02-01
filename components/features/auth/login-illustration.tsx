import Image from "next/image";

export default function LoginIllustration() {
  return (
    <div className="hidden md:flex items-center justify-center">
      <div className="relative w-full max-w-md">
        <Image
          src="/illustration.png"
          alt="Login illustration"
          width={500}
          height={500}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
