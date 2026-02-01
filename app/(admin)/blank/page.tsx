export default function DashboardPage() {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center sm:px-6">
        <div className="mx-auto max-w-lg space-y-4">
          <img
            src="/emptycontent.png"
            alt="Empty state"
            className="mx-auto h-56 w-auto"
          />
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground sm:text-xl">
              No tasks yet, they&apos;ll appear here soon
            </h2>
            <p className="text-sm text-muted-foreground">
              Your workspace updates automatically as new tasks and tickets are
              generated. Check back shortly to see everything in one place.
            </p>
          </div>
        </div>
      </div>
    )
  }
  