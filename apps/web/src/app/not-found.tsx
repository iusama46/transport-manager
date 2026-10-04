import Link from "next/link";
export default function NotFound() {
  return (
    <>
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="my-4 text-slate-600">
        This page is not part of the workspace.
      </p>
      <Link href="/" className="text-blue-700 underline">
        Return to overview
      </Link>
    </>
  );
}
