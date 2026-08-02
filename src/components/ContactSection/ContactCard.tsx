import { contactItems } from "../../data/contact";
import ContactItem from "./ContactItem";

export default function ContactCard() {
  return (
    <div className="contact-card">
      <div className="contact-card__inner">
        {contactItems.map((item, idx) => (
          <div key={item.type}>
            <ContactItem item={item} />
            {idx < contactItems.length - 1 && (
              <hr className="contact-item__divider" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
