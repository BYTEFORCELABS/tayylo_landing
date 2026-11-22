import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <main className="grain flex min-h-[100svh] flex-col items-center justify-center bg-canvas px-6 text-center">
      <Logo height={22} />
      <p className="display tabular mt-16 text-[7rem] text-olive">404</p>
      <h1 className="mt-2 text-[22px] font-semibold">This page isn&rsquo;t in the book.</h1>
      <p className="mt-3 max-w-sm text-text-secondary">It may have moved, or the link is incorrect.</p>
      <ButtonLink href="/" className="mt-10">
        Back to Tayylo
      </ButtonLink>
    </main>
  );
}
