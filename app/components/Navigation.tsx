import Link from 'next/link';
// import { usePathname } from 'next/navigation';

export default function Navigation() {
  // const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">Flow Payment</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-700"
              >
                Store
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-500 hover:text-gray-700"
              >
                Dashboard
              </Link>
              <Link
                href="/verify"
                className="text-gray-500 hover:text-gray-700"
              >
                Verify Payment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
