import EmptyState from '../EmptyState';

export default function EmptyStateExample() {
  return (
    <div className="p-6">
      <EmptyState
        title="কোন নোট নেই"
        message="আপনার প্রথম নোট তৈরি করুন অথবা ভয়েস রেকর্ড করুন"
        actionLabel="নতুন নোট"
        onAction={() => console.log('Create note clicked')}
      />
    </div>
  );
}
