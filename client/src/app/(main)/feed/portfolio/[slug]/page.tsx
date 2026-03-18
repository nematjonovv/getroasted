import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import React from 'react';
type Props = {
  params: Promise<{ slug: string }>
}
async function page({ params }: Props) {
  const { slug } = await params

  // const router = useRouter()

  return (
    <div>
      Slug: {slug}

      <Link href={"/"}>Back</Link>
    </div>
  );
}

export default page;