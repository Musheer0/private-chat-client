import Link from "next/link";

export default function Home() {
  return (
   <div>
    <Link href={'/chats'}>Go to chat</Link>
   </div>
  );
}
