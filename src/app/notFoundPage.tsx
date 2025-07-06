import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <div className="text-primary mx-auto h-12 w-12" />
        <h1 className="text-foreground mt-4 text-6xl font-bold tracking-tight sm:text-7xl">
          404
        </h1>
        <p className="text-muted-foreground mt-4">
          Oops, the page you are looking for does not exist.
        </p>
        <div className="mt-6">
          <Button onClick={() => navigate({ to: "/" })}>Go to home</Button>
        </div>
      </div>
    </div>
  );
}
