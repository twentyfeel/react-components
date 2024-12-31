import { forwardRef } from "react";
import "./Button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "default",
      size = "default",
      className = "",
      disabled,
      loading = false,
      ...props
    },
    ref,
  ) => {
    const classes = [
      "btn",
      `btn--${variant}`,
      `btn--${size === "default" ? "default-size" : size}`,
      loading && "btn--loading",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {loading ? (
          <span className="btn__spinner" aria-hidden="true">
            {/* TODO: Move this into svg file */}
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" strokeWidth="3" />
            </svg>
          </span>
        ) : (
          children
        )}
      </button>
    );
  },
);
