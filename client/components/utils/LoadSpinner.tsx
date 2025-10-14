export function LoadSpinner({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={`size-10 border-4 border-neutral-300 border-t-orange-400 rounded-full animate-spin ${className}`}
    />
  )
}
