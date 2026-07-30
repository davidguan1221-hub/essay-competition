import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Lattice Essay Prize home">
      <Image src="/logo-mark.svg" width={46} height={46} alt="" priority />
      <span className="logo-copy">
        <strong>Lattice</strong>
        <span>Essay Prize</span>
      </span>
    </Link>
  );
}
