import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/dashboard/donatee">Donatee Dashboard</Link>
        <Link href="/dashboard/donor">Donor Dashboard</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
