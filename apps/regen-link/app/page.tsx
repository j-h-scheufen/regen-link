import { Button } from '@heroui/react';
import { Card, CardBody } from '@heroui/react';
import { Spacer } from '@heroui/react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-neutral-100 dark:from-black dark:to-neutral-900 flex flex-col items-center justify-center p-6">
      <Card className="max-w-md w-full p-8 shadow-lg">
        <CardBody className="flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
            Welcome to Regen Link
          </h1>

          <p className="text-lg text-neutral-600 dark:text-neutral-300">
            A registry for regenerative projects, actors, platforms, and communities.
          </p>

          <Spacer y={4} />

          <div className="flex gap-4">
            <Button color="primary" size="lg" radius="full">
              Get Started
            </Button>
            <Button variant="bordered" size="lg" radius="full">
              Learn More
            </Button>
          </div>
        </CardBody>
      </Card>

      <p className="mt-8 text-sm text-neutral-500">© 2025 Regen Link. All rights reserved.</p>
    </main>
  );
}
