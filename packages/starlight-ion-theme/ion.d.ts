interface FooterLink {
  text: string;
  href: string;
  newTab?: boolean;
}

interface FooterIcon {
  name: string;
  href: string;
  newTab?: boolean;
}

interface FooterOptions {
  text: string;
  links?: FooterLink[];
  icons?: FooterIcon[];
}

declare module 'ion:globals' {
  /**
   * Whether or not to use icons.
   */
  export const icons: boolean;
  /**
   * Options for the footer.
   */
  export const footer: FooterOptions | undefined;
}