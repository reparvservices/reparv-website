import { buildFaqPageSchema } from "@/lib/seo";

const FAQSchema = ({ faqs }) => {
  const schema = buildFaqPageSchema(faqs);
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default FAQSchema;
