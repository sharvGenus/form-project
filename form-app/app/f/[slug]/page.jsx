import PublicFormClient from './PublicFormClient';

export default async function PublicFormPage({ params }) {
  const { slug } = await params;

  return <PublicFormClient slug={slug} />;
}