import ProFastLogo from "../Logo/ProFastLogo";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-blue-100/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-3 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <ProFastLogo />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
