import { createFileRoute } from "@emstrack/react-start";

export const Route = createFileRoute('/admin')({
  component: () => {
    return (
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold text-green-600">✅ Admin Panel is Working!</h1>
        <p className="text-gray-600 mt-2">Routing fixed manually.</p>
      </div>
    );
  },
});
