import Link from "next/link";
import LoginForm from "./LoginForm/page";

export default function Home() {
  return (
    <>
      <section className="flex justify-center items-center h-screen bg-blue-gradient">
        <div>
          <div>
            <div className="flex justify-center">
      <Link className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" href="/InitialInterface" passHref={true}>Check My spring boot app</Link>
            
      </div>
          </div>
        </div>
      </section>
    </>
  );
}
