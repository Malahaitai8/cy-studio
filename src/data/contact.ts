export interface ContactItemData {
  type: "email" | "phone" | "github" | "resume";
  label: string;
  value: string;
  action: "copy" | "link";
  href?: string;
}

export const contactItems: ContactItemData[] = [
  {
    type: "email",
    label: "Email",
    value: "18813080192@163.com",
    action: "copy",
  },
  {
    type: "phone",
    label: "Phone",
    value: "18813080192",
    action: "copy",
  },
  {
    type: "github",
    label: "GitHub",
    value: "github.com/Malahaitai8",
    action: "link",
    href: "https://github.com/Malahaitai8?tab=repositories",
  },
  {
    type: "resume",
    label: "Resume PDF",
    value: "查看我的简历",
    action: "link",
    href: "/resume.pdf",
  },
];

export interface DecorationData {
  type: "sparkle" | "heart" | "paper-plane";
  x: string;
  y: string;
  rotate: number;
}

export const decorations: DecorationData[] = [
  { type: "sparkle", x: "8%", y: "18%", rotate: 0 },
  { type: "sparkle", x: "88%", y: "12%", rotate: 15 },
  { type: "sparkle", x: "82%", y: "55%", rotate: -10 },
  { type: "heart", x: "12%", y: "65%", rotate: -5 },
  { type: "heart", x: "78%", y: "72%", rotate: 8 },
  { type: "paper-plane", x: "15%", y: "35%", rotate: -20 },
  { type: "paper-plane", x: "75%", y: "25%", rotate: 15 },
];
