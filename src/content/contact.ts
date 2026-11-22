/** Topics a visitor can pick on the contact form. Shared by the form and the API route. */
export const CONTACT_TOPICS = ["I'm a tailor", "I'm a customer", "Partnerships", "Press", "Something else"] as const;
export type ContactTopic = (typeof CONTACT_TOPICS)[number];
