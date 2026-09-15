import Link from 'next/link';

/**
 * Renders a real link when `href` is set, and a plain non-interactive element
 * when it is not. Nothing on the page points at a URL that does not exist.
 */
export default function SmartLink({ href, className = '', children, ...rest }) {
  if (!href) {
    return (
      <span className={`${className} inert`.trim()} aria-disabled="true" {...rest}>
        {children}
      </span>
    );
  }

  if (href.startsWith('#') || href.startsWith('/')) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} rel="noreferrer" {...rest}>
      {children}
    </a>
  );
}
