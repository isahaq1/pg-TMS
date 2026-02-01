export default function AdminFooter() {
  return (
    <footer className="border-t border-border bg-card px-4 py-3 text-sm text-muted-foreground sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Paragon Group</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  )
}
